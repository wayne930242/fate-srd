import React from 'react';
export default function FateFont ({
  children,
}: {
  children: React.ReactNode,
}) {
  return(
    <span className='fate-font'>
      {children}
    </span>
  )
}