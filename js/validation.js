import domVariables from './domVariables.js';

const {
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

// submit event handler
form.addEventListener('submit', (event) => {
  const isValid = pristine.validate();
  if (isValid) {
    //console.log('Можно отправлять');
  } else {
    event.preventDefault();
    // write code that will popup the error messages if there was the error with submitting form
    //console.log('Форма не валидна!');
  }
});
