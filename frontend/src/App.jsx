import React from 'react'
import { RouterProvider } from "react-router"
import "./features/shared/global.scss"
import { router } from "./App.Routes.jsx"

const App = () => {
  return <RouterProvider router={router} />
}

export default App