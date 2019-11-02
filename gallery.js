'use strict';

import { default as images } from '../goit-js-hw-08-gallery/gallery-items.js';

const refs = {
  listGallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]')
};

// console.log(images.forEach(e => console.log(e)));

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

  function backgroundCloseModal({ target }) {
    // console.log(target);
    if (target.classList.contains('lightbox__content')) {
      refs.lightbox.classList.remove('is-open');
      refs.lightboxImage.removeAttribute('src', sourceImage);
    }
  }
  refs.closeModalBtn.addEventListener('click', closeModal);
  refs.lightbox.addEventListener('click', backgroundCloseModal);
}

refs.listGallery.addEventListener('click', handleClick);

//====================================================
