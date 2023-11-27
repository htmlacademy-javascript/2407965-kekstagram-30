import domVariables from './domVariables.js';

const {
  imgUploadPreview,
  scaleControlValue,
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
const scaleSmaller = () => {
  if (scaleControlValueState === 25) {
    scaleControlValueState = 25;
  } else {
    scaleControlValueState -= 25;
  }

  setControlValueState();
};

// scales image bigger
const scaleBigger = () => {
  if (scaleControlValueState === 100) {
    scaleControlValueState = 100;
  } else {
    scaleControlValueState += 25;
  }

  setControlValueState();
};

export {
  setDefaultValueState,
  scaleSmaller,
  scaleBigger
};
