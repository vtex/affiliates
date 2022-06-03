import React from 'react'

interface AvatarProps {
  name: string
}

const Avatar = ({ name }: AvatarProps) => {
  const nameFirstLetter = name.charAt(0)

  return (
    <div className="flex items-center-s justify-center w2 h2-s pa1 br-100-s bg-light-blue ttu ml5-s">
      <div className="f4 heavy-blue">{nameFirstLetter}</div>
    </div>
  )
}

export default Avatar
