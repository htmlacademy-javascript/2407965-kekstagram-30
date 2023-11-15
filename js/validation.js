import domVariables from './domVariables.js';
import { cancelPreviewHandler } from './fileHandling.js';

const {
  body,
  form,
  formHashTags,
  formDescription
} = domVariables;

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
  let className;
  if (id[0] === '#') {
    className = `${id.replace('#', ' ').trim()}-template`;
  } else {
    className = `${id}-template`;
  }

  const template = document.querySelector(id);
  const clone = document.createElement('div');
  clone.setAttribute('class', className);
  clone.innerHTML = template.innerHTML;

  return clone;
};

const appendTemplate = (selector, child) => {
  const parentElement = document.querySelector(selector);
  parentElement.appendChild(child);
};

const removeTemplate = (selector) => {
  const template = document.querySelector(selector);
  template.remove();
};

// success popup
const successState = () => appendTemplate('body', createTemplateClone('#success'));
const closeSuccessState = () => removeTemplate('.success-template');
// end of success popup

// failure popup
const failureState = () => appendTemplate('body', createTemplateClone('#error'));
const closeFailureState = () => removeTemplate('.error-template');
// end of failure popup

// submit event handler
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    successState();
    const successCloseBtn = document.querySelector('.success__button');
    successCloseBtn.addEventListener('click', closeSuccessState);
    successCloseBtn.addEventListener('click', cancelPreviewHandler);
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        closeSuccessState();
        cancelPreviewHandler();
      }
    });
    return true;
  } else {
    failureState();
    const failureCloseBtn = document.querySelector('.error__button');
    failureCloseBtn.addEventListener('click', closeFailureState);
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        closeFailureState();
      }
    });
    return false;
  }
});

export { createTemplateClone, removeTemplate };
