import limits from "@/app/lib/server-limits"
import type { Message } from "@/app/lib/interfaces"

export const processMsgcounts = (msgcounts: Record<string, number> | undefined,
  minIndex: number, maxIndex: number): number[] => {
    let result: number[] = []
    if ( !msgcounts ) {
      for ( let i=minIndex; i <= maxIndex; i++ ) {
        result[i] = 0
      }
    } else {
      for ( let i=minIndex; i <= maxIndex; i++ ) {
        result[i] = +(msgcounts[i] ?? 0)
      }
    }
    return result
  }

export const processZoneMsgcounts = (msgcounts: Record<string, number> | undefined): 
  number[] => {
    let minIndex = limits.message.zone.min
    let maxIndex = limits.message.zone.max
    return processMsgcounts(msgcounts, minIndex, maxIndex)
  }

export const processDistrictMsgcounts = (msgcounts: Record<string, number> | undefined): 
  number[] => {
    let minIndex = limits.message.district.min
    let maxIndex = limits.message.district.max
    return processMsgcounts(msgcounts, minIndex, maxIndex)
  }

export const processMessages = (messages: Message[] | undefined): 
  (Message | null)[] => {
    let minIndex = limits.message.index.min
    let maxIndex = limits.message.index.max
    let result: (Message | null)[] = []
    if ( !messages ) {
      for ( let i=minIndex; i <= maxIndex; i++ ) {
        result[i] = null
      }
    } else {
      for ( let i=0; i < messages.length; i++ ) {
        let index = messages[i].index
        result[index] = messages[i]
      }
      for ( let i=minIndex; i <= maxIndex; i++ ) {
        if ( !result[i] ) {
          result[i] = null
        }
      }
    }
    return result
  }

