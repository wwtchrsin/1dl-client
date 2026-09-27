
import Image from "next/image"
import { timestampToDate } from "@/app/lib/miscs"
import type * as I from "@/app/lib/interfaces"

type MessageProps = {
  message: I.Message,
  onClick: () => unknown,
  enabled: boolean,
  active: boolean,
}

export default function Message(props: MessageProps) {
  let { message, onClick, enabled, active } = props
  let icon = active ? "cancel" : "delete"

  return (
  <div className="h-full w-full flex flex-col items-center justify-center">
    <div className="px-8 flex flex-col items-start">
      <div>{ message.text }</div>
      <div className="flex flex-row gap-2 text-white/80">
        <div className="font-bold">
          { message.username }
        </div>
        <div>
          { timestampToDate(+message.timestamp) }
        </div>
      </div>
      {enabled && (
        <div className="absolute bottom-4 right-4 p-2 rounded-full bg-white/20">
          <Image
            src={`/icons/entry-${icon}.svg`} alt="icon"
            width={24} height={24} className="cursor-pointer"
            onClick={() => onClick()}
          />
        </div>
      )}
    </div>
  </div>
  )
}