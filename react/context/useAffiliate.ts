import { useContext } from 'react'

import AffiliateContext from './AffiliateContext'

function useAffiliate() {
  return useContext(AffiliateContext)
}

export default useAffiliate
