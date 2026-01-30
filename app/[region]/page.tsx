import { notFound } from "next/navigation"
import { getRegion } from "@/app/lib/location-processors"
import { getDistricts } from "@/app/lib/requests"
import { processMsgcounts } from "@/app/lib/response-processors"
import limits from "@/app/lib/server-limits"
import Districts from "@/app/ui/districts"

export default async function Region({ params }: { params: Promise<{ region: string }> }) {
  let { region } = await params
  let correctRegion = getRegion(region) 
  if ( !correctRegion ) {
    notFound()
  }
  let districts = await getDistricts(correctRegion)
  let minIndex = limits.message.district.min
  let maxIndex = limits.message.district.max
  let msgcounts = processMsgcounts(districts.data, minIndex, maxIndex)

  return (
    <Districts region={correctRegion} msgcounts={msgcounts} />
  )
}