import domVariables from './domVariables.js';
import filteringImages from './filteringImages.js';
import startPreviewing from './previewImages.js';
import { appendTemplate, createTemplateClone, removeTemplate } from './validation.js';

const {
  imgFilters,
  imgFiltersBtn
} = domVariables;

const getData = async (url) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
};

const showContent = (id) => {
  for (let i = 0; i < imgFiltersBtn.length; ++i) {
    if (id === imgFiltersBtn[i].id) {
      imgFiltersBtn[i].classList.add('img-filters__button--active');
      const data = getData('https://30.javascript.pages.academy/kekstagram/data');

      data
        .then((postsData) => {
          const posts = [...postsData];
          const postsIdList = [];
          const loadTimeout = 500;

          setTimeout(() => {
            filteringImages.createIDList(posts, postsIdList);
            filteringImages.randomizeIDList(postsIdList);

            switch (id) {
              case 'filter-default':
                {
                  const defaultData = filteringImages.loadPictures(posts);
                  startPreviewing(defaultData);
                }
                break;
              case 'filter-random':
                {
                  filteringImages.loadRandomPictures(posts, postsIdList);
                  startPreviewing(posts);
                }
                break;
              case 'filter-discussed':
                {
                  const filteredData = filteringImages.loadDiscussedPictures(posts);
                  startPreviewing(filteredData);
                }
                break;
            }
          }, loadTimeout);
        })
        .catch(() => {
          const destroyTimer = 5000;
          const dataErrorTemplate = createTemplateClone('#data-error');
          appendTemplate('body', dataErrorTemplate);
          setTimeout(() => removeTemplate('.data-error'), destroyTimer);
        })
        .finally(() => {
          imgFilters.classList.remove('img-filters--inactive');
        });
    } else {
      imgFiltersBtn[i].classList.remove('img-filters__button--active');
      const templatePictures = document.querySelectorAll('.picture');
      templatePictures.forEach((el) => el.remove());
    }
  }
};

showContent(imgFiltersBtn[0].id);
for (let i = 0; i < imgFiltersBtn.length; ++i) {
  imgFiltersBtn[i].addEventListener('click', () => showContent(imgFiltersBtn[i].id));
}
