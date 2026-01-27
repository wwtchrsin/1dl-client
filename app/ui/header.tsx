"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getUrlSegments } from "@/app/lib/miscs"
import { regionBgColors, regionTextColors } from "@/app/lib/regions"
import type { Region } from "@/app/lib/interfaces"

export default function Header() {
  let pathname = usePathname()
  let urlSegments = getUrlSegments(pathname)
  let bgColor = "bg-gray-700"
  let linkBgColor = "bg-gray-200"
  let linkTextColor = "text-gray-700"
  if ( urlSegments[0] ) {
    bgColor = regionBgColors[urlSegments[0] as Region][5]
    linkBgColor = regionBgColors[urlSegments[0] as Region][1]
    linkTextColor = regionTextColors[urlSegments[0] as Region][5]
  }

  return (
    <div className={`flex flex-row gap-2 px-8 py-8 text-2xl ${bgColor}`}>
      <Link className={`p-2 rounded underline decoration-2 ${linkBgColor} ${linkTextColor}`} 
        href="/">
          { process.env.NEXT_PUBLIC_APP_NAME_COMPACT }
      </Link>
      {urlSegments.map((segment, index) => {
        let url = "/" + urlSegments.slice(0, index + 1).join("/")
        return (
          <Link className={`p-2 rounded underline decoration-2 ${linkBgColor} ${linkTextColor}`}
            href={url} key={index}>
              { segment.toUpperCase() }
          </Link>
        )
      })}
    </div>
  )
}