const domVariables = {
  body: document.querySelector('body'),
  uploadImgInput: document.querySelector('.img-upload__input'),
  imgUploadOverlay: document.querySelector('.img-upload__overlay'),
  imgUploadPreview: document.querySelector('.img-upload__preview > img'),
  imgUploadPreviewContainer: document.querySelector('.img-upload__preview'),
  cancelImgPreviewBtn: document.querySelector('.img-upload__cancel'),
  scaleControlSmallerBtn: document.querySelector('.scale__control--smaller'),
  scaleControlBiggerBtn: document.querySelector('.scale__control--bigger'),
  scaleControlValue: document.querySelector('.scale__control--value'),
  effectsRadioBtns: document.querySelectorAll('.effects__radio'),
  effectLevelValueInput: document.querySelector('.effect-level__value'),
  effectLevelValueSlider: document.querySelector('.effect-level__slider'),
  imgUploadEffectLevelContainer: document.querySelector('.img-upload__effect-level')
};

export default domVariables;
