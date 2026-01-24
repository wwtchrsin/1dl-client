import serverErrorMessages from "./server-error-messages"
import type { TextResource } from "./interfaces"

let errorMessages: Record<string, TextResource> = {
  ...serverErrorMessages as Record<string, TextResource>,
  "appErrors.unknownError": {
    en: "Unknown error",
    ru: "Неизвесная ошибка",
  },
  "appErrors.requestFailed": {
    en: "Request failed",
    ru: "Невозможно выполнить запрос",
  },
  "appErrors.passwordsNotMatch": {
    en: "Passwords do not match",
    ru: "Пароли не совпадают",
  },
}

export const getErrorMessage = (errorTag: string): TextResource => {
  let errorMessage = errorMessages[errorTag]
  if ( !errorMessage ) errorMessage = errorMessages["appErrors.unknownError"]
  return errorMessage
} 

