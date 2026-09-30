import { regions } from "@/app/lib/regions"
import { patterns } from "@/app/lib/limits"
import * as locationProcessors from "@/app/lib/location-processors"

export const getUrlSegments = (url: string): string[] => {
  let segments = url.split("/").slice(1)
  if ( segments.length === 0 ) {
    return []
  }
  let [ region, tag ] = segments
  if ( !region || !(regions as string[]).includes(region) ) {
    return []
  }
  if ( !tag || !patterns.tag.test(tag) ) {
    return [ region ]
  }
  return [ region, tag ]
}

export const getLocation = (url: string) => {
  let segments = url.split("/").slice(1)
  let [ region, tag, index ] = segments
  switch ( segments.length ) {
    case 1: {
      let value = locationProcessors.getRegion(region)
      return (value && { region: value }) || undefined
    }
    case 2: {
      return locationProcessors.getLocation({ region, tag })
    }
    case 3: {
      return locationProcessors.getMessageid({ region, tag, index })
    }
    default: {
      return undefined
    }
  }
}

export const parseJSON = (jsonString: string | undefined): any => {
  if ( !jsonString ) {
    return undefined
  }
  try {
    return JSON.parse(jsonString)
  } catch (err) {
    return undefined
  }
}

export const getTimestamp = () => Math.floor((new Date()).valueOf() / 1000)

export const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}