import domVariables from './domVariables.js';
import { createTemplateClone } from './validation.js';

const {
  body,
  imgFilters,
  imgFiltersBtn,
  bigPictureOverlay,
  bigPictureCancelBtn,
  bigPictureImg,
  socialPicture,
  socialCaption,
  likesCount,
  socialCommentShownCount,
  socialCommentTotalCount,
  socialCommentsList,
  socialComment,
  socialCommentAvatar,
  socialCommentText,
  socialCommentsLoader,
  socialCurrentUserAvatar,
  socialCurrentUserComment,
  socialCurrentUserPostComment
} = domVariables;

imgFilters.classList.remove('img-filters--inactive');

const openBigPicture = () => {
  body.classList.add('modal-open');
  bigPictureOverlay.classList.remove('hidden');
};

const hideBigPicture = () => {
  body.classList.remove('modal-open');
  bigPictureOverlay.classList.add('hidden');
  likesCount.classList.remove('liked');
  socialCommentsLoader.classList.remove('hidden');
  socialCommentsLoader.textContent = 'Загрузить еще';
};

bigPictureCancelBtn.addEventListener('click', hideBigPicture);
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    hideBigPicture();
  }
});

const like = (likeData) => {
  if (!likesCount.classList.contains('liked')) {
    likeData++;
    likesCount.textContent++;
    document.querySelector('.picture__likes').textContent++;
    likesCount.classList.add('liked');
  }
};

const loadAdditionalComments = (commentElements) => {
  for (let i = 0; i < commentElements.length; ++i) {
    if (i > 5) {
      socialCommentsLoader.textContent = 'Это все!';
      setTimeout(() => {
        socialCommentsLoader.classList.add('hidden');
      }, 3000);
    }
    commentElements[i].classList.remove('hidden');
  }
};

const loadComments = (dataPosts, index) => {
  socialCommentsList.innerHTML = '';
  for (let z = 0; z < dataPosts[index].comments.length; ++z) {
    const socialCommentClone = document.createElement('li');
    socialCommentClone.setAttribute('class', 'social__comment');
    socialCommentClone.innerHTML = `<img class="social__picture" src="${dataPosts[index].comments[z].avatar}" alt="Аватар комментатора фотографии" width="35" height="35">
    <p class="social__text">${dataPosts[index].comments[z].message}</p>`;
    socialCommentsList.appendChild(socialCommentClone);
  }

  const socialComments = document.querySelectorAll('.social__comment');
  for (let z = 0; z < socialComments.length; ++z) {
    if (z >= 5) {
      socialComments[z].classList.add('hidden');
    }
  }

  socialCommentsLoader.addEventListener('click', () => {
    loadAdditionalComments(socialComments);
  });
};

const setImgData = (picturesList, currentPictureURL, index, dataPosts) => {
  if (currentPictureURL === dataPosts[index].url) {
    bigPictureImg.setAttribute('src', dataPosts[index].url);
    socialCaption.textContent = dataPosts[index].description;
    likesCount.textContent = dataPosts[index].likes;
    // loading comments
    loadComments(dataPosts, index);

    console.log(dataPosts[index]);
  }
};

const loadBigPictureData = (index, picturesList, data) => {
  openBigPicture(index);
  const currentPicture = picturesList[index].children[0];
  const currentPictureSrc = currentPicture.getAttribute('src');

  for (let z = 0; z < data.length; ++z) {
    setImgData(picturesList, currentPictureSrc, z, data);
    likesCount.addEventListener('click', () => like(data[z].likes), {once:true});
  }
};

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

const showContent = (id) => {
  for (let i = 0; i < imgFiltersBtn.length; ++i) {
    if (id === imgFiltersBtn[i].id) {
      imgFiltersBtn[i].classList.add('img-filters__button--active');
      const postsData = getData('https://30.javascript.pages.academy/kekstagram/data');

      postsData
        .then((posts) => {
          const picturesContainer = document.querySelector('.pictures');
          const postsIdList = [];

          for (let j = 0; j < posts.length; ++j) {
            postsIdList.push(posts[j].id);
          }

          for (let j = postsIdList.length - 1; j > 0; j--) {
            const random = Math.floor(Math.random() * (j + 1));
            [postsIdList[j], postsIdList[random]] = [postsIdList[random], postsIdList[j]];
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
                generateHTML(postsIdList[j]);
                picturesContainer.appendChild(templatePicture);
                break;
              case 'filter-discussed':
                generateHTML(j);
                picturesContainer.appendChild(templatePicture);
                break;
            }
          }

          if (id === 'filter-random') {
            const picturesList = document.querySelectorAll('.picture');
            for (let j = 0; j < picturesList.length; ++j) {
              picturesList[j].remove();
              if (j === 14) {
                break;
              }
            }

            for (let j = 0; j < picturesList.length; ++j) {
              picturesList[j].addEventListener('click', () => {
                loadBigPictureData(j, picturesList, posts);
              });
            }
          } else if (id === 'filter-default') {
            const picturesList = document.querySelectorAll('.picture');

            for (let j = 0; j < picturesList.length; ++j) {
              picturesList[j].addEventListener('click', () => {
                loadBigPictureData(j, picturesList, posts);
              });
            }
          } else if (id === 'filter-discussed') {
            const picturesList = document.querySelectorAll('.picture');

            for (let j = 0; j < picturesList.length; ++j) {
              picturesList[j].addEventListener('click', () => {
                loadBigPictureData(j, picturesList, posts);
              });
            }
          }

          console.log(posts);
        })
        .catch((error) => {
          if (error) {
            throw error;
          }
        });
    } else {
      imgFiltersBtn[i].classList.remove('img-filters__button--active');
      const templatePictures = document.querySelectorAll('.picture');
      templatePictures.forEach((el) => el.remove());
    }
  }
};

setTimeout(() => showContent(imgFiltersBtn[0].id), 100);
for (let i = 0; i < imgFiltersBtn.length; ++i) {
  imgFiltersBtn[i].addEventListener('click', () => setTimeout(() => {
    showContent(imgFiltersBtn[i].id);
  }, 100));
}
