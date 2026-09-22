"use client"

import Link from "next/link"
import { useState } from "react"
import { regionBgColors } from "@/app/lib/regions"
import type { Region } from "@/app/lib/interfaces"

let TxtRes = {
  find: {
    en: "find",
    ru: "найти",
  },
}

export default function NoteSearch({ region }: { region: Region }) {
  let [ tag, setTag ] = useState("")

  let buttonBg = regionBgColors[region][4]

  return (
    <div className="flex flex-row gap-2 items-stretch justify-center py-8">
      <input 
        type="text" className="block w-35 py-2 pl-2 pr-2 rounded-md border border-gray-500 text-xl"
        value={tag} onChange={(ev) => setTag(ev.target.value)}
      />
      <Link href={`/${region}/${tag}`} 
        className={`flex flex-row items-center px-4 py-2 rounded-md ${buttonBg} text-white`}>
          <span>{TxtRes.find[region]}</span>
      </Link>
    </div>
  )
}