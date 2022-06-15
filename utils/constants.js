const errorMessages = {
  cardError: { message: 'Карточка не найдена' },
  userError: { message: 'Запрашиваемый пользователь не найден' },
  commonError: { message: 'Произошла ошибка' },
  badRequest: { message: 'Переданы некорректные данные' },
  pageNotFound: { message: 'Страница не найдена' },
};
const resCodes = {
  CREATED_CODE: 201,
  NOT_FOUND_ERROR: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
};

module.exports = {
  errorMessages,
  resCodes,
};
