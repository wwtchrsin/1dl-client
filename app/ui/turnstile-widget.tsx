"use client"

import { useState, useEffect, useRef } from "react"
import type { Lang } from "@/app/lib/interfaces"

type TurnstileWidgetProps = {
  lang: Lang,
  id: string,
  hidden?: boolean,
  style?: string,
  styleHidden?: string,
  styleVisible?: string,
  timestamp: number,
}

const publicKey = process.env.NEXT_PUBLIC_TURNSTILE_KEY

export default function TurnstileWidget(props: TurnstileWidgetProps) {
  let { lang, id, hidden, style, styleVisible, styleHidden, timestamp } = props
  let [ interactive, setInteractive ] = useState(false)
  let [ widgetId, setWidgetId ] = useState<any>(undefined)
  let containerRef = useRef<HTMLDivElement | null>(null)

  let containerId = `turnstile-widget-${id}`
  let cssClasses = "overflow-hidden opacity-75" +
    (hidden && !interactive ? " h-0" : " h-15 bg-white/50") +
    (hidden && !interactive && styleHidden ? ` ${styleHidden}`: "") +
    ((!hidden || interactive) && styleVisible ? ` ${styleVisible}` : "") +
    (style ? ` ${style}` : "")

  useEffect(() => {
    if ( typeof window !== "undefined" && (window as any).turnstile ) {
      widgetId && (window as any).turnstile.remove(widgetId)
      containerRef.current && (containerRef.current.innerHTML = "")
      setWidgetId((window as any).turnstile.render(`#${containerId}`, {
        sitekey: publicKey,
        theme: "light",
        size: "flexible",
        appearance: hidden ? "interaction-only" : "always",
        language: lang,
        "error-callback": (err: any) => {
          console.error(err)
        },
        "before-interactive-callback": hidden ?
          () => setInteractive(true) :
          () => {},
      }))
    }

    return () => {
      if ( typeof window !== "undefined" && (window as any).turnstile && widgetId ) {
        (window as any).turnstile.remove(widgetId)
      }
    }
  }, [timestamp])

  return (
    <div className={cssClasses}>
      <div ref={containerRef} id={containerId}
        className="-mt-1 -ml-1"
        style={{ width: "calc(100% + 8px)" }}>
      </div>
    </div>
  )
}