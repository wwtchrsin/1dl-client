"use client"

import { txtRes } from "@/app/lib/text-resources"
import type { Lang } from "@/app/lib/interfaces"

export default function ReportBug({ lang }: { lang: Lang }) {
  return (<>
    <div className="flex flex-col mt-2 h-12">
      <div>
        <button className="underline decoration-2 font-bold">
            {txtRes.ReportBug[lang]}
        </button>
         {": "}
      </div>
      <a href="mailto:wwtchrsin@proton.me">wwtchursin@proton.me</a>
    </div>
  </>)
}