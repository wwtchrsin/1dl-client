export type Region = "en" | "ru"

export type Lang = "en" | "ru"

export type TextResource = {
  "en": string,
  "ru": string,
}

export type UserData = {
  region: string,
  login: string,
  password: string,
  name: string,
}

export type Credentials = {
  region: string,
  login: string,
  password: string,
}

export type Profile = {
  region: string,
  login: string,
  name: string,
  state: string,
  puid: string,
  timestamp: string,
}

export type DistrictParams = {
  region: string | null | undefined,
  district: string | null | undefined,
}

export type ZoneParams = DistrictParams & {
  zone: string | null | undefined,
}

export type MessageParams = ZoneParams & {
  index: string | null | undefined,
}

export type Districtid = {
  region: Region,
  district: number,
}

export type Zoneid = Districtid & {
  zone: number,
}

export type Messageid = Zoneid & {
  index: number,
}

export type MessageData = {
  region: Region,
  district: number,
  zone: number,
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