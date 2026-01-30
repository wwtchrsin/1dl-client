import { regions } from "@/app/lib/regions"
import limits from "@/app/lib/server-limits"

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
