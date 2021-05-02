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
   
let imgActiveIndx;

function onImagesConteinerClick(event) {
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
    imgActiveIndx = +event.target.dataset.index;
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
document.body.addEventListener('keyup', onCloseModalKeyboard, false);

const onRightPress = (event) => {
    if (event.code === "ArrowRight") {
        window.addEventListener("keydown", onLeftPress);
        imgActiveIndx++;
        lightboxImageEl.setAttribute("src", `${galleryItems[imgActiveIndx].original}`);
        // console.log(galleryItems[event.target.dataset.index])
    }
    if (imgActiveIndx === galleryItems.length - 1) {
        window.removeEventListener("keydown", onRightPress);
        window.addEventListener("keydown", onLeftPress);
    }
    if (imgActiveIndx < galleryItems.length - 1) {
        window.addEventListener("keydown", onRightPress);
    }
    //   console.log(imgActiveIndx);
};

const onLeftPress = (event) => {
    if (event.code === "ArrowLeft") {
        window.addEventListener("keydown", onRightPress);
        imgActiveIndx--;
        lightboxImageEl.setAttribute("src", `${galleryItems[imgActiveIndx].original}`);
    }
    if (imgActiveIndx === 0) {
        window.removeEventListener("keydown", onLeftPress);
        window.addEventListener("keydown", onRightPress);
    }
    if (imgActiveIndx > 0) {
        window.addEventListener("keydown", onLeftPress);
    }
    //   console.log(imgActiveIndx);
};

listEl.insertAdjacentHTML('beforeend', addGalleryElement);
listEl.addEventListener('click', onImagesConteinerClick);
lightboxOverlayEl.addEventListener('click', onCloseModalOverlay);