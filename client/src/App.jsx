import './App.css'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import { BrowserRouter,createBrowserRouter,RouterProvider} from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'

const router = createBrowserRouter([

  {
    path:'/',
    element:<div><Login/></div>
  },
  {
    path:'register',
    element:<div><Register/></div>
  },
  {
    path: 'dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>, // Pass Dashboard as children
  },

])

function App() {

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
