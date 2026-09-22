import limits from "@/app/lib/server-limits"
import type { Message } from "@/app/lib/interfaces"

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

