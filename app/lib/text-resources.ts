import type { TextResource } from "./interfaces"

type TextResources = {
  AccountCreated: TextResource,
  active: TextResource,
  add: TextResource,
  allow: TextResource,
  BackgroundColor: TextResource,
  cancel: TextResource,
  close: TextResource,
  confirm: TextResource,
  cookieConsentHeader: TextResource,
  cookieConsentMessage: TextResource,
  ConfirmPassword: TextResource,
  create: TextResource,
  CreateAccount: TextResource,
  delete: TextResource,
  deleteAccount: TextResource,
  deleteAccountConfirmation: TextResource,
  deleteMessageConfirmation: TextResource,
  Error: TextResource,
  find: TextResource,
  inactive: TextResource,
  Login: TextResource,
  logout: TextResource,
  Name: TextResource,
  Password: TextResource,
  Profile: TextResource,
  Region: TextResource,
  ReportBug: TextResource,
  SearchByTag: TextResource,
  SignIn: TextResource,
  Status: TextResource,
  suspended: TextResource,
  unknown: TextResource,
  verify: TextResource,
}

type ComputedTextResources = {
  EntryNumber: (...args: any[]) => TextResource,
}

export const txtRes: TextResources = {
  AccountCreated: {
    en: "Account created",
    ru: "Аккаунт создан",
  },
  active: {
    en: "active",
    ru: "активный",
  },
  add: {
    en: "add",
    ru: "добавить",
  },
  allow: {
    en: "allow",
    ru: "разрешить",
  },
  BackgroundColor: {
    en: "Background",
    ru: "Цвет фона",
  },
  cancel: {
    en: "cancel",
    ru: "отменить",
  },
  close: {
    en: "close",
    ru: "закрыть",
  },
  confirm: {
    en: "confirm",
    ru: "подтвердить",
  },
  ConfirmPassword: {
    en: "Confirm Password",
    ru: "Подтвердите Пароль",
  },
  cookieConsentHeader: {
    en: "This website uses cookies",
    ru: "Сайт использует куки",
  },
  cookieConsentMessage: {
    en: "The website requires your permission to use cookies " +
      "which are necessary for the site to function properly. " +
      "The information to be stored in the browser's local storage includes: " +
      "user deviceid, region (if logged in), and session deviceid.",
    ru: "Сайту требуется ваше разрешение, чтобы использовать файлы куки, " +
      "которые необходимы для правильной работы сайта. " +
      "Информация, которая будет храниться в локальном хранилище браузера, это: " +
      "идентификатор пользователя, регион (если выполнен вход), идентификатор сессии.",
  },
  create: {
    en: "create",
    ru: "создать",
  },
  CreateAccount: {
    en: "Create account",
    ru: "Регистрация",
  },
  delete: {
    en: "delete",
    ru: "удалить"
  },
  deleteAccount: {
    en: "delete account",
    ru: "удалить аккаунт",
  },
  deleteAccountConfirmation: {
    en: "Are you sure you want to delete your account " +
      "and all the data associated with it? " +
      "This action cannot be undone.",
    ru: "Вы уверены, что хотите удалить ваш аккаунт " +
      "вместе со всеми связанными данными? " +
      "Это действие нельзя будет отменить.",
  },
  deleteMessageConfirmation: {
    en: "Are you sure you want to delete the entry?",
    ru: "Вы уверены что хотите удалить эту запись?",
  },
  Error: {
    en: "Error",
    ru: "Ошибка",
  },
  find: {
    en: "find",
    ru: "найти",
  },
  inactive: {
    en: "inactive",
    ru: "неактивный",
  },
  Login: {
    en: "Login",
    ru: "Логин",
  },
  logout: {
    en: "logout",
    ru: "выйти",
  },
  Name: {
    en: "Name",
    ru: "Имя",
  },
  Password: {
    en: "Password",
    ru: "Пароль",
  },
  Profile: {
    en: "Profile",
    ru: "Профиль",
  },
  Region: {
    en: "Region",
    ru: "Регион",
  },
  ReportBug: {
    en: "Report a bug",
    ru: "Сообщить об ошибке",
  },
  SearchByTag: {
    en: "Search by tag",
    ru: "Поиск по метке",
  },
  SignIn: {
    en: "Sign in",
    ru: "Вход",
  },
  Status: {
    en: "Status",
    ru: "Статус",
  },
  suspended: {
    en: "suspended",
    ru: "приостановлен",
  },
  unknown: {
    en: "unknown",
    ru: "неизвестный",
  },
  verify: {
    en: "verify",
    ru: "проверить",
  },
}

export const getTxtRes: ComputedTextResources = {
  EntryNumber: (index: number) => ({
    en: `Entry #${index}`,
    ru: `Запись №${index}`,
  }),
}