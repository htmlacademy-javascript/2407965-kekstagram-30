import domVariables from './domVariables.js';
import { createTemplateClone } from './validation.js';

const {
  imgFilters,
  imgFiltersBtn
} = domVariables;

imgFilters.classList.remove('img-filters--inactive');

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

const showContent = (id) => {
  for (let i = 0; i < imgFiltersBtn.length; ++i) {
    if (id === imgFiltersBtn[i].id) {
      imgFiltersBtn[i].classList.add('img-filters__button--active');
      const postData = getData('https://30.javascript.pages.academy/kekstagram/data');
      postData
        .then((posts) => {
          const picturesContainer = document.querySelector('.pictures');
          //const postsLength = posts.length;
          //const random10 = Math.floor(Math.random() * 10) + 1;
          let commentsSum = 0;
          let postsSum = 0;
          let mean = 0; // average number of posts
          // let min = 0;
          // let max = 0;
          // let range = 0;

          for (let j = 0; j < posts.length; ++j) {
            const templatePicture = createTemplateClone('#picture');
            const templatePicImg = templatePicture.children[0].children[0];
            const templatePicCommentAmount = templatePicture.children[0].children[1].children[0];
            const templatePicLikes = templatePicture.children[0].children[1].children[1];

            const generateHTML = () => {
              templatePicImg.setAttribute('loading', 'lazy');
              templatePicImg.setAttribute('src', posts[j].url);
              templatePicCommentAmount.textContent = posts[j].comments.length;
              templatePicLikes.textContent = posts[j].likes;
            };

            switch (id) {
              case 'filter-default':
                generateHTML();
                picturesContainer.appendChild(templatePicture);
                break;
              case 'filter-random':
                generateHTML();
                break;
              case 'filter-discussed':
                commentsSum += posts[j].comments.length;
                postsSum = j;
                mean = (commentsSum / postsSum).toFixed(0);
                if (posts[j].comments.length > mean) {
                  // generateHTML();
                  // picturesContainer.appendChild(templatePicture);
                }
                // min = Math.min(posts[j].comments.length);
                // max = Math.max(posts[j].comments.length);
                // range = Math.max(posts[j].comments.length) - Math.min(posts[j].comments.length);
                break;
            }
          }

          //console.log('Posts: ' + postsSum + '\n' + 'Comments sum: ' + commentsSum + '\n' + 'Mean: ' + mean + '\n' + '[min][max][range]: ' + min + ' ' + max + ' ' + range + '\n');
        });
    } else {
      imgFiltersBtn[i].classList.remove('img-filters__button--active');
      const templatePictures = document.querySelectorAll('.picture-template');
      templatePictures.forEach((el) => el.remove());
    }
  }
};

setTimeout(() => {
  showContent(imgFiltersBtn[0].id);
}, 10);
for (let i = 0; i < imgFiltersBtn.length; ++i) {
  imgFiltersBtn[i].addEventListener('click', () => showContent(imgFiltersBtn[i].id));
}
