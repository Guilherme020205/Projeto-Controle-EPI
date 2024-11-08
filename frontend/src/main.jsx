import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'

import PgLogin from './pages/login'
import PgHome from './pages/home'

import Header from './components/header/index.jsx'

const paginas = createBrowserRouter([
  { path: "/", element: <PgLogin /> },
  { path: "/home", element: <PgHome /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <RouterProvider router={paginas} />
  </StrictMode>
)
