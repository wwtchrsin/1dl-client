import limits from "@/app/lib/server-limits"
import { regions } from "@/app/lib/regions"
import { patterns } from "@/app/lib/limits"
import type * as Interfaces from "@/app/lib/interfaces"

export const getRegion = (region: string | undefined | null): 
  Interfaces.Region | undefined => {
    if ( !region || !(regions as string[]).includes(region) ) {
      return undefined
    }
    return region as Interfaces.Region
  }

export const getLocation = (params: Interfaces.LocationParams):
  Interfaces.Location | undefined => {
    let region = getRegion(params.region)
    if ( region === undefined ) {
      return undefined
    }
    if ( !params.tag || !patterns.tag.test(params.tag) ) {
      undefined
    }
    return {
      region: region,
      tag: params.tag as string,
    }
  }
  
export const getMessageid = (params: Interfaces.MessageParams):
  Interfaces.Messageid | undefined => {
    let location = getLocation(params)
    if ( location === undefined ) {
      return undefined
    }
    if ( !params.index || isNaN(+params.index) ||
      +params.index < limits.message.index.min ||
      +params.index > limits.message.index.max ) {
        return undefined
      }
    return {
      region: location.region,
      tag: location.tag,
      index: +params.index,
    }
  }

