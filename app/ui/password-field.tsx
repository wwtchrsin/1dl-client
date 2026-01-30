"use client"

import { useState } from "react"
import Image from "next/image"

type PasswordFieldProps = {
  name: string,
  label: string,
}

export default function PasswordField ({ name, label }: PasswordFieldProps) {
  let [ value, setValue ] = useState("")
  let [ hidden, setHidden ] = useState(true)
  let type = hidden ? "password" : "text"
  let icon = hidden ? "visibility" : "visibility-off" 

  return (
    <>
      <label htmlFor={`form-${name}`} className="text-gray-500">
        { label }
      </label>
      <div className="relative">
        <input 
          id={`form-${name}`} name={name} type={type}
          className="block w-full py-2 pl-2 pr-12 rounded-md border border-gray-500 text-xl"
          value={value} onChange={(ev) => setValue(ev.target.value)}
          autoComplete="new-password"
        />
        <div className="absolute h-full w-12 top-0 right-0 flex items-center justify-center">
          <Image 
            src={`/icons/${icon}.svg`} alt="Hide" height={24} width={24}
            className="cursor-pointer" onClick={() => setHidden(!hidden)}
          />
        </div>
      </div>
    </>
  )
}