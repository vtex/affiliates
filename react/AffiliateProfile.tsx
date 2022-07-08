import React from 'react'

import AffiliateProvider from './context/AffiliateProvider'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AffiliateProfile: StorefrontFunctionComponent = ({ children }) => {
  return (
    <AffiliateProvider>
      {React.Children.map(children, (child) => child)}
    </AffiliateProvider>
  )
}

export default AffiliateProfile
