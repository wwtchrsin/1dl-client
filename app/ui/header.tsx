"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { getUrlSegments } from "@/app/lib/miscs"
import { regionBgColors, regionTextColors } from "@/app/lib/regions"
import type { Region } from "@/app/lib/interfaces"

let segmentLabels = [
  (region: string) => region.charAt(0).toUpperCase() + region.slice(1),
  (district: string) => `d${district}`,
  (zone: string) => `z${zone}`,
]

export default function Header() {
  let pathname = usePathname()
  let urlSegments = [ ...getUrlSegments(pathname) ]
  let bgColor = "bg-gray-700"
  let linkTextColor = "text-gray-700"
  if ( urlSegments[0] ) {
    bgColor = regionBgColors[urlSegments[0] as Region][5]
    linkTextColor = regionTextColors[urlSegments[0] as Region][5]
  }

  return (
    <div className={`flex flex-row items-center px-2 py-4 text-2xl ${bgColor}`}>
      {urlSegments.length === 0 && (
        <div className="mx-3 sm:mx-5">
          <Image src="/logo.svg" alt="1DL" width={64} height={64} />
        </div>
      )}
      {urlSegments.length > 0 && (
        <Link className="mx-3 sm:mx-5" href="/">
          <Image src="/logo.svg" alt="1DL" width={64} height={64} />
        </Link>
      )}
      {urlSegments.length > 0 && (
        <div className="flex flex-row gap-1 bg-gray-100/75 rounded-md overflow-hidden">
          {urlSegments.map((segment, index) => {
            let url = "/" + urlSegments.slice(0, index + 1).join("/")
            let segmentLabel = segmentLabels[index](segment)
            if ( index < urlSegments.length - 1 ) {
              return (
                <Link className={`py-2 px-3 sm:px-4 underline decoration-2 bg-white ${linkTextColor}`}
                  href={url} key={index}>
                    { segmentLabel }
                </Link>
              )
            }
            return (
              <div className={`py-2 px-3 sm:px-4 bg-white ${linkTextColor}`} key={index}>
                { segmentLabel }
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}