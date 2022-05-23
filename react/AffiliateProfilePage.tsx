import React from 'react'
import { NoSSR } from 'vtex.render-runtime'
import Profile from './components/store/Profile'

const AffiliateProfileMain = () => {
  return (
    <NoSSR>
      <Profile />
    </NoSSR>
  )
}

export default AffiliateProfileMain
