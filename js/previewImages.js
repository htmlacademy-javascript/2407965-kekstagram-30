import domVariables from './domVariables.js';

const {
  picturesImg,
  bigPictureOverlay,
  bigPicturePreview,
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

const previewImages = {
  openBigPictureOverlay(data, index, url) {
    bigPictureOverlay.classList.remove('hidden');
    this.loadImage(data, index, url);
  },
  closeBigPictureOverlay() {
    bigPictureOverlay.classList.add('hidden');
    this.clearComments();
  },
  startEventListeners(data) {
    const pictures = document.querySelectorAll('.picture');

    for (let i = 0; i < pictures.length; ++i) {
      const currentImage = pictures[i].children.item(0);
      const currentImageURL = currentImage.getAttribute('src');

      pictures[i].addEventListener('click', () => this.openBigPictureOverlay(data, i, currentImageURL));

      if (socialCurrentUserComment.value !== '') {
        this.loadPostedComment(data, i, currentImageURL);
      }
    }

    bigPictureCancelBtn.addEventListener('click', this.closeBigPictureOverlay);
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.closeBigPictureOverlay();
      }
    });
  },
  createComment(data, index, i) {
    const userComment = document.createElement('li');

    userComment.setAttribute('class', 'social__comment');
    userComment.innerHTML = `
    <img class="social__picture" src="${data[index].comments[i].avatar}" alt="${data[index].comments[i].name}" width="35" height="35">
    <p class="social__text">${data[index].comments[i].message}</p>`;

    return userComment;
  },
  loadingComments(data, index) {
    for (let i = 0; i < data[index].comments.length; ++i) {
      const userComment = this.createComment(data, index, i);
      socialCommentsList.appendChild(userComment);

      if (i >= 5) {
        userComment.classList.add('hidden');
      }
    }
  },
  setImageDatas(data, index) {
    bigPictureImg.setAttribute('src', data[index].url);
    socialCaption.textContent = data[index].description;
    likesCount.textContent = data[index].likes;
    socialCommentTotalCount.textContent = data[index].comments.length;

    this.loadingComments(data, index);
    if (data[index].comments.length > 5) {
      socialCommentShownCount.textContent = 5;
    } else {
      socialCommentShownCount.textContent = data[index].comments.length;
    }
    socialCommentTotalCount.textContent = data[index].comments.length;

    const comments = document.querySelectorAll('.social__comment');
    socialCommentsLoader.addEventListener('click', () => {
      for (let i = 0; i < comments.length; ++i) {
        this.loadAdditionalComments(i, comments);
      }
    });
  },
  setImageData(data, index, url) {
    if (url === data[index].url) {
      this.setImageDatas(data, index);
      likesCount.addEventListener('click', () => {
        this.like(data, index);
      }, {
        once: true
      });
      socialCurrentUserPostComment.addEventListener('click', this.postComment(data, index));
    } else {
      for (let i = 0; i < data.length; ++i) {
        if (url === data[i].url) {
          this.setImageDatas(data, i);
          likesCount.addEventListener('click', () => {
            this.like(data, i);
          }, {
            once: true
          });
          socialCurrentUserPostComment.addEventListener('click', this.postComment(data, i));
        }
      }
    }
  },
  loadPostedComment(data, index, url) {
    if (url === data[index].url) {
      socialCurrentUserPostComment.addEventListener('click', this.postComment(data, index));
    } else {
      for (let i = 0; i < data.length; ++i) {
        if (url === data[i].url) {
          socialCurrentUserPostComment.addEventListener('click', this.postComment(data, i));
        }
      }
    }
  },
  loadImage(data, index, url) {
    this.setImageData(data, index, url);
  },
  clearComments() {
    const socialComments = document.querySelectorAll('.social__comment');
    for (let i = 0; i < socialComments.length; ++i) {
      socialComments[i].remove();
    }
    socialCommentShownCount.textContent = 0;
  },
  loadAdditionalComments(index, socialComments) {
    if (socialComments[index].classList.contains('hidden')) {
      socialComments[index].classList.remove('hidden');
      socialCommentShownCount.textContent = index + 1;
    }
  },
  like(data, index) {
    const picturesLikes = document.querySelectorAll('.picture__likes');
    if (!picturesLikes[index].classList.contains('liked')) {
      likesCount.textContent++;
      picturesLikes[index].textContent++;
      picturesLikes[index].classList.add('liked');
      data[index].likes++;
    }
  },
  postComment(data, index) {
    const comments = document.querySelectorAll('.social__comment');
    const message = socialCurrentUserComment.value;

    if (message !== '') {
      for (let i = 0; i < comments.length; ++i) {
        if (comments[i].classList.contains('hidden')) {
          this.loadAdditionalComments(i, comments);
        }
      }

      const userComment = document.createElement('li');
      userComment.setAttribute('class', 'social__comment');
      userComment.innerHTML = `<img class="social__picture" src="img/avatar-6.svg" alt="Аватар комментатора фотографии" width="35" height="35">
      <p class="social__text">${message}</p>`;

      socialCommentsList.appendChild(userComment);

      socialCommentShownCount.textContent++;
      socialCommentTotalCount.textContent++;

      socialCurrentUserComment.value = '';

      data[index].comments.push({
        id: data[data[index].comments.length - 1].id + 1,
        avatar: 'img/avatar-6.svg',
        message: message,
        name: 'Jaloliddin'
      });

      console.log(data[index].comments);
    }
  }
};

const startPreviewing = (data) => {
  previewImages.clearComments();
  previewImages.startEventListeners(data);

  console.log(data);
};

export default startPreviewing;
