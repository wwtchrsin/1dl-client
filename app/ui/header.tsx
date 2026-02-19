"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { getUrlSegments } from "@/app/lib/miscs"
import { regionBgColors, regionTextColors } from "@/app/lib/regions"
import type { Region } from "@/app/lib/interfaces"

let segmentLabels = [
  (region: string) => region.toUpperCase(),
  (district: string) => `D${district}`,
  (zone: string) => `Z${zone}`,
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
    <div className={`flex flex-row items-center gap-2 px-6 sm:px-8 py-4 text-2xl ${bgColor}`}>
      {urlSegments.length === 0 && (
        <div className="mr-3 sm:mr-5">
          <Image src="/logo.svg" alt="1DL" width={64} height={64} />
        </div>
      )}
      {urlSegments.length > 0 && (
        <Link className="mr-3 sm:mr-5" href="/">
          <Image src="/logo.svg" alt="1DL" width={64} height={64} />
        </Link>
      )}
      {urlSegments.length > 0 && urlSegments.map((segment, index) => {
        let url = "/" + urlSegments.slice(0, index + 1).join("/")
        let segmentLabel = segmentLabels[index](segment)
        if ( index < urlSegments.length - 1 ) {
          return (
            <Link className={`py-2 px-3 sm:px-4 rounded-md underline decoration-2 bg-white ${linkTextColor}`}
              href={url} key={index}>
                { segmentLabel }
            </Link>
          )
        }
        return (
          <div className={`py-2 px-3 sm:px-4 rounded-md bg-white ${linkTextColor}`} key={index}>
            { segmentLabel }
          </div>
        )
      })}
    </div>
  )
}