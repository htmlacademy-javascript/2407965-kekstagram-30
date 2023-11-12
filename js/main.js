import effectMapList from './EffectMapList.js';

// module1-tasks

// module1-tasks variables:
const body = document.querySelector('body');
const uploadImgInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview > img');
const imgUploadPreviewContainer = document.querySelector('.img-upload__preview');
const cancelImgPreviewBtn = document.querySelector('.img-upload__cancel');

// module2-tasks varaiables:
const scaleControlSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleControlBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectsRadioBtns = document.querySelectorAll('.effects__radio');
const effectLevelValueInput = document.querySelector('.effect-level__value');
const effectLevelValueSlider = document.querySelector('.effect-level__slider');
const imgUploadEffectLevelContainer = document.querySelector('.img-upload__effect-level');

let effectValue = 100;

/* Module 1 - Tasks */

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

uploadImgInput.addEventListener('change', handleFiles);

cancelImgPreviewBtn.addEventListener('click', cancelPreviewHandler);
cancelImgPreviewBtn.addEventListener('click', setDefaultValueState);

document.addEventListener('keydown', keydownHandler);

/* End of Module 1 - Tasks */

/* Module 2 - Tasks */

// scaling image:
let scaleControlValueState = 100;

function setDefaultValueState() {
  scaleControlValue.value = '100%';

  if (imgUploadPreview.hasAttribute('style')) {
    imgUploadPreview.removeAttribute('style');
  }
}

function getControlValueState() {
  scaleControlValue.value = `${scaleControlValueState}%`;
  imgUploadPreview.style['transform'] = `scale(${scaleControlValueState}%)`;
}

function scaleSmaller() {
  if (scaleControlValueState === 25) {
    scaleControlValueState = 100;
  } else {
    scaleControlValueState -= 25;
  }

  getControlValueState();
}

function scaleBigger() {
  if (scaleControlValueState === 100) {
    scaleControlValueState = 25;
  } else {
    scaleControlValueState += 25;
  }

  getControlValueState();
}

scaleControlSmallerBtn.addEventListener('click', scaleSmaller);
scaleControlBiggerBtn.addEventListener('click', scaleBigger);
// end of scaling image

let sliderConfig = {
  start: [0, 100],
  connect: true,
  step: 1,
  range: {
    min: 0,
    max: 100
  }
};

const effectNameList = [];
for (const [key] of effectMapList.entries()) {
  effectNameList.push(key);
}

// creating first prototype of noUiSlider
noUiSlider.create(effectLevelValueSlider, sliderConfig);

// iteration over radio buttons
for (let i = 0; i < effectsRadioBtns.length; ++i) {
  const radioClickHandler = () => {
    effectLevelValueInput.setAttribute('value', effectValue);
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
            imgUploadPreviewContainer.setAttribute('style', `filter: ${effectNameList[i]}(${effectValue}px)`);
            break;
          case 'invert':
            imgUploadPreviewContainer.setAttribute('style', `filter: ${effectNameList[i]}(${effectValue}%)`);
            break;
          default:
            imgUploadPreviewContainer.setAttribute('style', `filter: ${effectNameList[i]}(${effectValue})`);
            break;
        }
      };

      noUiSlider.create(effectLevelValueSlider, sliderConfig);

      effectLevelValueSlider.noUiSlider.on('update', updateEventHandler);
    }
  };

  effectsRadioBtns[i].addEventListener('click', radioClickHandler);
}
// end of iteration

const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
};

const form = document.querySelector('.img-upload__form');
const pristine = new Pristine(form, defaultConfig);

const formHashTags = document.querySelector('.text__hashtags');
const formDescription = document.querySelector('.text__description');

function formTextInputsTrim() {
  formHashTags.value.trim();
  formDescription.value.trim();
}

pristine.addValidator(formHashTags, (value) => {
  const test = value.trim().split(' ');
  return test;
}, 'Error message');

pristine.addValidator(formHashTags, (value) => {
  const test = (/^[a-zA-Z0-9]+$/).test(value);
  if (!test) {
    return true;
  }
}, 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');

// BELOW VALIDATOR DOES NOT WORK PROPERLY:
pristine.addValidator(formHashTags, (value) => {
  const lowercaseText = value.toLowerCase();
  const hashtags = lowercaseText.match(/#[a-zа-я0-9]+/gi);
  if (hashtags === null) {
    return true;
  }
}, 'Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом');

// BELOW VALIDATOR DOES NOT WORK PROPERLY:
pristine.addValidator(formHashTags, (value) => {
  const test = (/#\w+/g).test(value);
  if (!test) {
    return true;
  }
}, 'Хэш-теги разделяются пробелами');

pristine.addValidator(formHashTags, (value) => {
  const test = (/#.*#.*#.*#.*#.*|#.*#.*#.*#.*#.*#/g).test(value);
  if (!test) {
    return true;
  }
}, 'Не может иметь более 5 и более хештегов!');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formTextInputsTrim();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма не валидна!');
  }
});
