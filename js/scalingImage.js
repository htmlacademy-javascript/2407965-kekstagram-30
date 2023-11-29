import domVariables from './domVariables.js';

const {
  imgUploadPreview,
  scaleControlValue,
  scaleControlSmallerBtn,
  scaleControlBiggerBtn
} = domVariables;

// scaling image:
let scaleControlValueState = 100;

// sets default value for scale
const setDefaultValueState = () => {
  scaleControlValue.value = '100%';
  scaleControlValueState = 100;
};

// sets value of scale
const setControlValueState = () => {
  scaleControlValue.value = `${scaleControlValueState}%`;
  scaleControlValue.setAttribute('value', `${scaleControlValueState}%`);
  imgUploadPreview.style['transform'] = `scale(${scaleControlValueState}%)`;
};

// scales image smaller
const reduceImgSize = () => {
  if (scaleControlValueState === 25) {
    scaleControlValueState = 25;
  } else {
    scaleControlValueState -= 25;
  }

  setControlValueState();
};

// scales image bigger
const increaseImgSize = () => {
  if (scaleControlValueState === 100) {
    scaleControlValueState = 100;
  } else {
    scaleControlValueState += 25;
  }

  setControlValueState();
};

scaleControlSmallerBtn.addEventListener('click', reduceImgSize);
scaleControlBiggerBtn.addEventListener('click', increaseImgSize);

export { setDefaultValueState };
