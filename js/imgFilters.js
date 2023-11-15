import domVariables from './domVariables.js';

const {
  imgFilters,
  imgFiltersBtn
} = domVariables;

imgFilters.classList.remove('img-filters--inactive');

const showContent = (id) => {
  for (let i = 0; i < imgFiltersBtn.length; ++i) {
    if (id === imgFiltersBtn[i].id) {
      imgFiltersBtn[i].classList.add('img-filters__button--active');
    } else {
      imgFiltersBtn[i].classList.remove('img-filters__button--active');
    }
  }
};

for (let i = 0; i < imgFiltersBtn.length; ++i) {
  imgFiltersBtn[i].addEventListener('click', () => showContent(imgFiltersBtn[i].id));
}
