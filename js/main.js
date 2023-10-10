// module-1_task-2

const body = document.querySelector('body');
const uploadImgInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview > img');
const cancelImgPreviewBtn = document.querySelector('.img-upload__cancel');


function handleFiles() {
  if (!uploadImgInput.files.length) {
    // ...
  } else {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    for (let i = 0; i < this.files.length; ++i) {
      imgUploadPreview.src = URL.createObjectURL(this.files[i]);
      imgUploadPreview.onload = () => {
        URL.revokeObjectURL(imgUploadPreview.src);
      };
    }
  }
}

function cancelPreviewHandler() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
}

function keydownHandler(event) {
  switch (event.key) {
    case 'Escape':
      cancelPreviewHandler();
      break;
    default:
      break;
  }
}

uploadImgInput.addEventListener('change', handleFiles);

cancelImgPreviewBtn.addEventListener('click', cancelPreviewHandler);

document.addEventListener('keydown', keydownHandler);


