import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import './index.css'
import Login from './scene/login.jsx'
import Dashboard  from '../src/scene/Dashboard.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      // path='/'  element={<Login />} 
      // element={<RootLayout />}
      // errorElement={<p>Something went Wrong</p>}
    >
      <Route index element={<App />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <RouterProvider router={routes} />
  </React.StrictMode>,
)

