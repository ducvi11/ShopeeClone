import React, { InputHTMLAttributes, useState } from 'react'
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form'
/* eslint-disable  @typescript-eslint/no-explicit-any */
export type InputNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputNumberProps<TFieldValues, TName>) {
  const {
    type,
    onChange,
    className,
    value = '',
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      //thực thi onChange callback từ bên ngoài truyền vào props
      setLocalValue(valueFromInput)
      //gọi field.onChange để cập nhật vào state react hook form
      field.onChange(event)
      onChange && onChange(event)
      // cập nhật localValue state
    }
  }
  return (
    <div className={className}>
      <input {...rest} {...field} className={classNameInput} value={value || localValue} onChange={handleChange} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2
// type Gen<TFunc> = {
//   getName: TFunc
// }
// function Hexa<TFunc extends () => string, TLastName extends ReturnType<TFunc>>(props: {
//   person: Gen<TFunc>
//   lastName: TLastName
// }) {
//   return null
// }

// const handleName: () => 'duc' = () => 'duc'

// function App() {
//   return <Hexa person={{ getName: handleName }} lastName='duc' />
// }
