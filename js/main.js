const descriptions = [
  'Эт я тут отдыхал',
  'Все на пляж!',
  'Цвет воды просто потрясный',
  'Это я!',
  'Зацените что приготовил',
  'Такую машинку хочу',
  'На диете, на завтрак одна клубничинка',
  'Хотите рецепт?',
  'Так низко летит!',
  'Крутой органайзер',
  'Очень солнечно сегодня!',
  'Вчера купил',
  'На пикнике',
  'Лучшая сушинка',
  'Модные тапки',
  'На отдых летел',
  'Был на концерте',
  'Всегда такую хотел',
  'Не знаю зачем, но пусть будут',
  'Отдыхаю',
  'На пп с сегодняшнего дня!',
  'Красивый закат',
  'Модный крабик',
  'Концерт был супер',
  'Приключение огонь',
];
const names = [
  'Вася',
  'Петя',
  'Конфетка',
  'Маша',
  'Алиса',
  'Картофельная долька',
  'Анастасия',
  'Елена',
  'Персевальд',
  'Персик',
  'Оксана',
  'Бусинка',
  'Пушинка',
  'Булочка',
];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const photosNumber = 25;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNumberGenerator() {
  let counter = 1;

  return () => counter++;
}

const getPhotoId = getNumberGenerator();
const getCommentId = getNumberGenerator();

function getRandomItem(arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
}

function createNewComment() {
  const message = [getRandomItem(messages)];

  if (Math.random() > 0.5) {
    message.push(getRandomItem(messages));
  }

  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: message.join(' '),
    name: getRandomItem(names),
  };
}

function createUserPhoto() {
  const id = getPhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: descriptions[id - 1],
    likes: getRandomNumber(15, 200),
    comments: Array.from({ length: getRandomNumber(0, 30) }, createNewComment),
  };
}

const photos = Array.from({ length: photosNumber }, createUserPhoto);

console.log(photos); // eslint-disable-line
