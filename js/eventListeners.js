import domVariables from './domVariables.js';
import { handleFiles, cancelPreviewHandler, keydownHandler } from './fileHandling.js';
import { setDefaultValueState, scaleSmaller, scaleBigger } from './scalingImage.js';

const {
  uploadImgInput,
  cancelImgPreviewBtn,
  scaleControlSmallerBtn,
  scaleControlBiggerBtn
} = domVariables;

uploadImgInput.addEventListener('change', handleFiles);
cancelImgPreviewBtn.addEventListener('click', cancelPreviewHandler);
cancelImgPreviewBtn.addEventListener('click', setDefaultValueState);
document.addEventListener('keydown', keydownHandler);
scaleControlSmallerBtn.addEventListener('click', scaleSmaller);
scaleControlBiggerBtn.addEventListener('click', scaleBigger);
