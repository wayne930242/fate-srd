import React from "react"
import cx from "classnames"

export function Title({ children, position = 'left' }: { children: React.ReactNode, position?: 'left' | 'right' }): JSX.Element {
  return (
    <div className={cx(
      "font-black py-1 text-xl pl-6",
      "bg-black text-white",
    )}>
      {children}
    </div>
  )
}

export function Subtitle({ children }: { children: string }): JSX.Element {
  return (
    <div className="text-center font-black mb-0.5">
      {children}
    </div>
  )
}

export function BlockContainer({ children, position = 'left' }: { children: React.ReactNode, position?: 'left' | 'right' }): JSX.Element {
  return (
    <div className="px-6 print:py-0 py-1 w-full flex flex-col print:items-start items-center md:items-start">
      {children}
    </div>
  )
}

export function InputWithLabel({
  children,
  name,
  id,
  handleOnInput,
  value,
}: {
  children: string,
  name: string,
  id: string,
  handleOnInput?: (e: React.KeyboardEvent<HTMLInputElement>) => any,
  value?: string,
}): JSX.Element {
  return (
    <div className="flex flex-col w-full">
      <div className="font-extrabold text-sm px-2">
        {children}
      </div>
      <input
        className="text-2xl block w-full hover:bg-slate-200 border-0 py-1 px-2"
        type="text"
        autoComplete="false"
        id={id}
        name={name}
        onInput={handleOnInput ?? function () { }}
        value={value}
      />
    </div>
  )
}
