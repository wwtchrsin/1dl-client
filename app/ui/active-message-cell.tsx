import { regionBgColors, regionLang } from "../lib/regions"
import * as I from "@/app/lib/interfaces"

let TxtRes = {
  AddingEntry: {
    en: (index: number) => `Adding Entry #${index}...`,
    ru: (index: number) => `Добавление Записи №${index}....`,
  },
  cancel: {
    en: "cancel",
    ru: "отмена",
  },
}

type ActiveMessageCellProps = {
  onClick?: () => void,
  index: number,
  region: I.Region, 
}

export default function ActiveMessageCell({ region, index, onClick }: ActiveMessageCellProps) {
  let lang = regionLang[region]
  let buttonBgColor = onClick ? regionBgColors[region][3] : regionBgColors[region][2]
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="max-w-80 px-6 flex flex-col gap-2 items-center">
        <button 
          className={`cursor-pointer py-1 px-2 rounded-md ${buttonBgColor} text-white`}
          onClick={onClick}>
            { TxtRes.cancel[lang] }
        </button>
      </div>
    </div>
  )
}