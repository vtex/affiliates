import type { FC } from 'react'
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import ProfileButton from './components/store/affiliateProfileButton/ProfileButton'
import AffiliateProvider from './context/AffiliateProvider'

const CSS_HANDLES = ['profileButtonContainer'] as const

const AffiliateProfileButton: FC = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <AffiliateProvider>
      <div className={`${handles.profileButtonContainer}`}>
        <ProfileButton />
      </div>
    </AffiliateProvider>
  )
}

export default AffiliateProfileButton
