import React from "react"
import cx from "classnames"
import { InputWithLabel } from './Share'

export function Head(): JSX.Element {
  return (
    <div className={cx(
      "flex w-full",
      "flex-col-reverse item-center",
      "md:flex-row md:justify-between md:items-end md:flex-wrap",
      "print:flex-row print:justify-between print:items-end print:flex-wrap",
    )}>
      <div className="px-4 flex items-end">
        <InputWithLabel name="chracter" id="chracter">
          姓名
        </InputWithLabel>
      </div>
      <div className="flex justify-center items-end md:pr-8">
        <img src={require("@site/static/img/fate-logo.png").default} width={130} height={60} />
      </div>
    </div>
  )
}
