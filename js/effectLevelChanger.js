import domVariables from './domVariables.js';
import effectMapList from './effectMapList.js';
import { setDefaultValueState } from './scalingImage.js';

const {
  imgUploadPreviewContainer,
  effectsRadioBtns,
  effectLevelValueInput ,
  effectLevelValueSlider,
  imgUploadEffectLevelContainer,
} = domVariables;

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
const effectNameList = [];
for (const [key] of effectMapList.entries()) {
  effectNameList.push(key);
}

// creating first prototype of noUiSlider
noUiSlider.create(effectLevelValueSlider, sliderConfig);

let effectValue = 100;

const effectLevelChanger = () => {
  for (let i = 0; i < effectsRadioBtns.length; ++i) {
    const radioClickHandler = () => {
      if (effectsRadioBtns[i].checked) {
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
              imgUploadPreviewContainer.removeAttribute('style');
              break;
            case 'blur':
              imgUploadPreviewContainer.setAttribute(
                'style',
                `filter: ${effectNameList[i]}(${effectValue}px)`
              );
              break;
            case 'invert':
              imgUploadPreviewContainer.setAttribute(
                'style',
                `filter: ${effectNameList[i]}(${effectValue}%)`
              );
              break;
            default:
              imgUploadPreviewContainer.setAttribute(
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

    effectsRadioBtns[i].addEventListener('click', radioClickHandler);
  }
};
effectLevelChanger();
