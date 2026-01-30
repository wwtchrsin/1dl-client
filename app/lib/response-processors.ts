import type { Message } from "@/app/lib/interfaces"

export const processMsgcounts = (msgcounts: Record<string, number> | undefined,
  minIndex: number, maxIndex: number): string[] => {
    let result: string[] = []
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

export const processMessages = (messages: Message[] | undefined, minIndex: number,
  maxIndex: number): (Message | null)[] => {
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