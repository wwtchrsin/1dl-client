"use client"

import { useState } from "react"

type TextFieldProps = {
  name: string,
  label: string
}

export default function TextField ({ name, label }: TextFieldProps) {
  let [ value, setValue ] = useState("")

  return (
    <>
      <label htmlFor={`form-${name}`} className="text-gray-500">
        { label }
      </label>
      <input 
        id={`form-${name}`} name={name} type="text"
        className="block w-full p-2 rounded-md border border-gray-500 text-xl"
        value={value} onChange={(ev) => setValue(ev.target.value)}
      />
    </>
  )
}