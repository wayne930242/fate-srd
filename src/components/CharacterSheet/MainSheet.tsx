import React from "react"
import cx from "classnames"

function Title({ children, position = 'left' }: { children: string, position?: 'left' | 'right' }): JSX.Element {
  return (
    <div className="font-extrabold py-1 text-xl pl-8">
      {children}
    </div>
  )

}

function InputWithLabel({
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
    <div className="flex flex-col">
      <div className="font-extrabold text-sm">
        {children}
      </div>
      <input
        className="text-xl block w-52 hover:bg-slate-300 border-slate-300 border-0 border-b-2"
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

function Head(): JSX.Element {
  return (
    <div className={cx(
      "flex py-4",
      "flex-row justify-between items-end flex-wrap",
    )}>
      <div>
        <img src={require("@site/static/img/fate-logo.png").default} width={163} height={75} />
      </div>
      <InputWithLabel name="name" id="name">
        姓名
      </InputWithLabel>
    </div>
  )
}

function Aspects(): JSX.Element {
  return (
    <div>
      <Title>形象</Title>
      <div>

      </div>
    </div>
  )
}

function Vitals(): JSX.Element {
  return (
    <div>
      <Title>生命力</Title>

    </div>
  )
}

function RegularStunts(): JSX.Element {
  return (
    <div>
      <Title>一般絕技</Title>

    </div>
  )
}

function Skills(): JSX.Element {
  return (
    <div>
      <Title>技能</Title>

    </div>
  )
}

function Refresh(): JSX.Element {
  return (
    <div>

    </div>
  )
}

export default function MainSheet(): JSX.Element {
  return (
    <div className="bg-white w-full">
      <Head />
      <div className="w-full grid grid-cols-12">
        <div className="col-span-7">
          <Aspects />
        </div>
        <div className="col-span-5">
          <Vitals />
        </div>
      </div>
      <div className="w-full grid grid-cols-12">
        <div className="col-span-7">
          <RegularStunts />
          <Refresh />
        </div>
        <div className="col-span-5">
          <Skills />
        </div>
      </div>
    </div>
  )
}