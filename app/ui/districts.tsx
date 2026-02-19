"use client"

import Link from "next/link"
import { regionLang, regionBgColors, regionTextColors } from "../lib/regions"
import { useWebSocket } from "@/app/providers/websocket"
import limits from "@/app/lib/server-limits"
import type { Region } from "@/app/lib/interfaces"

let TxtRes = {
  District: {
    en: "District",
    ru: "Район",
  },
  ObjectsAvailable: {
    en: "Objects Available",
    ru: "Доступные Объекты",
  },
}

type DistrictsProps = {
  region: Region,
  msgcounts: number[],
}

export default function Districts({ region, msgcounts }: DistrictsProps) {
  let { distCountChange } = useWebSocket()
  let lang = regionLang[region]
  let bgColor = regionBgColors[region][0]
  let textColor = regionTextColors[region][8]
  
  let districtNumber = limits.message.district.max - limits.message.district.min + 1
  let zoneNumber = limits.message.zone.max - limits.message.zone.min + 1
  let objectMaxNumber = districtNumber * zoneNumber

  return (
    <div className="p-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 bg-white">
      {msgcounts.map((count, index) => {
        let msgcount = count + (distCountChange.get(index) ?? 0)
        let objectsAvailable = objectMaxNumber - msgcount
        return (
          <div className={`px-1 py-16 flex flex-col gap-2 items-center text-black ${bgColor}`}
            key={index}>
              <Link href={`/${region}/${index}`} className="underline decoration-2">
                { `${TxtRes.District[lang]} #${index}` }
              </Link>
              <div className={textColor}>
                { `${TxtRes.ObjectsAvailable[lang]}: ${objectsAvailable}` }
              </div>
          </div>
        )
      })}
    </div>
  )
}