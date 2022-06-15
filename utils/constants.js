const errorMessages = {
  cardErrorMessage: { message: 'Карточка не найдена' },
  userErrorMessage: { message: 'Запрашиваемый пользователь не найден' },
  commonError: { message: 'Произошла ошибка' },
  badRequestMessage: { message: 'Переданы некорректные данные' },
};
const errorCodes = {
  CREATED_CODE: 201,
  NOT_FOUND_ERROR: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
};

module.exports = {
  errorMessages,
  errorCodes,
};
