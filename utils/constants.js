const errorMessages = {
  cardError: { message: 'Карточка не найдена' },
  userError: { message: 'Запрашиваемый пользователь не найден' },
  commonError: { message: 'Произошла ошибка' },
  badRequest: { message: 'Переданы некорректные данные' },
  pageNotFound: { message: 'Страница не найдена' },
  incorrectEmail: 'Неправильный формат почты',
};
const resCodes = {
  OK: 200,
  CREATED_CODE: 201,
  NOT_FOUND_ERROR: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
};

const randomString = '3995cb3ea47482de751bf3de83fa81d6d514ff11d02c0cd30ace6dd56c0dcc0e';
// eslint-disable-next-line no-useless-escape
const regexUrl = /https?:\/\/[www\.]*[\w-]+\.[a-z]+[\/\w\S]*/;

module.exports = {
  errorMessages,
  resCodes,
  randomString,
  regexUrl,
};
