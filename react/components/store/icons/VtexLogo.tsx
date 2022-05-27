import React from 'react'

interface VtexLogoProps {
  className?: string
}

const VtexLogo = ({ className }: VtexLogoProps) => {
  return (
    <svg
      viewBox="160 160 560 480"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="20"
      className={className}
    >
      <g fill="#f71963">
        <path d="M656.59 186.14h-374c-29 0-47.57 30.83-34 56.46L286 313.44h-67.82A24.94 24.94 0 0 0 196.12 350l120.33 227.75a24.94 24.94 0 0 0 44.08 0l32.68-61.52 41 77.62c14.43 27.3 53.52 27.35 68 .08l187.46-352.76c13.25-24.95-4.83-55.03-33.08-55.03zm-168 150.72L407.76 489a16.6 16.6 0 0 1-29.33 0l-80.05-151.5A16.6 16.6 0 0 1 313 313.13h161.33a16.15 16.15 0 0 1 14.26 23.73z" />
      </g>
    </svg>
  )
}

export default VtexLogo
