import React, { useEffect } from 'react'
import { RouterProvider, useNavigate } from "react-router"
import "./features/shared/global.scss"
import { router } from "./App.Routes.jsx"
import { getTokenData } from './utils/auth'

const App = () => {

  useEffect(() => {
    const data = getTokenData()
    if (data?.role === 'informer') router.navigate('/informer/dashboard')
    if (data?.role === 'scout') router.navigate('/scout/dashboard')
  }, [])

  return <RouterProvider router={router} />
}

export default App