export type Region = "en" | "ru"

export type Lang = "en" | "ru"

export type TextResource = {
  "en": string,
  "ru": string,
}

export type UserData = {
  region: Region,
  login: string,
  password: string,
  name: string,
}

export type Credentials = {
  region: Region,
  login: string,
  password: string,
}

export type Profile = {
  region: string,
  login: string,
  name: string,
  color: string,
  state: string,
  puid: string,
  timestamp: string,
}

export type LocationParams = {
  region: string | null | undefined,
  tag: string | null | undefined,
}

export type MessageParams = LocationParams & {
  index: string | null | undefined,
}

export type Location = {
  region: Region,
  tag: string,
}

export type Messageid = Location & {
  index: number,
}

export type MessageData = {
  region: Region,
  tag: string,
  index: number,
  text: string,
  color: string,
}

export type UserMessage = MessageData & {
  timestamp: string,
}

export type Message = UserMessage & {
  puid: string,
  username: string,
}