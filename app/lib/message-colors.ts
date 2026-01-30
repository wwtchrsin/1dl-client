import type { TextResource } from "@/app/lib/interfaces"

export const messageColors = new Map<string, string>([
  ["black", "bg-gray-700"],
  ["red", "bg-red-600"],
  ["orange", "bg-orange-500"],
  ["yellow", "bg-yellow-500"],
  ["green", "bg-green-600"],
  ["cyan", "bg-cyan-600"],
  ["blue", "bg-blue-600"],
  ["purple", "bg-purple-600"],
  ["pink", "bg-pink-600"],
])

export const messageColorNames = new Map<string, TextResource>([
  ["black", {
    en: "black",
    ru: "черный",
  }],
  ["red", {
    en: "red",
    ru: "красный",
  }],
  ["orange", {
    en: "orange",
    ru: "оранжевый",
  }],
  ["yellow", {
    en: "yellow",
    ru: "желтый",
  }],
  ["green", {
    en: "green",
    ru: "зеленый",
  }],
  ["cyan", {
    en: "cyan",
    ru: "голубой",
  }],
  ["blue", {
    en: "blue",
    ru: "синий",
  }],
  ["purple", {
    en: "purple",
    ru: "фиолетовый",
  }],
  ["pink", {
    en: "pink",
    ru: "розовый",
  }],
])

export const getMessageColor = (tag: string): string => {
  return messageColors.get(tag) ?? "bg-gray-500"
}
