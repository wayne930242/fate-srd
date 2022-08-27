import React from 'react'
import cx from 'classnames'
import { Title, BlockContainer, Subtitle } from './Share'
import { ContextStore } from './MainSheet'

const degreeMap = {
  "mild": 2,
  "moderate": 4,
  "severe": 6,
  "extreme": 8,
}
const degreeNampMap = {
  "mild": "輕微",
  "moderate": "中度",
  "severe": "嚴重",
  "extreme": "極端",
}
export function Consequence({
  degree,
  status = "active"
}: {
  degree: "mild" | "moderate" | "severe" | "extreme"
  status?: "active" | "disabled"
}): JSX.Element {
  return (
    <div className="flex flex-row mb-3 print:mb-2 cursor-default">
      <div className="mr-2">
        <div
          className={cx(
            "border-solid border-2 px-1.5 text-center text-sm",
            status === "disabled" ? "border-slate-400 text-slate-400" : "",
          )}
        >
          {degreeMap[degree]}
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className={cx(
          "font-bold text-sm shrink-0",
          status === "disabled" ? "text-slate-400 print:text-white" : "",
        )}>
          {degreeNampMap[degree]}
        </div>
        <input
          className={cx(
            "ml-1 text-2xl block border-0 py-0.5 px-2 w-full",
            status === 'disabled' ? "" : "hover:bg-slate-200",
          )}
          type="text"
          autoComplete="false"
          disabled={status === 'disabled'}
        />
      </div>
    </div>
  )
}

function StressBox({
  point = 1,
  status = "active",
}: {
  point?: number,
  status?: "active" | "disabled"
}): JSX.Element {
  const [filled, setFilled] = React.useState<boolean>(false)
  return (
    <div
      className={cx(
        "px-1"
      )}
      onClick={() => {
        if (status !== "disabled") {
          setFilled((b) => !b)
        }
      }}
    >
      <div
        className={cx(
          "border-solid border-2 text-center",
          "px-2 text-2l",
          "md:px-1.5 md:text-sm",
          "print:px-1.5 print:text-sm",
          filled ? "bg-slate-800 text-white border-slate-800" : "",
          status === "disabled"
            ? "border-slate-400 text-slate-400 cursor-default"
            : "cursor-pointer",
        )}
      >
        {point}
      </div>
    </div>
  )
}

export function StressTrack({
  label,
  number = 3,
  max = 6,
}: {
  label: string,
  number?: number,
  max?: number,
}): JSX.Element {
  const [stressBoxes, setStressBoxes] = React.useState<JSX.Element[]>([])

  React.useEffect(() => {
    setStressBoxes(() => {
      const newBoxes = []
      for (var i = 0; i < max; i++) {
        if (i < number) {
          newBoxes.push(
            <StressBox key={`stress-box-${i}`} status="active" />
          )
        } else {
          newBoxes.push(
            <StressBox key={`stress-box-${i}`} status="disabled" />
          )
        }
      }
      return newBoxes
    })
  }, [number, max])

  return (
    <div className="flex flex-row w-full mx-auto mb-2 justify-center md:justify-start">
      <div className="font-extrabold mr-2 text-lg md:text-xl">{label}</div>
      {stressBoxes}
    </div>
  )
}

export function Vitals(): JSX.Element {
  const { skillsAssign } = React.useContext(ContextStore)
  return (
    <div>
      <Title>生命力</Title>
      <BlockContainer>
        <div className='w-full'>
          <Subtitle>
            壓力
          </Subtitle>
          <div>
            <StressTrack label="物理" number={
              skillsAssign["體魄"] === 0 ? 3
                : skillsAssign["體魄"] < 3 ? 4
                  : 6
            } />
            <StressTrack label="心靈" number={
              skillsAssign["意志"] === 0 ? 3
                : skillsAssign["意志"] < 3 ? 4
                  : 6
            } />
          </div>
        </div>
        <div className='w-full'>
          <Subtitle>
            後果
          </Subtitle>
          <div>
            <Consequence degree="mild" />
            <Consequence degree="moderate" />
            <Consequence degree="severe" />
            <Consequence
              degree="mild"
              status={
                skillsAssign["體魄"] < 5 && skillsAssign["意志"] < 5 ? "disabled" : "active"
              }
            />
          </div>
        </div>
      </BlockContainer>
    </div>
  )
}