import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ProtectedRoute() {
    const { user, token } = useAuth()

    if (!user || !token) {
        return <Navigate to="/signin" replace />
    }

    return <Outlet />
}

export default ProtectedRoute
