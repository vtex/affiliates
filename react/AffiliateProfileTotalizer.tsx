import React from 'react'

import AffiliateProvider from './context/AffiliateProvider'
import ProfileTotalizer from './components/store/ProfileTotalizers'

function AffiliateProfileTotalizer() {
  return (
    <AffiliateProvider>
      <div>
        <ProfileTotalizer />
      </div>
    </AffiliateProvider>
  )
}

export default AffiliateProfileTotalizer
