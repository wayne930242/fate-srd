import React from 'react'
import cx from 'classnames'
import { Title, BlockContainer } from './Share'
import { ContextStore } from './MainSheet'

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
    <div className="flex flex-row h-8 md:h-6 print:mt-1 print:mb-1.5 md:my-1 my-1 print:h-4 mr-6 md:mx-0">
      <input
        className={cx(
          "block border-0 py-4 md:py-2 print:py-2 px-1 w-12 mx-1 border-solid border-b-2 md:text-2xl print:text-2xl text-xl text-center",
          "hover:bg-slate-200",
        )}
        type="text"
        autoComplete="false"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleOnInput(Number(e.target.value))
        }}
        value={num ? String(num) : ''}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "ArrowDown") {
            handleOnInput(num - 1)
          }
          if (e.key === "ArrowUp") {
            handleOnInput(num + 1)
          }
        }}
      />
      <div className="md:text-xl text-base print:text-base mt-2 md:mt-0">
        {name}
      </div>
    </div>
  )
}
export function Skills(): JSX.Element {
  const { skills, setSkillsAssign, skillsAssign } = React.useContext(ContextStore)
  return (
    <div className="sm:h-full print:h-full pb-3 ">
      <Title>技能</Title>
      <BlockContainer>
        <div 
          className='flex flex-col flex-wrap md:h-full print:h-full w-full h-96 overflow-x-auto print:py-0 md:py-0'
        >
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
        </div>
      </BlockContainer>
    </div>
  )
}
