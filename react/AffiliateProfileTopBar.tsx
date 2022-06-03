import React from 'react'
import type { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import AffiliateProvider from './context/AffiliateProvider'
import TopBar from './components/store/affiliateTopBar/TopBar'

const CSS_HANDLES = ['topBarContainer'] as const

const AffiliateTopBar: FC = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <AffiliateProvider>
      <div className={`${handles.topBarContainer}`}>
        <TopBar />
      </div>
    </AffiliateProvider>
  )
}

export default AffiliateTopBar
