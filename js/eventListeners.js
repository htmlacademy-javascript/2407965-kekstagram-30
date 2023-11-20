import domVariables from './domVariables.js';
import { handleFiles, cancelPreviewHandler } from './fileHandling.js';
import { scaleSmaller, scaleBigger } from './scalingImage.js';

const {
  uploadImgInput,
  cancelImgPreviewBtn,
  scaleControlSmallerBtn,
  scaleControlBiggerBtn
} = domVariables;

uploadImgInput.addEventListener('change', handleFiles);
cancelImgPreviewBtn.addEventListener('click', cancelPreviewHandler);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    cancelPreviewHandler();
  }
});
scaleControlSmallerBtn.addEventListener('click', scaleSmaller);
scaleControlBiggerBtn.addEventListener('click', scaleBigger);
