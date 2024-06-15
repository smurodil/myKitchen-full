// React
import { useEffect } from "react"

// rrd
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

// PAGES
import { Home, Create, Login, Signup, Recipe, Store, Chart } from './pages'

// layout
import RootLayout from './layout/RootLayout'

// Redux
import { useSelector, useDispatch } from "react-redux"
import { isAuthReady, login } from './features/user/userSlice'

// firebase
import { auth } from './firebase/firebaseConfig'

// components
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { onAuthStateChanged } from "firebase/auth"


function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((state) => state.currentUser)

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoutes user={user}>
        <RootLayout/>
      </ProtectedRoutes>,
      children: [
        {
          index: true,
          element: <Home/>,
        },
        {
          path: '/create',
          element: <Create/>,
        },
        {
          path: 'recipe/:id',
          element: <Recipe/>,
        },
        {
          path: '/store',
          element: <Store/>,
        },
        {
          path: '/chart',
          element: <Chart/>,
        },
      ],
    },
    {
      path: '/login',
      element: user ? <Navigate to='/' /> : <Login/>,
    },
    {
      path: '/signup',
      element: user ? <Navigate to='/' /> : <Signup/>,
    }
  ])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        const uid = user.uid;
        dispatch(login(user))
        dispatch(isAuthReady(true))
      }
    })
  }, [user])

  return <>{<RouterProvider router={routes}/> }</>
}

export default App