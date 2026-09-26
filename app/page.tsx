import Link from "next/link"
import Image from "next/image"
import { regions, regionBgColors } from "@/app/lib/regions"
import logger from "@/app/lib/logger"

export default function Home() {
  logger.info("HOME PAGE: LOADING")

  return (
    <div className="mb-32">
      {regions.map((region) => {
        return (
          <div className={`w-full h-40 flex flex-row gap-2 items-center justify-center ${regionBgColors[region][0]}`} key={region}>
            <Image
              src={`/icons/region-globe.svg`} alt="globe"
              width={36} height={36}
            />
            <Link href={`/${region}`}>
              <span className="font-bold text-2xl">
                {`${region.toUpperCase()}`}
              </span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
