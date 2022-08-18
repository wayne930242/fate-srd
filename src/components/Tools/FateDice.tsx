import React, { useState } from 'react'
import FateFont from '../FateFont'

const fateMap = ['-', '0', '+']

export default function FateDice(): JSX.Element {
  const [dices, setDices] = useState<(number)[]>([1, 1, 1, 1])
  const handleOnClick = () => {
    setDices(() => {
      const newDice = []
      for (var i = 0; i < 4; i++) {
        const value = Math.floor((Math.random() * 3))
        newDice.push(value)
      }
      return newDice
    })
  }
  return (
    <div
      id="fate-dice-container"
      className='tooltip'
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
      <span className="tooltiptext">擲骰！</span>
    </div>
  )
}
