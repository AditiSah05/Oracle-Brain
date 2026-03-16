import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, role }) {
  const location = useLocation()
  const { auth } = useAuth()

  if (!auth.isLoggedIn) {
    return <Navigate to="/auth/sign-in" replace state={{ from: location.pathname }} />
  }

  if (role && auth.role !== role) {
    const fallbackPath = auth.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'
    return <Navigate to={fallbackPath} replace />
  }

  return children
}

export default ProtectedRoute
