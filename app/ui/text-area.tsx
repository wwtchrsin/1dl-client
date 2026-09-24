"use client"

import { useState } from "react"

type TextAreaProps = {
  name: string,
  label: string,
  limits?: {
    min: number,
    max: number,
  },
}

export default function TextArea({ name, label, limits }: TextAreaProps) {
  let [ value, setValue ] = useState("")

  return (
    <>
      {label && !limits && (
        <label htmlFor={`form-${name}`}>
          { label }
        </label>
      )}
      {label && limits && (
        <label className="flex flex-row gap-2 items-center" 
          htmlFor={`form-${name}`}>
            <div>{ label }</div>
            <div>{ `( ${limits.min} ≤ ${value.length} ≤ ${limits.max} )` }</div>
        </label>
      )}
      <textarea 
        id={`form-${name}`} name={name}
        className="block resize-none w-full p-2 rounded-md border border-gray-200 text-base bg-white text-black"
        rows={4} value={value} onChange={(ev) => setValue(ev.target.value)} 
      />
    </>
  )
}