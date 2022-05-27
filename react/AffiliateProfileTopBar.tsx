import React from 'react'
import { Button, IconExternalLinkMini, Divider } from 'vtex.styleguide'
// import { useRuntime } from 'vtex.render-runtime'

import AffiliateProvider from './context/AffiliateProvider'
import VtexLogo from './components/store/icons/VtexLogo'
import Avatar from './components/store/Avatar'
// import useAffiliate from './context/useAffiliate'

const TopBar = () => {
  // const { account } = useRuntime()
  // const affiliate = useAffiliate()

  // console.log(affiliate)

  return (
    <AffiliateProvider>
      <div className="flex pa4 justify-between">
        <div className="flex items-center-s">
          <VtexLogo className="mr5" />
          <p className="mb0">Programa de afiliados: </p>
        </div>
        <div className="flex">
          <Button>
            <IconExternalLinkMini />
            <p className="pl3 mb0">Acessar a loja</p>
          </Button>
          <Avatar name="a" />
        </div>
      </div>
      <Divider />
    </AffiliateProvider>
  )
}

export default TopBar
