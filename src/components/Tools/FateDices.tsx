import React, { useState } from 'react'
import cx from 'classnames'
import FateFont from '../FateFont'

const fateMap = ['-', '0', '+']

function FateDice(): JSX.Element {
  const [dices, setDices] = useState<(number)[]>([1, 1, 1, 1])
  const [animate, setAnimate] = useState<boolean>(null)
  const handleOnClick = () => {
    setDices(() => {
      const newDice = []
      for (var i = 0; i < 4; i++) {
        const value = Math.floor((Math.random() * 3))
        newDice.push(value)
      }
      return newDice
    })
    setAnimate(() => true)
    setTimeout(() => {
      setAnimate(() => false)
    }, 650)
  }
  return (
    <div
      id="fate-dice-container"
      className={cx(
        'my-2 py-4 rounded-md tooltip min-w-fit hover:bg-slate-200 flex content-center justify-center border-slate-2',
        animate ? 'animate-bounce-once' : null,
      )}
      onClick={handleOnClick}
    >
      {dices.map((dice, index) => {
        return (
          <FateFont
            key={index}
          >
            <>{fateMap[dice]}</>
          </FateFont>
        )
      })}
      {
        ` = ${dices.reduce((pre, cur) => {
          return pre + cur - 1
        }) - 1
        }`
      }
    </div>
  )
}

function Button({
  onClick,
  children,
  color = 'primary'
}: {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => any
  children: string,
  color?: 'primary' | 'danger'
}): JSX.Element {
  return (
    <div
      className={cx(
        'mx-4 inline-block px-4 py-1.5  font-medium text-xl leading-tight uppercase rounded shadow-md focus:shadow-lg focus:outline-none hover:shadow-lg focus:ring-0 active:shadow-lg transition duration-150 ease-in-out cursor-pointer',
        color === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 ' : '',
        color === 'danger' ? 'bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800' : '',
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default function FateDices(): JSX.Element {
  const [dices, setDices] = useState<JSX.Element[]>([<FateDice key={0} />])
  const [num, setNum] = useState<number>(1)

  const handleOnAdd = () => {
    setDices(d => {
      d.push(<FateDice key={num} />)
      setNum(n => n + 1)
      return [...d]
    })
  }

  const handleOnRemove = () => {
    setDices(d => {
      d.pop()
      setNum(n => n - 1)
      return [...d]
    })
  }

  return (
    <div className='w-56'>
      <div className='flex w-full justify-center mt-6 mb-2 h-10'>
        {num > 1
          ?
          <Button onClick={handleOnRemove} color='danger'>
            -
          </Button>
          : null
        }
      </div>
      <div className='flex flex-col w-full items-center'>
        {dices}
      </div>
      <div className='flex w-full justify-center mt-6 h-10'>
        <Button onClick={handleOnAdd}>
          +
        </Button>
      </div>
    </div >
  )
}
