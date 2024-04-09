import { createHotkey } from './hotkeyHandler.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureOverlay = document.querySelector('.big-picture.overlay');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const commentsCountElement = bigPicture.querySelector('.social__comment-shown-count');

const commentsPerPage = 5;
let commentsToShow = [];
let commentsCounter = 0;
clearCommentsList();

function clickOutOfPictireHandler(evt) {
  if(!evt.target.closest('.big-picture__preview')) {
    hideBigPicture();
  }
}

function addComment(comment) {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  commentsList.appendChild(newComment);
  commentsCountElement.textContent = commentsCounter += 1;
}

function updateBigPictureElement(picture) {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
}

function showNextCommentsPage() {
  for (let i = 0; i < commentsPerPage; i++) {
    if (commentsToShow.length > 0) {
      addComment(commentsToShow.shift());
    }
  }

  if (commentsToShow.length === 0) {
    commentsLoaderButton.hidden = true;
  }
}

function updateCommentsList(comments) {
  commentsToShow = comments.slice();
  showNextCommentsPage();
}

function clearCommentsList() {
  commentsToShow = [];
  commentsLoaderButton.hidden = false;
  commentsCounter = 0;
  commentsList.innerHTML = '';
  commentsCountElement.textContent = 0;
}

function escapeHandler() {
  hideBigPicture();
}

let escHotkey;

function openModal() {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  escHotkey = createHotkey({
    key: 'Escape',
    handler: escapeHandler,
  });
  bigPictureOverlay.addEventListener('click', clickOutOfPictireHandler);
}

function closeModal() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  escHotkey.destroy();
  bigPictureOverlay.removeEventListener('click', clickOutOfPictireHandler);
}

function showBigPicture(picture) {
  updateBigPictureElement(picture);
  updateCommentsList(picture.comments);
  openModal();
}

function hideBigPicture() {
  clearCommentsList();
  closeModal();
}

commentsLoaderButton.addEventListener('click', () => showNextCommentsPage());
closeButton.addEventListener('click', () => hideBigPicture());

export {showBigPicture};