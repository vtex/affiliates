import React, { useState } from 'react'

import './styles.global.css'

interface Props {
  children: React.ReactNode
  content: string
  delay: number
}

function Tooltip(props: Props) {
  let timeout: ReturnType<typeof setTimeout>
  const [active, setActive] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, props.delay || 400)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <div
      className="tooltipWrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {active && <div className="tooltipTip top">{props.content}</div>}
    </div>
  )
}

export default Tooltip
