import React from 'react';
import cx from 'classnames'
export default function FateFont ({
  children,
  className,
}: {
  children: React.ReactNode,
  className?: string,
}) {
  return(
    <span className={cx(
      'fate-font',
      className,
    )}>
      {children}
    </span>
  )
}