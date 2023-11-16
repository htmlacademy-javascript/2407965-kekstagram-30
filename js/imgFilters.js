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

const createUniqueSet = (numbersArr) => {
  const uniqueNumbers = new Set();

  for (let i = 0; i < numbersArr.length; ++i) {
    uniqueNumbers.add(numbersArr[i]);
  }

  return uniqueNumbers;
};

const showContent = (id) => {
  for (let i = 0; i < imgFiltersBtn.length; ++i) {
    if (id === imgFiltersBtn[i].id) {
      imgFiltersBtn[i].classList.add('img-filters__button--active');
      const postsData = getData('https://30.javascript.pages.academy/kekstagram/data');
      postsData
        .then((posts) => {
          const picturesContainer = document.querySelector('.pictures');
          const postsIdList = [];
          const random10 = [];
          //const postsClone = [...posts];

          for (let j = 0; j < posts.length; ++j) {
            postsIdList.push(posts[j].id);
          }

          for (let j = 0; j < postsIdList.length; ++j) {
            const randomNumber = Math.floor(Math.random() * postsIdList.length) + 1;
            random10.push(randomNumber);
          }

          const uniqueNumbersSet = createUniqueSet(random10);
          const uniqueNumbersArray = [];
          if (uniqueNumbersSet.size >= 10) {
            for (const uniqueNumber of uniqueNumbersSet.keys()) {
              uniqueNumbersArray.push(uniqueNumber);
            }
            uniqueNumbersArray.splice(10, uniqueNumbersArray.length - 10);
          }

          for (let j = 0; j < posts.length; ++j) {
            const templatePicture = createTemplateClone('#picture');
            const templatePicImg = templatePicture.children[0].children[0];
            const templatePicCommentAmount = templatePicture.children[0].children[1].children[0];
            const templatePicLikes = templatePicture.children[0].children[1].children[1];

            const generateHTML = (index) => {
              templatePicImg.setAttribute('loading', 'lazy');
              templatePicImg.setAttribute('src', posts[index].url);
              templatePicCommentAmount.textContent = posts[index].comments.length;
              templatePicLikes.textContent = posts[index].likes;
            };

            switch (id) {
              case 'filter-default':
                generateHTML(j);
                picturesContainer.appendChild(templatePicture);
                break;
              case 'filter-random':
                generateHTML(uniqueNumbersArray[j]);
                picturesContainer.appendChild(templatePicture);
                if (j === uniqueNumbersArray.length) {
                  break;
                }
                break;
              case 'filter-discussed':
                break;
            }
          }

          if (id === 'filter-random') {
            //console.log(uniqueNumbersArray.length, uniqueNumbersSet.size);
            for (let z = uniqueNumbersSet.size; z > 0; --z) {
              picturesContainer.children[z].remove();
              if (z <= 11) {
                break;
              }
            }
          }

          //console.log(uniqueNumbersSet, uniqueNumbersArray);
        });
    } else {
      imgFiltersBtn[i].classList.remove('img-filters__button--active');
      const templatePictures = document.querySelectorAll('.picture');
      templatePictures.forEach((el) => el.remove());
    }
  }
};

setTimeout(() => {
  showContent(imgFiltersBtn[0].id);
}, 100);
for (let i = 0; i < imgFiltersBtn.length; ++i) {
  imgFiltersBtn[i].addEventListener('click', () => setTimeout(() => {
    showContent(imgFiltersBtn[i].id);
  }, 100));
}
