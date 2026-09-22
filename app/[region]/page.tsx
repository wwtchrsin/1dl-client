import { notFound } from "next/navigation"
import { getRegion } from "@/app/lib/location-processors"
import { regionBgColors } from "@/app/lib/regions"
import RegionEntry from "../ui/region-entry"
import logger from "@/app/lib/logger"

export default async function Region({ params }: { params: Promise<{ region: string }> }) {
  logger.info("PAGE /REGION: LOADING")
  let { region } = await params
  let currentRegion = getRegion(region) 
  if ( !currentRegion ) {
    logger.warn("WRONG LOCATION")
    notFound()
  }

  return (
    <div className={`m-1 ${regionBgColors[currentRegion][0]}`}>
      <RegionEntry region={currentRegion} />
    </div>
  )
}