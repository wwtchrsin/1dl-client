"use client"

import Image from "next/image"
import { useState } from "react"
import { messageColors, getMessageColor, messageColorNames } 
  from "@/app/lib/message-colors"
import type { Lang } from "@/app/lib/interfaces"

let colors = Array.from(messageColors.entries())

export default function ColorSelector({ lang, label }: { lang: Lang, label: string }) {
  let [ color, setColor ] = useState("")
  let [ expanded, setExpanded ] = useState(false)
  let selColorValue = getMessageColor(color)
  let selColorName = messageColorNames.get(color)
  let iconType = expanded ? "arrow-up" : "arrow-down"
  let headerBorder = expanded ? "rounded-b-md" : "rounded-md"
  
  return (
    <div className="relative">
      {label && (
        <div>{ label }</div>
      )}
      <div className={`p-2 flex flex-row gap-2 items-center ${headerBorder} border border-gray-500 bg-white text-black`}>
        {!selColorName && (
          <>
            <div className={`shrink-0 w-4 h-4 ${selColorValue}`}></div>
            <div className="grow font-bold">...</div>
          </>
        )}
        {selColorName && (
          <>
            <div className={`shrink-0 w-4 h-4 ${selColorValue}`}></div>
            <div className="grow font-bold">
              { selColorName[lang] }
            </div>
          </>
        )}
        <Image
          src={`/icons/color-selector-${iconType}.svg`} alt={iconType}
          width={24} height={24} className="shrink-0 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        />
      </div>
      {expanded && (
        <div className="absolute z-10 p-2 w-full bottom-10 rounded-t-md border border-b-0 border-gray-500 bg-gray-50 text-black">
          {colors.map(([tag, bgColor]) => {
            return (
              <div className="flex gap-2 items-center" key={tag}>
                <div className={`shrink-0 w-4 h-4 ${bgColor}`}></div>
                <div 
                  className="grow cursor-pointer font-bold hover:text-gray-700" 
                  onClick={() => {setColor(tag); setExpanded(false)}}>
                    { messageColorNames.get(tag)![lang] }
                </div>
              </div>
            )
          })}
        </div>
      )}
      <input type="hidden" name="color" value={color} />
    </div>
  )
}