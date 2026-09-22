import Link from "next/link"
import { regions, regionBgColors } from "@/app/lib/regions"
import logger from "@/app/lib/logger"

export default function Home() {
  logger.info("HOME PAGE: LOADING")

  return (
    <div className="mb-32">
      {regions.map((region) => {
        return (
          <div className={`py-8 text-center font-bold ${regionBgColors[region][0]}`} key={region}>
            <Link href={`/${region}`}>
              {`${region.toUpperCase()}`}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
