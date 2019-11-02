'use strict';

import { default as images } from '../goit-js-hw-08-gallery/gallery-items.js';

const refs = {
  listGallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]')
};

// console.log(images.forEach(e => console.log(e.original)));

const addImg = images.filter(({ preview, original, description }) => {
  refs.listGallery.insertAdjacentHTML(
    'afterbegin',
    `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
  
      <span class="gallery__icon">
        <i class="material-icons">zoom_out_map</i>
      </span>
    </a>
  </li>`
  );
});

refs.listGallery.append(addImg);

//=====================================================
function handleClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  refs.lightbox.classList.add('is-open');

  const sourceImage = e.target.dataset.source;
  refs.lightboxImage.setAttribute('src', sourceImage);

  function closeModal() {
    refs.lightbox.classList.remove('is-open');
    refs.lightboxImage.removeAttribute('src', sourceImage);
  }
  refs.closeModalBtn.addEventListener('click', closeModal);

  function backgroundCloseModal({ target }) {
    if (target.classList.contains('lightbox__content')) closeModal();
  }
  refs.lightbox.addEventListener('click', backgroundCloseModal);

  function esc(evt) {
    if (evt.keyCode === 27) closeModal();
  }
  window.addEventListener('keydown', esc);
}

refs.listGallery.addEventListener('click', handleClick);
//===================================================

const cache = {
  elem: null
};

function setActive({ target }) {
  if (cache.elem) {
    cache.elem.classList.remove('active__img');
  }
  cache.elem = target;
  cache.elem.classList.add('active__img');
}

refs.listGallery.addEventListener('click', setActive);
//==================================================
const galleryImg = document.querySelectorAll('.gallery__image');
// console.log(galleryImg);

function nextItem(evt) {
  if (evt.keyCode === 39 || evt.keyCode === 37) {
    // const srcImg = images.reduce((acc, { original }) => [...acc, original], []);
    // const galleryImg = document.querySelectorAll('gallery__image');
    // console.log(galleryImg);
    const arr = [...galleryImg];
    // console.log(arr);
    const current = arr.findIndex(e => e.classList.contains('active__img'));
    // console.log(current);
    let next = current;
    if (current !== -1) {
      if (evt.keyCode === 39) next += 1;
      if (evt.keyCode === 37) next -= 1;
      if (next <= 0) next = 0;
      if (next >= arr.length - 1) next = arr.length - 1;
      arr[current].classList.remove('active__img');
      // console.log(arr[current]);
      arr[next].classList.add('active__img');
      // console.log(arr[next]);
      const sourceImage = arr[current].dataset.source;
      const nextImg = arr[next].dataset.source;
      refs.lightboxImage.removeAttribute('src', sourceImage);
      refs.lightboxImage.setAttribute('src', nextImg);
    }
  }
}

window.addEventListener('keydown', nextItem);
