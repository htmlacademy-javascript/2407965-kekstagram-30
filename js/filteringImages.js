import { createTemplateClone } from './validation.js';

const filteringImages = {
  createIDList(data, idArrayList) {
    for (let i = 0; i < data.length; ++i) {
      idArrayList.push(data[i].id);
    }
  },
  randomizeIDList(postsIdList) {
    for (let i = postsIdList.length - 1; i > 0; --i) {
      const random = Math.floor(Math.random() * (i + 1));
      [postsIdList[i], postsIdList[random]] = [postsIdList[random], postsIdList[i]];
    }
  },
  clonePictureTemplate() {
    const templatePic = createTemplateClone('#picture');
    const templatePicImg = templatePic.children[0].children[0];
    const templatePicCommentCount = templatePic.children[0].children[1].children[0];
    const templatePicLikesCount = templatePic.children[0].children[1].children[1];

    return {
      templatePic,
      templatePicImg,
      templatePicCommentCount,
      templatePicLikesCount
    };
  },
  loadPicture(data, index, picturesContainer) {
    const pictureTemplate = this.clonePictureTemplate();

    pictureTemplate.templatePicImg.setAttribute('loading', 'lazy');
    pictureTemplate.templatePicImg.setAttribute('src', data[index].url);
    pictureTemplate.templatePicCommentCount.textContent = data[index].comments.length;
    pictureTemplate.templatePicLikesCount.textContent = data[index].likes;

    picturesContainer.appendChild(pictureTemplate.templatePic);
  },
  loadPictures(data) {
    const picturesContainer = document.querySelector('.pictures');

    for (let i = 0; i < data.length; ++i) {
      this.loadPicture(data, i, picturesContainer);
    }

    return data;
  },
  loadRandomPictures(data, randomizedIdArray) {
    const picturesContainer = document.querySelector('.pictures');
    for (let i = 0; i < data.length; ++i) {
      this.loadPicture(data, randomizedIdArray[i], picturesContainer);
    }

    const picture = document.querySelectorAll('.picture');
    for (let i = 0; i < data.length - 10; ++i) {
      picture[i].remove();
    }
  },
  loadDiscussedPictures(data) {
    const picturesContainer = document.querySelector('.pictures');

    const filterAndSortImagesByCommentsCount = (dataPosts, minCommentsCount) => {
      const filteredImages = dataPosts.filter((image) => image.comments.length >= minCommentsCount);

      filteredImages.sort((a, b) => b.comments.length - a.comments.length);

      return filteredImages;
    };

    const minCommentsCountThreshold = 0;
    const filteredAndSortedImages = filterAndSortImagesByCommentsCount(data, minCommentsCountThreshold);

    for (let i = 0; i < filteredAndSortedImages.length; ++i) {
      this.loadPicture(filteredAndSortedImages, i, picturesContainer);
    }

    return filteredAndSortedImages;
  }
};

export default filteringImages;
