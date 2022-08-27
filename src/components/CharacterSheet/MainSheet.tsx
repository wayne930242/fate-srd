import React from "react"
import cx from "classnames"
import { defaultSkills } from "@site/src/helpers/data"
import { Head, Skills, RegularStunts, Vitals, Refresh, Aspects } from "."

export const ContextStore = React.createContext<{
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
  const [skills, setSkills] = React.useState<string[]>(defaultSkills)
  const [skillsAssign, setSkillsAssign] = React.useState<{ [key: string]: number }>(() => {
    const obj = {}
    for (const sa of defaultSkills) {
      obj[sa] = 0
    }
    return obj
  })
  const [refresh, setRefresh] = React.useState<number>(3)
  const [refreshMax, setRefreshMax] = React.useState<number>(3)
  const [stunts, setStunts] = React.useState<{ title: string, description: string }[]>([])

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
          maxWidth: "210mm",
        }}
      >
        {/*<div
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
        />*/}

        <div id="main-character-sheet">
          <Head />
          <div
            className={cx(
              "w-full flex flex-col pt-2",
              "print:grid print:grid-cols-12",
              "md:grid md:grid-cols-12 ",
            )}
            style={{
              minHeight: "98mm",
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
              minHeight: "149mm",
            }}
          >
            <div className={cx(
              "col-span-7 border-0 h-full relative",
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