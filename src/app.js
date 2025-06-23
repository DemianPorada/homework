import galleryItems from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const closeButton = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');

galleryContainer.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

// Створення розмітки
function createGalleryMarkup(items) {
  return items.map(({ preview, original, description }) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `).join('');
}

// Слухачі
galleryContainer.addEventListener('click', onGalleryClick);
closeButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Клік по зображенню
function onGalleryClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') return;

  openModal(evt.target.dataset.source, evt.target.alt);
}

// Відкриття модалки
function openModal(src, alt) {
  lightbox.classList.add('is-open');
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  window.addEventListener('keydown', onEscPress);
}

// Закриття модалки
function closeModal() {
  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  window.removeEventListener('keydown', onEscPress);
}

// Закриття через Escape
function onEscPress(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}