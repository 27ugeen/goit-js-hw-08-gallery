'use strict';

import { default as images } from '../goit-js-hw-08-gallery/gallery-items.js';

const refs = {
  listGallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox')
};

console.log(images.preview);

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

function handleClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const img = e.target;
  console.log(img.nodeName);
  console.log(e.currentTarget);
  refs.lightbox.classList.toggle('is-open');
  const lightboxImage = document.querySelector('.lightbox__image');
  const sourceImage = img.dataset.source;
  const closeModalBtn = document.querySelector('.lightbox__button');
  console.log(closeModalBtn);
  console.dir(refs.lightbox);

  function closeModal() {
    refs.lightbox.classList.remove('is-open');
    lightboxImage.removeAttribute('src', sourceImage);
  }

  refs.lightbox.addEventListener('click', closeModal);

  closeModalBtn.addEventListener('click', closeModal);
  lightboxImage.setAttribute('src', sourceImage);
}

refs.listGallery.addEventListener('click', handleClick);
