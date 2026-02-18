import { notFound } from "next/navigation"
import { getRegion } from "@/app/lib/location-processors"
import { getDistricts } from "@/app/lib/requests"
import { processDistrictMsgcounts } from "@/app/lib/response-processors"
import Districts from "@/app/ui/districts"
import logger from "@/app/lib/logger"

export default async function Region({ params }: { params: Promise<{ region: string }> }) {
  logger.info("PAGE /REGION: LOADING")
  let { region } = await params
  let correctRegion = getRegion(region) 
  if ( !correctRegion ) {
    logger.warn("WRONG LOCATION")
    notFound()
  }
  let districts = await getDistricts(correctRegion)
  let msgcounts = processDistrictMsgcounts(districts.data)
  
  return (
    <Districts region={correctRegion} msgcounts={msgcounts} />
  )
}