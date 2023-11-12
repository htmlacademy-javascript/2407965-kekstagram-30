import effectLevelChanger from './effectLevelChanger.js';
import domVariables from './domVariables.js';
import './validation.js';

const {
  body,
  uploadImgInput,
  imgUploadOverlay,
  imgUploadPreview,
  imgUploadPreviewContainer,
  cancelImgPreviewBtn,
  scaleControlSmallerBtn,
  scaleControlBiggerBtn,
  scaleControlValue,
  effectsRadioBtns,
  // effectLevelValueInput,
  // effectLevelValueSlider,
  imgUploadEffectLevelContainer,
} = domVariables;

// handling files
let imageURL;
function handleFiles() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  for (let i = 0; i < uploadImgInput.files.length; ++i) {
    imageURL = URL.createObjectURL(uploadImgInput.files[i]);
    imgUploadPreview.src = imageURL;
    imgUploadPreview.onload = () => {
      URL.revokeObjectURL(imageURL);
    };
  }
}

// cancelling preview
function cancelPreviewHandler() {
  uploadImgInput.value = '';

  imgUploadPreview.src = '';
  imgUploadPreview.removeAttribute('style');

  imgUploadEffectLevelContainer.classList.add('hidden');
  imgUploadPreviewContainer.removeAttribute('style');
  imgUploadOverlay.classList.add('hidden');

  body.classList.remove('modal-open');
  URL.revokeObjectURL(imageURL);

  for (const radioBtn of effectsRadioBtns) {
    if (radioBtn.hasAttribute('checked')) {
      radioBtn.removeAttribute('checked');
    }
  }
  effectsRadioBtns[0].setAttribute('checked', '');
}

// keydown handler function
function keydownHandler(event) {
  // if there are more keys to handle,
  // you can use switch statement!
  if (event.key === 'Escape') {
    cancelPreviewHandler();
    setDefaultValueState();
  }
}

// event listeners:
uploadImgInput.addEventListener('change', handleFiles);
cancelImgPreviewBtn.addEventListener('click', cancelPreviewHandler);
cancelImgPreviewBtn.addEventListener('click', setDefaultValueState);
document.addEventListener('keydown', keydownHandler);

// scaling image:
let scaleControlValueState = 100;

// sets default value for scale
function setDefaultValueState() {
  scaleControlValue.value = '100%';

  if (imgUploadPreview.hasAttribute('style')) {
    imgUploadPreview.removeAttribute('style');
  }
}

// sets value of scale
function setControlValueState() {
  scaleControlValue.value = `${scaleControlValueState}%`;
  imgUploadPreview.style['transform'] = `scale(${scaleControlValueState}%)`;
}

// scales image smaller
function scaleSmaller() {
  if (scaleControlValueState === 25) {
    scaleControlValueState = 100;
  } else {
    scaleControlValueState -= 25;
  }

  setControlValueState();
}

// scales image bigger
function scaleBigger() {
  if (scaleControlValueState === 100) {
    scaleControlValueState = 25;
  } else {
    scaleControlValueState += 25;
  }

  setControlValueState();
}

// event listeners
scaleControlSmallerBtn.addEventListener('click', scaleSmaller);
scaleControlBiggerBtn.addEventListener('click', scaleBigger);

// iteration over radio buttons
effectLevelChanger();
