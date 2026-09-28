"use client"

type TextFieldProps = {
  name: string,
  label: string,
  value: string,
  setValue: (value: string) => unknown,
}

export default function TextField (props: TextFieldProps) {
  let { name, label, value, setValue } = props

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