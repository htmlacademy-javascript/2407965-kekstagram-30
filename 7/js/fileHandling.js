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
  formHashTags,
  formDescription
} = domVariables;

// handling files
let imageURL;
const handleFiles = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  for (let i = 0; i < uploadImgInput.files.length; ++i) {
    const effectPreview = document.querySelectorAll('.effects__preview');
    imageURL = URL.createObjectURL(uploadImgInput.files[i]);
    imgUploadPreview.src = imageURL;
    effectPreview.forEach((el) => {
      el.setAttribute('style', `background-image:url(${imageURL});`);
    });

    imgUploadPreview.onload = () => {
      URL.revokeObjectURL(imageURL);
    };
  }
};

// cancelling preview
const cancelPreviewHandler = () => {
  const closePreview = () => {
    uploadImgInput.value = '';
    imgUploadPreview.src = '';

    formHashTags.value = '';
    formDescription.value = '';

    imgUploadPreview.removeAttribute('style');
    imgUploadPreviewContainer.removeAttribute('style');

    imgUploadEffectLevelContainer.classList.add('hidden');
    imgUploadOverlay.classList.add('hidden');

    setDefaultValueState();
    body.classList.remove('modal-open');
    URL.revokeObjectURL(imageURL);

    for (let i = 0; i < effectsRadioBtns.length; ++i) {
      effectsRadioBtns[i].removeAttribute('checked');
      if (i === 0) {
        effectsRadioBtns[i].setAttribute('checked', '');
      }
    }
  };

  if (!formHashTags.classList.contains('focused')) {
    if (!formDescription.classList.contains('focused')) {

      const successTemplate = document.querySelector('.success');
      const errorTemplate = document.querySelector('.error');

      if (successTemplate || errorTemplate) {
        if (body.contains(successTemplate)) {
          closePreview();
          successTemplate.remove();
        }

        if (body.contains(errorTemplate)) {
          errorTemplate.remove();
        }
      } else {
        closePreview();
      }
    }
  }
};

export {
  handleFiles,
  cancelPreviewHandler
};
