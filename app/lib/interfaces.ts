export type Region = "en" | "ru"

export type Lang = "en" | "ru"

export type TextResource = {
  "en": string,
  "ru": string,
}

export type Profile = {
  region: string,
  login: string,
  name: string,
  state: string,
  puid: string,
  timestamp: string,
}