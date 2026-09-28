import type { Region, Lang } from "@/app/lib/interfaces"

export const regionLang: Record<Region, Lang> = {
  "en": "en",
  "ru": "ru",
}

export const regionBgColors = {
  "en": [
    "bg-sky-100",
    "bg-sky-200",
    "bg-sky-300",
    "bg-sky-400",
    "bg-sky-500",
    "bg-sky-600",
    "bg-sky-700",
    "bg-sky-800",
    "bg-sky-900",
  ],
  "ru": [
    "bg-blue-100",
    "bg-blue-200",
    "bg-blue-300",
    "bg-blue-400",
    "bg-blue-500",
    "bg-blue-600",
    "bg-blue-700",
    "bg-blue-800",
    "bg-blue-900",
  ],
}

export const regionTextColors = {
  "en": [
    "text-sky-100",
    "text-sky-200",
    "text-sky-300",
    "text-sky-400",
    "text-sky-500",
    "text-sky-600",
    "text-sky-700",
    "text-sky-800",
    "text-sky-900",
  ],
  "ru": [
    "text-blue-100",
    "text-blue-200",
    "text-blue-300",
    "text-blue-400",
    "text-blue-500",
    "text-blue-600",
    "text-blue-700",
    "text-blue-800",
    "text-blue-900",
  ],
}

export const regionOutlineColors = {
  "en": [
    "ring-sky-100",
    "ring-sky-200",
    "ring-sky-300",
    "ring-sky-400",
    "ring-sky-500",
    "ring-sky-600",
    "ring-sky-700",
    "ring-sky-800",
    "ring-sky-900",
  ],
  "ru": [
    "ring-blue-100",
    "ring-blue-200",
    "ring-blue-300",
    "ring-blue-400",
    "ring-blue-500",
    "ring-blue-600",
    "ring-blue-700",
    "ring-blue-800",
    "ring-blue-900",
  ],
}

export const regions: Region[] = ["en", "ru"]

export const langs: Lang[] = ["en", "ru"]