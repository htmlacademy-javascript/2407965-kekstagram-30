const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
};

const form = document.querySelector('.img-upload__form');
const formHashTags = document.querySelector('.text__hashtags');
//const formDescription = document.querySelector('.text__description');

const pristine = new Pristine(form, defaultConfig);

const regexPatternChecker = (regex, value) => regex.test(value);

// START VALIDATION OF FORM USING PRISTINE:
pristine.addValidator(formHashTags, (value) => {
  const isValid = regexPatternChecker(/^[#a-zA-Z0-9]+$/, value);
  if (isValid) {
    return true;
  }
}, 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');

pristine.addValidator(formHashTags, (value) => {
  const isValid = regexPatternChecker(/^[#a-zA-Z0-9]{1,20}$/, value);
  if (isValid) {
    return true;
  }
}, 'один хештег может содержать до 20 символов');

pristine.addValidator(formHashTags, (value) => {
  const isValid = regexPatternChecker(/^[#a-zA-Z0-9]{1,20}$/, value);
  if (isValid) {
    const isNotCaseSensitive = (/^a-z$|^A-Z$/).test(value);
    return isNotCaseSensitive;
  }
}, 'хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом');

// submit event handler
form.addEventListener('submit', (event) => {
  const isValid = pristine.validate();
  if (isValid) {
    //console.log('Можно отправлять');
  } else {
    event.preventDefault();
    //console.log('Форма не валидна!');
  }
});
