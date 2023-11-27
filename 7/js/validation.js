import domVariables from './domVariables.js';
import { cancelPreviewHandler } from './fileHandling.js';

const {
  form,
  formHashTags,
  formDescription,
  imgUploadSubmitBtn
} = domVariables;

formDescription.setAttribute('max-length', 139);

const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
};

const pristine = new Pristine(form, defaultConfig);

const regexPatternChecker = (regex, value) => regex.test(value);

const addFocusedState = (element) => element.classList.add('focused');
const removeFocusedState = (element) => {
  if (element.classList.contains('focused')) {
    element.classList.remove('focused');
  }
};

formHashTags.addEventListener('focus' || 'focusin', () => addFocusedState(formHashTags));
formHashTags.addEventListener('focusout', () => removeFocusedState(formHashTags));

formDescription.addEventListener('focus' || 'focusin', () => addFocusedState(formDescription));
formDescription.addEventListener('focusout', () => removeFocusedState(formDescription));

// START VALIDATION OF FORM USING PRISTINE:

pristine.addValidator(formHashTags, (value) => {
  const test0 = regexPatternChecker(/^$/i, value);
  const test1 = regexPatternChecker(/^#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}$/i, value);
  const test2 = regexPatternChecker(/^#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}\s#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}$/i, value);
  const test3 = regexPatternChecker(/^#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}\s#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}\s#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}$/i, value);
  const test4 = regexPatternChecker(/^#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}\s#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}\s#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}\s#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}$/i, value);
  const test5 = regexPatternChecker(/^#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}\s#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}\s#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}\s#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}\s#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}$/i, value);
  const test6 = regexPatternChecker(/\b(\w+)\b.*\b\1\b/, value.toLowerCase());

  if (test6) {
    return false;
  }

  const isValid = test0 || test1 || test2 || test3 || test4 || test5;
  if (isValid) {
    return true;
  }
}, 'Ваш хеш-тег может содержать только буквы и цифры, пробелы и спецсимволы запрещены использоваться! Хештеги разделяются пробелами и максимальное их кол-во 5! один и тот же хэш-тег не может быть использован дважды, несмотря на их регистр!  Один Хештег может содержать максимум 20 символов.');

const createTemplateClone = (id) => {
  if (id[0] !== '#') {
    throw TypeError('id parameter should have # at the first index, because it specifies html id attribute value');
  }

  const template = document.querySelector(id);
  const clone = template.content.cloneNode(true);

  return clone;
};

const appendTemplate = (selector, child) => {
  const parentElement = document.querySelector(selector);
  parentElement.appendChild(child);
};

const removeTemplate = (selector) => {
  const template = document.querySelector(selector);
  if (template) {
    template.remove();
  }
};

// success popup
const successState = () => appendTemplate('body', createTemplateClone('#success'));
const closeSuccessState = () => removeTemplate('.success');
// end of success popup

// failure popup
const failureState = () => appendTemplate('body', createTemplateClone('#error'));
const closeFailureState = () => removeTemplate('.error');
// end of failure popup

const success = () => {
  successState();
  const successCloseBtn = document.querySelector('.success__button');
  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', closeSuccessState);
    successCloseBtn.addEventListener('click', cancelPreviewHandler);
  }
};

const failure = () => {
  failureState();
  const failureCloseBtn = document.querySelector('.error__button');
  if (failureCloseBtn) {
    failureCloseBtn.addEventListener('click', closeFailureState);
  }
};

// submit event handler
imgUploadSubmitBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    imgUploadSubmitBtn.disabled = true;
    const formData = new FormData(form);

    fetch(
      'https://30.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      })
      .then((response) => response.json())
      .then(() => success())
      .catch(() => failure())
      .finally(() => {
        imgUploadSubmitBtn.disabled = false;
      });
    return true;
  } else {
    failure();
    return false;
  }
});

export { createTemplateClone, removeTemplate, appendTemplate };
