import limits from "@/app/lib/server-limits"
import { regions } from "@/app/lib/regions"
import type * as Interfaces from "@/app/lib/interfaces"

export const getRegion = (region: string | undefined | null): 
  Interfaces.Region | undefined => {
    if ( !region || !(regions as string[]).includes(region) ) {
      return undefined
    }
    return region as Interfaces.Region
  }

export const getDistrictid = (params: Interfaces.DistrictParams): 
  Interfaces.Districtid | undefined => {
    let region = getRegion(params.region)
    if ( region === undefined ) {
      return undefined
    }
    if ( !params.district || isNaN(+params.district) || 
      +params.district < limits.message.district.min || 
      +params.district > limits.message.district.max ) {
        return undefined
      }
    return {
      region: region,
      district: +params.district,
    }
  }

export const getZoneid = (params: Interfaces.ZoneParams):
  Interfaces.Zoneid | undefined => {
    let districtid = getDistrictid(params)
    if ( districtid === undefined ) {
      return undefined
    }
    if ( !params.zone || isNaN(+params.zone) || 
      +params.zone < limits.message.zone.min ||
      +params.zone > limits.message.zone.max ) {
        return undefined
      }
    return {
      region: districtid.region,
      district: districtid.district,
      zone: +params.zone,
    }
  }
  
export const getMessageid = (params: Interfaces.MessageParams):
  Interfaces.Messageid | undefined => {
    let zoneid = getZoneid(params)
    if ( zoneid === undefined ) {
      return undefined
    }
    if ( !params.index || isNaN(+params.index) ||
      +params.index < limits.message.index.min ||
      +params.index > limits.message.index.max ) {
        return undefined
      }
    return {
      region: zoneid.region,
      district: zoneid.district,
      zone: zoneid.zone,
      index: +params.index,
    }
  }

