import { notFound } from "next/navigation"
import { getDistricts } from "@/app/lib/requests"
import { regions } from "@/app/lib/regions"
import { processMsgcounts } from "@/app/lib/miscs"
import limits from "@/app/lib/server-limits"
import Districts from "@/app/ui/districts"
import type { Region } from "@/app/lib/interfaces"

export default async function Region({ params }: { params: Promise<{ region: string }> }) {
  let { region } = await params
  if ( !(regions as any[]).includes(region) ) {
    notFound()
  }
  let districts = await getDistricts(region as Region)
  let minIndex = limits.message.district.min
  let maxIndex = limits.message.district.max
  let msgcounts = processMsgcounts(districts.data, minIndex, maxIndex)

  return (
    <Districts region={region as Region} msgcounts={msgcounts} />
  )
}