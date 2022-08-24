import React, { useEffect, useState, createContext, useContext, useRef } from "react"
import cx from "classnames"
import { defaultSkills } from "@site/src/helpers/data"

function Title({ children, position = 'left' }: { children: string, position?: 'left' | 'right' }): JSX.Element {
  return (
    <div className={cx(
      "font-black py-1 text-xl pl-6",
      "bg-black text-white",
    )}>
      {children}
    </div>
  )
}

function Subtitle({ children }: { children: string }): JSX.Element {
  return (
    <div className="text-center font-black mb-0.5">
      {children}
    </div>
  )
}

function BlockContainer({ children, position = 'left' }: { children: React.ReactNode, position?: 'left' | 'right' }): JSX.Element {
  return (
    <div className="px-6 py-2 w-full flex flex-col print:items-start items-center md:items-start">
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

function Head(): JSX.Element {
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

function Aspects(): JSX.Element {
  return (
    <div>
      <div>
        <Title>形象</Title>
      </div>
      <div className="flex items-center pt-2">
        <BlockContainer>
          <InputWithLabel name="high-concept" id="high-concept">
            高概念
          </InputWithLabel>
          <InputWithLabel name="trouble" id="trouble">
            麻煩
          </InputWithLabel>
          <InputWithLabel name="relationship" id="relationship">
            關係
          </InputWithLabel>
          <InputWithLabel name="other-aspect" id="other-aspect-1">
            其他形象
          </InputWithLabel>
          <InputWithLabel name="other-aspect" id="other-aspect-2">
            其他形象
          </InputWithLabel>
        </BlockContainer>
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
  const [filled, setFilled] = useState<boolean>(false)
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
            : "cursor-pointer hover:bg-slate-500 hover:text-white hover:border-slate-500",
        )}
      >
        {point}
      </div>
    </div>
  )
}

function StressTrack({
  label,
  number = 3,
  max = 6,
}: {
  label: string,
  number?: number,
  max?: number,
}): JSX.Element {
  const [stressBoxes, setStressBoxes] = useState<JSX.Element[]>([])

  useEffect(() => {
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
      <div className="font-extrabold mr-2 text-xl">{label}</div>
      {stressBoxes}
    </div>
  )
}

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
function Consequence({
  degree,
  status = "active"
}: {
  degree: "mild" | "moderate" | "severe" | "extreme"
  status?: "active" | "disabled"
}): JSX.Element {
  return (
    <div className="flex flex-row mb-3 cursor-default">
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

function Vitals(): JSX.Element {
  const { skillsAssign } = useContext(ContextStore)
  return (
    <div>
      <Title>生命力</Title>
      <BlockContainer>
        <div>
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
        <div>
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

function AddStunt({
  onClick,
}: {
  onClick: (e?: React.MouseEvent<HTMLDivElement>) => any,
}): JSX.Element {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer my-4 w-32 rounded-lg hover:bg-slate-500 text-slate-500 py-3 text-lg hover:text-white flex justify-center print:hidden"
      data-bs-toggle="modal" data-bs-target="#newStuntModal"
    >
      新增絕技
    </div>
  )
}
function Stunt({
  index,
}: {
  index: number,
}): JSX.Element {
  const { stunts, setStunts } = useContext(ContextStore)
  // FIXME: Need REALLY update state

  return (
    <div className="my-1 flex justify-between">
      <div className="my-2 text-lg">
        <span
          className="font-extrabold hover:underline hover:text-slate-600"
          contentEditable
          suppressContentEditableWarning
        >{"編輯名稱"}</span>
        ：
        <span
          className="hover:underline hover:text-slate-600 indent-8"
          contentEditable
          suppressContentEditableWarning
        >{"編輯描述。"}</span>
      </div>
    </div>
  )
}
function RegularStunts(): JSX.Element {
  const { refreshMax, stunts, setStunts } = useContext(ContextStore)
  const [stuntComponents, setStuntComponents] = useState<JSX.Element[]>([])

  const addStunt = () => {
    setStuntComponents(cp => {
      const newCp = [...cp]
      
      newCp[currentIndex] =
        <div className="relative">
          <div
            onClick={removeStunt}
            className="absolute -left-8 top-1 w-6 mr-2 cursor-pointer text-center my-2 rounded-2xl hover:bg-slate-500 text-slate-300 hover:text-white print:hidden"
          >
            X
          </div>
          <Stunt
            key={currentIndex}
            index={cp.length}
          />
        </div>
      return newCp
    })
    setCurrentIndex(i => i + 1)
  }

  const removeStunt = () => {
    setStuntComponents(sc => {
      const newSc = [...sc]
      newSc[currentIndex] = null
      return newSc
    })
  }

  return (
    <div className="h-full">
      <Title>一般絕技</Title>
      <BlockContainer>
        {stuntComponents}
        {currentIndex >= refreshMax + 2 ? null : (
          <div className="w-full flex justify-center">
            <AddStunt onClick={addStunt} />
          </div>
        )}
      </BlockContainer>
    </div>
  )
}

function Skill({
  name,
  handleOnInput,
  num,
}: {
  name: string,
  handleOnInput: (n: number) => any,
  num: number,
}): JSX.Element {
  return (
    <div className="flex flex-row h-5 print:my-1 md:my-1 my-2">
      <input
        className={cx(
          "block border-0 py-3 px-1 w-12 mx-1 border-solid border-b-2 md:text-2xl print:text-2xl text-3xl text-center",
          "hover:bg-slate-200",
        )}
        type="number"
        autoComplete="false"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleOnInput(Number(e.target.value))
        }}
        value={num ? String(num) : ''}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          e.stopPropagation()
          e.preventDefault()
          if (e.key === "ArrowDown") {
            handleOnInput(num - 1)
          }
          if (e.key === "ArrowUp") {
            handleOnInput(num + 1)
          }
        }}
      />
      <div className="md:text-xl text-2xl print:text-xl">
        {name}
      </div>
    </div>
  )
}
function Skills(): JSX.Element {
  const { skills, setSkillsAssign, skillsAssign } = useContext(ContextStore)
  return (
    <div className="h-full pb-4">
      <Title>技能</Title>
      <BlockContainer>
        {skills.map((s) => (
          <Skill
            key={s}
            name={s}
            num={skillsAssign[s]}
            handleOnInput={(n) => {
              setSkillsAssign((oldSa) => {
                const newAssign = { ...oldSa }
                newAssign[s] = n
                return newAssign
              })
            }}
          />
        ))}
      </BlockContainer>
    </div>
  )
}

function Refresh(): JSX.Element {
  return (
    <div>

    </div>
  )
}

const ContextStore = createContext<{
  skills: string[],
  setSkills: React.Dispatch<React.SetStateAction<string[]>>,
  skillsAssign: { [key: string]: number },
  setSkillsAssign: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>,
  refresh: number,
  setRefresh: React.Dispatch<React.SetStateAction<number>>,
  refreshMax: number,
  setRefreshMax: React.Dispatch<React.SetStateAction<number>>,
  stunts: { title: string, description: string }[],
  setStunts: React.Dispatch<React.SetStateAction<{ title: string, description: string }[]>>,
}>(null)

export default function MainSheet(): JSX.Element {
  const [skills, setSkills] = useState<string[]>(defaultSkills)
  const [skillsAssign, setSkillsAssign] = useState<{ [key: string]: number }>(() => {
    const obj = {}
    for (const sa of defaultSkills) {
      obj[sa] = 0
    }
    return obj
  })
  const [refresh, setRefresh] = useState<number>(3)
  const [refreshMax, setRefreshMax] = useState<number>(3)
  const [stunts, setStunts] = useState<{ title: string, description: string }[]>([])

  return (
    <ContextStore.Provider value={{
      skills,
      setSkills,
      skillsAssign,
      setSkillsAssign,
      refresh,
      setRefresh,
      refreshMax,
      setRefreshMax,
      stunts,
      setStunts,
    }}>
      <div
        className="mx-auto relative"
        style={{
          maxWidth: "200mm",
        }}
      >
        <div
          className="absolute text-slate-200 w-fit print:hidden"
          style={{
            top: "275mm",
            left: "176mm",
            zIndex: -10,
          }}
        >
          列印範圍↘
        </div>
        <div
          className="absolute border-l-0 border-t-0 border-solid border-slate-200"
          style={{
            width: "200mm",
            height: "284mm",
            top: 0,
            left: 0,
            zIndex: -10,
          }}
        />

        <div id="main-character-sheet">
          <Head />
          <div
            className={cx(
              "w-full flex flex-col pt-2",
              "print:grid print:grid-cols-12",
              "md:grid md:grid-cols-12 ",
            )}
            style={{
              minHeight: "101mm",
            }}
          >
            <div className={cx(
              "col-span-7 border-0",
              "md:border-solid md:border-r-2",
            )}>
              <Aspects />
            </div>
            <div className="col-span-5">
              <Vitals />
            </div>
          </div>
          <div
            className={cx(
              "w-full flex",
              "flex-col-reverse",
              "print:grid print:grid-cols-12",
              "md:grid md:grid-cols-12 md:flex-col",
            )}
            style={{
              minHeight: "167mm",
            }}
          >
            <div className={cx(
              "col-span-7 border-0 h-full",
              "md:border-solid md:border-r-2",
            )}>
              <RegularStunts />
              <Refresh />
            </div>
            <div className="col-span-5 h-full">
              <Skills />
            </div>
          </div>
        </div>
      </div>
    </ContextStore.Provider>
  )
}