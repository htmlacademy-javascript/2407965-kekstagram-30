import domVariables from './domVariables.js';
import { setDefaultValueState } from './scalingImage.js';

const {
  body,
  uploadImgInput,
  imgUploadOverlay,
  imgUploadPreview,
  imgUploadPreviewContainer,
  effectsRadioBtns,
  imgUploadEffectLevelContainer,
} = domVariables;

// handling files
let imageURL;
const handleFiles = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  for (let i = 0; i < uploadImgInput.files.length; ++i) {
    imageURL = URL.createObjectURL(uploadImgInput.files[i]);
    imgUploadPreview.src = imageURL;
    imgUploadPreview.onload = () => {
      URL.revokeObjectURL(imageURL);
    };
  }
};

// cancelling preview
const cancelPreviewHandler = () => {
  uploadImgInput.value = '';
  imgUploadPreview.src = '';

  imgUploadPreview.removeAttribute('style');
  imgUploadPreviewContainer.removeAttribute('style');

  imgUploadEffectLevelContainer.classList.add('hidden');
  imgUploadOverlay.classList.add('hidden');

  body.classList.remove('modal-open');
  URL.revokeObjectURL(imageURL);

  for (let i = 0; i < effectsRadioBtns.length; ++i) {
    effectsRadioBtns[i].removeAttribute('checked');
    if (i === 0) {
      effectsRadioBtns[i].setAttribute('checked', '');
    }
  }
};

// keydown handler function
const keydownHandler = (event) => {
  // if there are more keys to handle,
  // you can use switch statement!
  if (event.key === 'Escape') {
    cancelPreviewHandler();
    setDefaultValueState();
  }
};

export {
  handleFiles,
  cancelPreviewHandler,
  keydownHandler
};
