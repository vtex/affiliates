import React from 'react'

interface AvatarProps {
  name: string
}

const Avatar = ({ name }: AvatarProps) => {
  const nameFirstLetter = name.charAt(0)

  return (
    <div className="flex items-center-s justify-center w2 h2 pa1 br-100-s bg-light-blue ttu heavy-blue">
      {nameFirstLetter}
    </div>
  )
}

export default Avatar
