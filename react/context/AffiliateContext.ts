import React from 'react'

interface AffiliateContextType {
  isValid: boolean
  isLogged: boolean
}

const AffiliateContext = React.createContext<AffiliateContextType>({
  isValid: false,
  isLogged: false,
})

export default AffiliateContext
