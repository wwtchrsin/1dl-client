import { regions } from "@/app/lib/regions"
import limits from "@/app/lib/server-limits"
import * as locationProcessors from "@/app/lib/location-processors"

export const getUrlSegments = (url: string): string[] => {
  let segments = url.split("/").slice(1)
  if ( segments.length === 0 ) {
    return []
  }
  let [ region, district, zone ] = segments
  if ( !region || !(regions as string[]).includes(region) ) {
    return []
  }
  if ( isNaN(+district) || +district < limits.message.district.min || 
    +district > limits.message.district.max ) {
      return [ region ]
    }
  if ( isNaN(+zone) || +zone < limits.message.zone.min || 
    +zone > limits.message.zone.max ) {
      return [ region, district ]
    }
  return [ region, district, zone ]
}

export const getLocation = (url: string) => {
  let segments = url.split("/").slice(1)
  let [ region, district, zone ] = segments
  switch ( segments.length ) {
    case 1: {
      let value = locationProcessors.getRegion(region)
      return (value && { region: value }) || undefined
    }
    case 2: {
      return locationProcessors.getDistrictid({ region, district})
    }
    case 3: {
      return locationProcessors.getZoneid({ region, district, zone })
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