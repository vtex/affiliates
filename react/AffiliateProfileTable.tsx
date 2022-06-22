/* eslint-disable react/jsx-pascal-case */
import React from 'react'

import AffiliateProvider from './context/AffiliateProvider'
import ProfileTable from './components/store/ProfileTable'

function AffiliateProfileTable() {
  return (
    <AffiliateProvider>
      <div>
        <ProfileTable />
      </div>
    </AffiliateProvider>
  )
}

export default AffiliateProfileTable
