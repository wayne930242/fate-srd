import React from 'react'
import { ContextStore } from './MainSheet'
import { Title, BlockContainer } from './Share'

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
  const { stunts, setStunts } = React.useContext(ContextStore)
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
export function RegularStunts(): JSX.Element {
  const { refreshMax, stunts, setStunts, setRefresh } = React.useContext(ContextStore)
  const [stuntComponents, setStuntComponents] = React.useState<JSX.Element[]>([])

  const stuntNum = stuntComponents.filter(c => c !== null).length

  const addStunt = () => {
    setStuntComponents(cp => {
      const newCp = [...cp]

      newCp.push(
        <div className="relative">
          <div
            onClick={() => removeStunt(cp.length)}
            className="absolute -left-8 top-1 w-6 mr-2 cursor-pointer text-center my-2 rounded-2xl hover:bg-slate-500 text-slate-300 hover:text-white print:hidden"
          >
            X
          </div>
          <Stunt
            key={cp.length}
            index={cp.length}
          />
        </div>
      )
      return newCp
    })
    if (stuntNum >= 3) {
      setRefresh(r => r-1)
    }
  }

  const removeStunt = (index: number) => {
    setStuntComponents(sc => {
      const newSc = [...sc]
      newSc[index] = null
      return newSc
    })
    if (stuntNum >= 3) {
      setRefresh(r => r+1)
    }
  }

  return (
    <div className="h-full">
      <Title>一般絕技</Title>
      <BlockContainer>
        {stuntComponents}
        { stuntNum >= refreshMax + 2 ? null : (
          <div className="w-full flex justify-center">
            <AddStunt onClick={addStunt} />
          </div>
        )}
      </BlockContainer>
    </div>
  )
}