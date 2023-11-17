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
          const imgPreviewHandle = (currentIndex) => {
            const pictures = document.querySelectorAll('.picture');
            const imgPreview = () => {
              const openBigPicture = () => {
                body.classList.add('modal-open');
                bigPictureOverlay.classList.remove('hidden');
              };

              const hideBigPicture = () => {
                body.classList.remove('modal-open');
                bigPictureOverlay.classList.add('hidden');
              };

              bigPictureCancelBtn.addEventListener('click', hideBigPicture);
              document.addEventListener('keydown', (evt) => {
                if (evt.key === 'Escape') {
                  hideBigPicture();
                }
              });

              for (let j = 0; j < pictures.length; ++j) {
                pictures[j].addEventListener('click', () => {
                  openBigPicture();
                });
                bigPictureImg.setAttribute('src', posts[currentIndex].url);
              }
            };
            if (pictures) {
              imgPreview();
            }
          };

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

            for (let j = 0; j < postsIdList.length; ++j) {
              imgPreviewHandle(postsIdList[j]);
            }
          }
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
