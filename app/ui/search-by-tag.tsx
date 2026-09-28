"use client"

import Link from "next/link"
import { useState } from "react"
import { regionBgColors, regionTextColors, regionOutlineColors } from "@/app/lib/regions"
import type { Region } from "@/app/lib/interfaces"

let TxtRes = {
  find: {
    en: "find",
    ru: "найти",
  },
}

export default function SearchByTag({ region }: { region: Region }) {
  let [ tag, setTag ] = useState("")

  let buttonBg = regionBgColors[region][4]
  let textColor = regionTextColors[region][6]
  let outlineColor = regionOutlineColors[region][4]

  return (
    <div className="flex flex-row items-stretch justify-center py-8">
      <input 
        type="text" className={
          `block w-38 py-2 pl-2 pr-2 rounded-l-md border ` + 
          `border-gray-500 text-2xl bg-white/75 ${textColor} ` + 
          `text-center outline-none focus:ring-2 focus:ring-inset ` + 
          `focus:${outlineColor}`
        }
        value={tag} onChange={(ev) => setTag(ev.target.value)}
      />
      <Link href={`/${region}/${tag}`} 
        className={`flex flex-row items-center -ml-1 px-4 py-2 rounded-r-md ${buttonBg} text-white`}>
          <span>{TxtRes.find[region]}</span>
      </Link>
    </div>
  )
}