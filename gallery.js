'use strict';

import { default as images } from '../goit-js-hw-08-gallery/gallery-items.js';

const gallery = {
  listGallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox')
};

const addImg = images.filter(({ preview, original, description }) => {
  gallery.listGallery.insertAdjacentHTML(
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

gallery.listGallery.append(addImg);

function handleClick(e) {
  e.preventDefault();
  console.log(e.target);
  console.log(e.currentTarget);
  console.log(gallery.lightbox);
  gallery.lightbox.classList.toggle('is-open');
}

gallery.listGallery.addEventListener('click', handleClick);

// function buildGalleryItem(item) {
//   return `<li class="gallery__item">
//     <a
//       class="gallery__link"
//       href="${imgGallery.original}"
//     >
//       <img
//         class="gallery__image"
//         src="${imgGallery.preview}"
//         data-source="${imgGallery.original}"
//         alt="${imgGallery.description}"
//       />

//       <span class="gallery__icon">
//         <i class="material-icons">zoom_out_map</i>
//       </span>
//     </a>
//   </li>`;
// }
