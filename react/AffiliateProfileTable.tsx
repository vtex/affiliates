import React from 'react'

import AffiliateProvider from './context/AffiliateProvider'
import ProfileTable from './components/store/ProfileTable'

function AffiliateProfileTable() {
  return (
    <AffiliateProvider>
      <ProfileTable />
    </AffiliateProvider>
  )
}

export default AffiliateProfileTable
