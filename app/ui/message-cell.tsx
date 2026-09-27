import Image from "next/image"
import { regionBgColors, regionLang } from "../lib/regions"
import * as I from "@/app/lib/interfaces"

type MessageCellProps = {
  onClick?: () => void,
  index: number,
  region: I.Region,
  enabled: boolean,
  active: boolean,
}

export default function MessageCell(props: MessageCellProps) {
  let { region, index, onClick, enabled, active } = props
  let buttonBgColor = onClick ? regionBgColors[region][3] : regionBgColors[region][2]
  let icon = active ? "cancel" : "add"
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="max-w-80 px-6 flex flex-col gap-2 items-center">
        <div className="w-14 h-14 flex justify-center items-center rounded-full bg-white/75 font-bold">
          { (index + 1) }
        </div>
        {enabled && (
          <button 
            className={`absolute p-2 bottom-4 right-4 cursor-pointer rounded-full ${buttonBgColor} text-white`}
            onClick={onClick}>
              <Image
                src={`/icons/entry-${icon}.svg`} alt={icon}
                width={24} height={24}
              />
          </button>
        )}
      </div>
    </div>
  )
}