import 'bootstrap/dist/css/bootstrap.css'

import "react-toastify/dist/ReactToastify.min.css"
import '../services/interceptors'


import '../styles/dashboard.css'

import '../styles/global.css'
import '../styles/login.css'
import '../styles/signup.css'


import type { AppProps } from 'next/app'
import { ToastContainer } from "react-toastify"


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
     
        <Component {...pageProps} />
        
      
      <ToastContainer />
    </>
  )
}
