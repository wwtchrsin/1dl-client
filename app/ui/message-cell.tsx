import { regionBgColors, regionLang } from "../lib/regions"
import * as I from "@/app/lib/interfaces"

let TxtRes = {
  EntryNumber: {
    en: (index: number) => `Entry #${index}`,
    ru: (index: number) => `Запись №${index}`,
  },
  add: {
    en: "add",
    ru: "добавить",
  },
}

type MessageCellProps = {
  onClick?: () => void,
  index: number,
  region: I.Region, 
}

export default function MessageCell({ region, index, onClick }: MessageCellProps) {
  let lang = regionLang[region]
  let buttonBgColor = onClick ? regionBgColors[region][3] : regionBgColors[region][2]
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="max-w-80 px-6 flex flex-col gap-2 items-center">
        <div>{ TxtRes.EntryNumber[lang](index + 1) }</div>
        <button 
          className={`cursor-pointer py-1 px-2 rounded-md ${buttonBgColor} text-white`}
          onClick={onClick}>
            { TxtRes.add[lang] }
        </button>
      </div>
    </div>
  )
}