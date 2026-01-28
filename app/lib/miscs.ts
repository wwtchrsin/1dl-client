import { regions } from "@/app/lib/regions"
import limits from "@/app/lib/server-limits"

export const processMsgcounts = (msgcounts: Record<string, number> | undefined,
  minIndex: number, maxIndex: number): string[] => {
    let result = []
    if ( !msgcounts ) {
      for ( let i=minIndex; i <= maxIndex; i++ ) {
        result[i] = "[udf]"
      }
    } else {
      for ( let i=minIndex; i <= maxIndex; i++ ) {
        result[i] = `${msgcounts[i] ?? 0}`
      }
    }
    return result
  }

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

export const gridCellBackground = (colors: string[], columns: Map<string, number>, 
  cellIndex: number, colorMinIndex: number): string => {
    let result = ""
    for ( let [ prefix, cols ] of columns ) {
      let bgIndex = Math.floor((cellIndex % (4 * cols)) / cols) -
        2 * Math.floor((cellIndex % (4 * cols)) / (3 * cols))
      let bgColor = colors[colorMinIndex + bgIndex]
      result += ` ${prefix}${bgColor}`
    }
    return result
  }