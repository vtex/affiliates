import React from 'react'
import { createSystem, Avatar } from '@vtex/admin-ui'

const [ThemeProvider] = createSystem({
  key: 'unique-key-in-kebab-case',
})

const Profile = () => {
  return(
    <ThemeProvider>
      <h1>Oi</h1>
      <Avatar label="Affiliate" palette="green"/>
    </ThemeProvider>
  )
}

export default Profile
