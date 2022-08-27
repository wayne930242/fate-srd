import React from 'react'
import { Title, BlockContainer, InputWithLabel } from '.'

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