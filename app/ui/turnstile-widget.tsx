"use client"

import { useEffect } from "react"
import type { Lang } from "@/app/lib/interfaces"


type TurnstileWidgetProps = {
  lang: Lang,
  id: string,
  className?: string,
  hidden?: boolean,
}

export default function TurnstileWidget({ lang, id, className, hidden }: TurnstileWidgetProps) {
  let publicKey = process.env.NEXT_PUBLIC_TURNSTILE_KEY
  let containerId = `turnstile-widget-${id}`
  let cssClasses = "overflow-hidden opacity-75" +
    (hidden ? " min-h-6 max-h-15" : " h-15 bg-white/50") +
    (className ? ` ${className}` : "")

  useEffect(() => {
    let widgetId: any

    if ( typeof window !== "undefined" && (window as any).turnstile ) {
      widgetId = (window as any).turnstile.render(`#${containerId}`, {
        sitekey: publicKey,
        theme: "light",
        size: "flexible",
        appearance: hidden ? "interaction-only" : "always",
        language: lang,
      })
    }

    return () => {
      if ( typeof window !== "undefined" && (window as any).turnstile && widgetId ) {
        (window as any).turnstile.remove(widgetId)
      }
    }
  }, [])

  return (
    <div className={cssClasses}>
      <div id={containerId}
        className="-mt-1 -ml-1"
        style={{ width: "calc(100% + 8px)" }}>
      </div>
    </div>
  )
}