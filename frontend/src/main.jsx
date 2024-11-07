import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import PgLogin from './pages/login'
import PgHome from './pages/home'

const paginas = createBrowserRouter([
  {path: "/", element: <PgLogin/>},
  {path: "/home", element: <PgHome/>}
])

createRoot(document.getElementById('root')).render(

  <RouterProvider router={paginas} />

)
