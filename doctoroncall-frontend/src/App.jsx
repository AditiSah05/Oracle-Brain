import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

const HomePage = lazy(() => import('./pages/HomePage'))
const SearchDoctorsPage = lazy(() => import('./pages/SearchDoctorsPage'))
const BookingPage = lazy(() => import('./pages/BookingPage'))
const TrackingPage = lazy(() => import('./pages/TrackingPage'))
const AuthSignInPage = lazy(() => import('./pages/AuthSignInPage'))
const AuthSignUpPage = lazy(() => import('./pages/AuthSignUpPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const DoctorVerifyEmailPage = lazy(() => import('./pages/DoctorVerifyEmailPage'))
const DoctorDashboardPage = lazy(() => import('./pages/DoctorDashboardPage'))
const PatientDashboardPage = lazy(() => import('./pages/PatientDashboardPage'))
const PrescriptionInvoicePage = lazy(() => import('./pages/PrescriptionInvoicePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function DashboardRedirect() {
  const { auth } = useAuth()
  if (!auth.isLoggedIn) return <Navigate to="/auth/sign-in" replace />
  return <Navigate to={auth.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'} replace />
}

function App() {
  return (
    <Suspense fallback={<div className="loading-shell">Loading interface...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<SearchDoctorsPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/track" element={<TrackingPage />} />
          <Route path="/auth/sign-in" element={<AuthSignInPage />} />
          <Route path="/auth/sign-up" element={<AuthSignUpPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/doctor-verify-email" element={<DoctorVerifyEmailPage />} />
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute role="doctor">
                <DoctorDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute role="patient">
                <PatientDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/records/:appointmentId" element={<PrescriptionInvoicePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
