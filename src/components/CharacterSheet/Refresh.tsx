import React from 'react'
import { Title } from './Share'
import { ContextStore } from './MainSheet'

function CircleInput(): JSX.Element {
  const { refresh } = React.useContext(ContextStore)
  return (
    <div
      style={{
        borderStyle: 'solid',
        cursor: 'default',
        textAlign: 'center',
        borderWidth: 3,
        borderRadius: 60,
        padding: 20,
        fontSize: 60,
        lineHeight: '70px',
        width: 120,
        height: 120,
        backgroundColor: 'white',
      }}
    >
      <span className='print:hidden'>{refresh}</span>
    </div>
  )
}

export function Refresh(): JSX.Element {
  const { refreshMax } = React.useContext(ContextStore)
  return (
    <div className='md:absolute md:bottom-14 w-full print:absolute print:bottom-20'>
      <div className='absolute -bottom-4 left-10'>
        <CircleInput />
      </div>
      <Title>
        <div className='pl-36'>
          重振
        </div>
      </Title>
      <div className='text-xs pl-36 ml-6'>
        從 {refreshMax} 開始
      </div>
    </div>
  )
}