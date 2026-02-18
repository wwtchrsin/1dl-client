import { regions, regionBgColors } from "@/app/lib/regions"
import Region from "@/app/ui/region-card"
import logger from "@/app/lib/logger"

export default function Home() {
  logger.info("HOME PAGE: LOADING")

  return (
    <div className="mb-32">
      {regions.map((region) => {
        return (
          <div className={`m-1 ${regionBgColors[region][0]}`} key={region}>
            <Region region={region} />
          </div>
        )
      })}
    </div>
  )
}
