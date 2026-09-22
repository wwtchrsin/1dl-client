export default {
  "wrongValue.message.region": {
    "en": "An incorrect value for region. Valid values: en, ru.",
    "ru": "Неверное значение для региона. Корректные значения: en, ru."
  },
  "wrongValue.message.tag": {
    "en": "An incorrect value for tag. The message tag must be a string containing lowercase latin letters only, between 1 and 6 characters in length.",
    "ru": "Метке сообщения задано неверное значение. Метка должна быть строкой содержащей только строчные латинские буквы и имеющей длину от 1 до 6 символов."
  },
  "wrongValue.message.index": {
    "en": "An incorrect value for index. The value must be an integer within the range of [0, 299]",
    "ru": "Неверное значение для индекса. Значение должно быть целым числов находящимся в интервале [0, 299]"
  },
  "wrongValue.message.text": {
    "en": "An incorrect value for text.  The message text can only contain printable ASCII characters (latin letters, digits, spaces, punctuation marks and some other characters like \"#\" or \"@\") and cannot have trailing or leading spaces nor have more than one space in a row. The message length must be within the range of [16, 128]",
    "ru": "Неверное значение для теста.  Текст сообщения может содержать только печатные символы таблицы ASCII (латинские буквы, цифры, пробелы, знаки препинания и некоторые другие символы как \"@\" или \"#\") и не может начинаться или заканчиваться пробелом или содержать больше одного пробела подряд. Длина сообщения должна находиться в интервале [16, 128]"
  },
  "wrongValue.message.color": {
    "en": "An incorrect value for color. Valid values: black, red, orange, yellow, green, cyan, blue, purple, pink.",
    "ru": "Неверное значение для цвета. Корректные значения: black, red, orange, yellow, green, cyan, blue, purple, pink."
  },
  "wrongValue.user.region": {
    "en": "An incorrect value for region. Valid values: en, ru.",
    "ru": "Неверное значение для региона. Корректные значения: en, ru."
  },
  "wrongValue.user.login": {
    "en": "An incorrect value for login.  The login can only contain latin letters, digits, and symbols \"-\" and \"_\". The login length must be within the range of [8, 16].",
    "ru": "Неверное значение для логина.  Логин может содержать только латинские буквы, цифры, и символы \"-\" и \"_\". Длина логина должна находиться в интервале [8, 16]."
  },
  "wrongValue.user.password": {
    "en": "An incorrect value for password.  The password can only contain latin letters, digits and special symbols (\"!\", \"@\", \"#\", \"$\", \"%\", \"^\", \"&\", \"*\", \"+\", \"=\", \"_\", \"-\"), and must contain at least one lowercase letter, one uppercase letter, one digit and one special symbol. The password length must be within the range of [8, 24].",
    "ru": "Неверное значение для пароля.  Пароль может содержать только латинские буквы, цифры, и специальные символы (\"!\", \"@\", \"#\", \"$\", \"%\", \"^\", \"&\", \"*\", \"+\", \"=\", \"_\", \"-\"), и должен содержать хотя бы одну строчную букву, одну заглавную букву, одну цифру и один специальный символ. Длина пароля должна находиться в интервале [8, 24]."
  },
  "wrongValue.user.name": {
    "en": "An incorrect value for name.  The user name can only contain latin letters, digits, and symbols \"-\" and \"_\". The name length must be within the range of [8, 16].",
    "ru": "Неверное значение для имени.  Имя пользователя может содержать только латинские буквы, цифры, и символы \"-\" и \"_\". Длина имени должна находиться в интервале [8, 16]."
  },
  "wrongValue.user.userid": {
    "en": "Wrong user identifier",
    "ru": "Недопустимый идентификатор пользователя"
  },
  "wrongValue.user.deviceid": {
    "en": "Wrong device identifier",
    "ru": "Недопустимый идентификатор устройства"
  },
  "wrongValue.auth.region": {
    "en": "Region is not set or incorrect",
    "ru": "Регион не задан или имеет недопустимое значение"
  },
  "wrongValue.auth.login": {
    "en": "Login is not set or incorrect",
    "ru": "Логин не задан или имеет недопустимое значение"
  },
  "wrongValue.auth.password": {
    "en": "Password is not set or incorrect",
    "ru": "Пароль не задан или имеет недопустимое значение"
  },
  "wrongValue.auth.header": {
    "en": "Authorization header is not set or incorrect",
    "ru": "Заголовок 'Authorization' не задан или имеет недопустимое значение"
  },
  "wrongValue.auth.sessionid": {
    "en": "Wrong session identifier",
    "ru": "Недопустимый идентификатор сессии"
  },
  "wrongValue.auth.serviceid": {
    "en": "Wrong service id",
    "ru": "Недопустимый идентификатор сервиса"
  },
  "appError.actionNotAllowed": {
    "en": "Action not allowed",
    "ru": "Действие запрещено"
  },
  "appError.unhandledError": {
    "en": "Unknown unhandled error occurred",
    "ru": "Произошла неизвестая необработанная ошибка"
  },
  "appError.wrongUrl": {
    "en": "Wrong request URL",
    "ru": "Неверный URL запроса"
  },
  "databaseError.getMessages": {
    "en": "Impossible to get the list of messages",
    "ru": "Невозможно получить список сообщений"
  },
  "databaseError.getMessage": {
    "en": "Impossible to get the message requested",
    "ru": "Невозможно получить запрошенное сообщение"
  },
  "databaseError.createMessage": {
    "en": "Impossible to save the message",
    "ru": "Невозможно сохранить сообщение"
  },
  "databaseError.checkUserExists": {
    "en": "Impossible to check if user exists",
    "ru": "Невозможно проверить существует ли пользователь"
  },
  "databaseError.checkMessage": {
    "en": "Impossible to check the message",
    "ru": "Невозможно проверить сообщение"
  },
  "databaseError.createProfile": {
    "en": "Impossible to create profile",
    "ru": "Невозможно создать профиль"
  },
  "databaseError.deleteSession": {
    "en": "Impossible to delete the session",
    "ru": "Невозможно удалить сессию"
  },
  "databaseError.getDeviceid": {
    "en": "Impossible to retrieve device identifier",
    "ru": "Невозможно извлечь идентификатор устройства"
  },
  "databaseError.createSession": {
    "en": "Impossible to create a session",
    "ru": "Невозможно создать сессию"
  },
  "databaseError.verifyCredentials": {
    "en": "Impossible to verify credentials",
    "ru": "Невозможно проверить учетные данные пользователя"
  },
  "databaseError.getProfile": {
    "en": "Impossible to retrieve profile data",
    "ru": "Невозможно извлечь данные профиля"
  },
  "databaseError.getUserid": {
    "en": "Impossible to retrieve user identifier",
    "ru": "Невозможно извлечь идентификатор пользователя"
  },
  "databaseError.getUserMessages": {
    "en": "Impossible to retrieve user messages",
    "ru": "Невозможно извлечь сообщения пользователя"
  },
  "databaseError.deleteProfile": {
    "en": "Impossible to delete profile",
    "ru": "Невозможно удалить профиль"
  },
  "databaseError.deleteMessage": {
    "en": "Impossible to delete message",
    "ru": "Невозможно удалить сообщение"
  },
  "databaseConflict.messageNotFound": {
    "en": "Message not found",
    "ru": "Сообщение не найдено"
  },
  "databaseConflict.messageAlreadyExists": {
    "en": "Message already exists",
    "ru": "Сообщение уже существует"
  },
  "databaseConflict.loginTaken": {
    "en": "The login is already taken",
    "ru": "Логин уже используется"
  },
  "databaseConflict.sessionNotFound": {
    "en": "Session not found",
    "ru": "Сессия не найдена"
  },
  "databaseConflict.profileNotFound": {
    "en": "Profile not found",
    "ru": "Профиль не найден"
  },
  "wsError.wrongLocation": {
    "en": "WebSocket server: an incorrect value for location",
    "ru": "Websocket сервер: неверное значение для локации"
  },
  "wsError.wrongDeviceid": {
    "en": "WebSocket server: an incorrect value for device identifier",
    "ru": "Websocket сервер: неверное значение для идентификатора устройства"
  },
  "wsError.wrongMessageType": {
    "en": "WebSocket server: an incorrect value for message type",
    "ru": "Websocket сервер: неверное значение для типа сообщения"
  },
  "wsError.wrongJson": {
    "en": "WebSocket server: impossible to decode the message",
    "ru": "Websocket сервер: невозможно декодировать сообщение"
  }
}