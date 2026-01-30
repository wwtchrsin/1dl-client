import Link from "next/link"
import { regionLang, regionBgColors, regionTextColors } from "../lib/regions"
import type { Region } from "@/app/lib/interfaces"

let TxtRes = {
  Zone: {
    en: "Zone",
    ru: "Зона",
  },
  Messages: {
    en: "Messages",
    ru: "Сообщения",
  }
}

type ZonesProps = {
  region: Region,
  district: number,
  msgcounts: string[],
}

export default function Zones({ region, district, msgcounts }: ZonesProps) {
  let lang = regionLang[region]
  let bgColor = regionBgColors[region][0]
  let textColor = regionTextColors[region][8]

  return (
    <div className="p-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 bg-white">
      {msgcounts.map((msgcount, index) => {
        return (
          <div className={`px-1 py-16 flex flex-col gap-2 items-center text-black ${bgColor}`}
            key={index}>
              <Link href={`/${region}/${district}/${index}`} 
                className="underline decoration-2">
                  { `${TxtRes.Zone[lang]} #${index}` }
              </Link>
              <div className={textColor}>
                { `${TxtRes.Messages[lang]}: ${msgcount}` }
              </div>
          </div>
        )
      })}
    </div>
  )
}