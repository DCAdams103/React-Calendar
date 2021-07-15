import React from 'react'
import '../styles/globals.css'
import {ThemeProvider} from '@material-ui/core/styles'
import { AuthUserProvider } from '../context/AuthUserContext'

function MyApp({ Component, pageProps }) { 

  return(
    <AuthUserProvider><Component {...pageProps} /></AuthUserProvider>
  )
}

export default MyApp
