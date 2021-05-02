import galleryItems from './gallery-items.js';

const listEl = document.querySelector('.js-gallery');
const lightboxConteinerEl = document.querySelector('.js-lightbox')
const lightboxOverlayEl = document.querySelector('.lightbox__overlay')
const lightboxImageEl = document.querySelector('.lightbox__image')
const btnCloseModalEl = document.querySelector('.lightbox__button')

const addGalleryElement = galleryItems
    .map(({ preview, original, description }, index) => {
        return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index=${index}
      alt="${description}"
    />
  </a>
</li>`;
})
.join(' ');
   
let imgActiveIndex;

function onImagesClick(event) {
        event.preventDefault()
        if (event.target === event.currentTarget) {
            return
        }
        lightboxConteinerEl.classList.add('is-open')
  onOpenImage(event)
  btnCloseModalEl.addEventListener('click', onCloseModal)
}

function onOpenImage(event) {
    lightboxImageEl.src = event.target.dataset.source;
    lightboxImageEl.alt = event.target.alt;
    imgActiveIndex = event.target.dataset.index;
    window.addEventListener("keydown", onRightPress);
    window.addEventListener("keydown", onLeftPress);
}

function onCloseModal() {
    lightboxConteinerEl.classList.remove('is-open')
    lightboxImageEl.src = "";
    lightboxImageEl.alt = "";
}

function onCloseModalOverlay(event) {
    if (event.target === event.currentTarget) {
        onCloseModal()
    }
}
function onCloseModalKeyboard(event) {
    if (event.key === 'Escape') {
        onCloseModal()
    };
}

const onRightPress = (event) => {
    if (event.code === "ArrowRight") {
        window.addEventListener("keydown", onLeftPress);
        imgActiveIndex++;
        lightboxImageEl.setAttribute("src", `${galleryItems[imgActiveIndex].original}`);
    }
    if (imgActiveIndex === galleryItems.length - 1) {
        window.removeEventListener("keydown", onRightPress);
        window.addEventListener("keydown", onLeftPress);
    }
    if (imgActiveIndex < galleryItems.length - 1) {
        window.addEventListener("keydown", onRightPress);
    }
};

const onLeftPress = (event) => {
    if (event.code === "ArrowLeft") {
        window.addEventListener("keydown", onRightPress);
        imgActiveIndex--;
        lightboxImageEl.setAttribute("src", `${galleryItems[imgActiveIndex].original}`);
    }
    if (imgActiveIndex === 0) {
        window.removeEventListener("keydown", onLeftPress);
        window.addEventListener("keydown", onRightPress);
    }
    if (imgActiveIndex > 0) {
        window.addEventListener("keydown", onLeftPress);
    }
};

listEl.insertAdjacentHTML('beforeend', addGalleryElement);
listEl.addEventListener('click', onImagesClick);
lightboxOverlayEl.addEventListener('click', onCloseModalOverlay);
document.body.addEventListener('keyup', onCloseModalKeyboard, false);