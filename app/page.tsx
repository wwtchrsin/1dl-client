import { regions } from "@/app/lib/regions"
import Region from "@/app/ui/region-card"

export default function Home() {
  let regionColors = {
    "en": "bg-sky-100",
    "ru": "bg-blue-100",
  }
  return regions.map((region) => {
    return (
      <div className={`m-1 ${regionColors[region]}`} key={region}>
        <Region region={region} />
      </div>
    )
  })
}
