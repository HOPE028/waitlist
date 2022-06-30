import { db } from '../firebase-config'
import SignUp from './SignUp'
import Login from './Login'
import DashBoard from './DashBoard'
import Infant from './Infant'
import PreSchool from './PreSchool'
import SchoolAge from './SchoolAge'
import ForgotPassword from './ForgotPassword'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function App() {
  const { currentUser } = useAuth()

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path='/*'
            element={currentUser !== null ? <DashBoard /> : <Login />}
          />
          <Route
            path='/infant'
            element={currentUser !== null ? <Infant /> : <Login />}
          />
          <Route
            path='/preschool'
            element={currentUser !== null ? <PreSchool /> : <Login />}
          />
          <Route
            path='/school-age'
            element={currentUser !== null ? <SchoolAge /> : <Login />}
          />

          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
