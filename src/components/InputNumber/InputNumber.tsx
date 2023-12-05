import React, { InputHTMLAttributes, forwardRef, useState } from 'react'
/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  function InputNumberInner(
    {
      className,
      errorMessage,
      onChange,
      value = '',
      classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
      classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
      ...rest
    },
    ref
  ) {
    const [localValue, setLocalValue] = useState<string>(value as string)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if (/^\d+$/.test(value) || value === '') {
        //thực thi onChange callback từ bên ngoài truyền vào props
        onChange && onChange(event)
        // cập nhật localValue state
        setLocalValue(value)
      }
    }
    return (
      <div className={className}>
        <input
          {...rest}
          className={classNameInput}
          value={value || localValue}
          onChange={handleChange}
          ref={ref}
        />
        <div className={classNameError}>{errorMessage}</div>
      </div>
    )
  }
)

export default InputNumber
