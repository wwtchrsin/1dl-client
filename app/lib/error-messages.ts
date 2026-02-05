import serverErrorMessages from "./server-error-messages"
import type { TextResource } from "./interfaces"

let errorMessages: Record<string, TextResource> = {
  ...serverErrorMessages as Record<string, TextResource>,
  "appError.unknownError": {
    en: "Unknown error",
    ru: "Неизвесная ошибка",
  },
  "appError.requestFailed": {
    en: "Request failed",
    ru: "Невозможно выполнить запрос",
  },
  "appError.passwordsMismatch": {
    en: "Passwords do not match",
    ru: "Пароли не совпадают",
  },
  "appError.pageNotFound": {
    en: "Page not found",
    ru: "Страница не найдена",
  },
  "appError.wrongMessageid": {
    en: "Wrong message identifier",
    ru: "Неверный идентификатор сообщения",
  },
  "appError.wsConnection": {
    en: "The WebSocket connection was lost",
    ru: "Соединение с WebSocket сервером было потеряно",
  },
  "appError.validationFailed": {
    en: "Request validation failed",
    ru: "Запрос не прошел проверку",
  },
}

export const getErrorMessage = (errorTag: string): TextResource => {
  let errorMessage = errorMessages[errorTag]
  if ( !errorMessage ) errorMessage = errorMessages["appError.unknownError"]
  return errorMessage
} 

