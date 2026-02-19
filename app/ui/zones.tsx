"use client"

import Link from "next/link"
import { regionLang, regionBgColors, regionTextColors } from "../lib/regions"
import { useWebSocket } from "@/app/providers/websocket"
import limits from "@/app/lib/server-limits"
import type { Region } from "@/app/lib/interfaces"

let TxtRes = {
  Zone: {
    en: "Zone",
    ru: "Зона",
  },
  ObjectsAvailable: {
    en: "Objects Available",
    ru: "Доступные Объекты",
  },
}

type ZonesProps = {
  region: Region,
  district: number,
  msgcounts: number[],
}

export default function Zones({ region, district, msgcounts }: ZonesProps) {
  let { zoneCountChange } = useWebSocket()
  let lang = regionLang[region]
  let bgColor = regionBgColors[region][0]
  let textColor = regionTextColors[region][8]

  let objectMaxNumber = limits.message.zone.max - limits.message.zone.min + 1

  return (
    <div className="p-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 bg-white">
      {msgcounts.map((count, index) => {
        let msgcount = count + (zoneCountChange.get(index) ?? 0)
        return (
          <div className={`px-1 py-16 flex flex-col gap-2 items-center text-black ${bgColor}`}
            key={index}>
              <Link href={`/${region}/${district}/${index}`} 
                className="underline decoration-2">
                  { `${TxtRes.Zone[lang]} #${index}` }
              </Link>
              <div className={textColor}>
                { `${TxtRes.ObjectsAvailable[lang]}: ${objectMaxNumber}` }
              </div>
          </div>
        )
      })}
    </div>
  )
}