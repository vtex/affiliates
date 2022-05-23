import React from 'react'
import { Box, Avatar, Button, Text, createSystem } from '@vtex/admin-ui'
import { canUseDOM, NoSSR } from 'vtex.render-runtime'

const [ThemeProvider] = createSystem({
  key: 'affiliates-topbar',
})

const TopBar = () => {
  return (
    <>
      {canUseDOM ? (
        <ThemeProvider>
          <Box>
            <Text>Programa de afiliados + Nome do Seller</Text>
            <Button>Acessar a loja</Button>
            <Avatar label="Avatar" />
          </Box>
        </ThemeProvider>
      ) : (
        <NoSSR>
          <ThemeProvider>
            <Box>
              <Text>Programa de afiliados + Nome do Seller</Text>
              <Button>Acessar a loja</Button>
              <Avatar label="Avatar" />
            </Box>
          </ThemeProvider>
        </NoSSR>
      )}
    </>
  )
}

export default TopBar
