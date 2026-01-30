"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getUrlSegments } from "@/app/lib/miscs"
import { regionBgColors, regionTextColors } from "@/app/lib/regions"
import type { Region } from "@/app/lib/interfaces"

let segmentLabels = [
  () => process.env.NEXT_PUBLIC_APP_NAME_COMPACT,
  (region: string) => region.toUpperCase(),
  (district: string) => `D${district}`,
  (zone: string) => `Z${zone}`,
]

export default function Header() {
  let pathname = usePathname()
  let urlSegments = [ "", ...getUrlSegments(pathname) ]
  let bgColor = "bg-gray-700"
  let linkBgColor = "bg-gray-200"
  let linkTextColor = "text-gray-700"
  if ( urlSegments[1] ) {
    bgColor = regionBgColors[urlSegments[1] as Region][5]
    linkBgColor = regionBgColors[urlSegments[1] as Region][1]
    linkTextColor = regionTextColors[urlSegments[1] as Region][5]
  }

  return (
    <div className={`flex flex-row gap-2 px-8 py-8 text-2xl ${bgColor}`}>
      {urlSegments.map((segment, index) => {
        let url = urlSegments.slice(0, index + 1).join("/") || "/"
        let segmentLabel = segmentLabels[index](segment)
        if ( (index === 0 || index < urlSegments.length - 1) && pathname !== "/" ) {
          return (
            <Link className={`py-2 px-3 sm:px-4 rounded underline decoration-2 ${linkBgColor} ${linkTextColor}`}
              href={url} key={index}>
                { segmentLabel }
            </Link>
          )
        }
        return (
          <div className={`py-2 px-3 sm:px-4 rounded ${linkBgColor} ${linkTextColor}`} key={index}>
            { segmentLabel }
          </div>
        )
      })}
    </div>
  )
}