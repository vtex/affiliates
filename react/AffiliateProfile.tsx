import React from 'react'

import AffiliateProvider from './context/AffiliateProvider'

const AffiliateProfile: StorefrontFunctionComponent = ({ children }) => {
  return (
    <AffiliateProvider>
      {React.Children.map(children, (child) => child)}
    </AffiliateProvider>
  )
}

export default AffiliateProfile
