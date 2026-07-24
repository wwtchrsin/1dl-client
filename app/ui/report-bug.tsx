"use client"

import type { Lang } from "@/app/lib/interfaces"

let TxtRes = {
  ReportABug: {
    en: "Report a bug",
    ru: "Сообщить об ошибке",
  },
}

export default function ReportBug({ lang }: { lang: Lang }) {
  return (<>
    <div className="flex flex-col mt-2 h-12">
      <div>
        <button className="underline decoration-2 font-bold">
            {TxtRes.ReportABug[lang]}
        </button>
         {": "}
      </div>
      <a href="mailto:wwtchrsin@proton.me">wwtchursin@proton.me</a>
    </div>
  </>)
}