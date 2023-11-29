import domVariables from './domVariables.js';
import effectMapList from './effectMapList.js';
import { setDefaultValueState } from './scalingImage.js';

const {
  imgUploadPreview,
  effectsRadioBtns,
  effectLevelValueInput ,
  effectLevelValueSlider,
  imgUploadEffectLevelContainer,
} = domVariables;

//const imgUploadPreview = document.querySelector('.img-upload__preview > img');

// default slider config:
let sliderConfig = {
  start: [0, 100],
  connect: true,
  step: 1,
  range: {
    min: 0,
    max: 100
  }
};

// effectNameList array that will contain list of effect names:
const effectNameList = [
  'original',
  'grayscale',
  'sepia',
  'invert',
  'blur',
  'brightness'
];

// creating first prototype of noUiSlider
noUiSlider.create(effectLevelValueSlider, sliderConfig);

let effectValue = 100;

for (let i = 0; i < effectsRadioBtns.length; ++i) {
  const effectRadioBtn = effectsRadioBtns[i];
  const radioBtnClick = () => {
    if (effectRadioBtn.checked) {
      effectLevelValueSlider.noUiSlider.destroy();

      sliderConfig = effectMapList.get(effectNameList[i]);
      effectValue = sliderConfig.range.min;

      const updateEventHandler = (values) => {
        effectValue = values[1] - values[0];

        if (effectNameList[i] === 'original') {
          imgUploadEffectLevelContainer.classList.add('hidden');
        } else {
          imgUploadEffectLevelContainer.classList.remove('hidden');
        }

        switch (effectNameList[i]) {
          case 'original':
            imgUploadPreview.removeAttribute('style');
            break;
          case 'blur':
            imgUploadPreview.setAttribute(
              'style',
              `filter: ${effectNameList[i]}(${effectValue}px)`
            );
            break;
          case 'invert':
            imgUploadPreview.setAttribute(
              'style',
              `filter: ${effectNameList[i]}(${effectValue}%)`
            );
            break;
          default:
            imgUploadPreview.setAttribute(
              'style',
              `filter: ${effectNameList[i]}(${effectValue})`
            );
            break;
        }

        setDefaultValueState();
        effectLevelValueInput.setAttribute('value', effectValue.toFixed(1));
      };

      noUiSlider.create(effectLevelValueSlider, sliderConfig);
      effectLevelValueSlider.noUiSlider.on('update', updateEventHandler);
    }
  };

  effectRadioBtn.addEventListener('click', radioBtnClick);
}
