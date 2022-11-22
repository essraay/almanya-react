import { useAppSelector } from '../store'
import { Navigate, useLocation } from 'react-router-dom'
import { getPath } from '../utils'

const PrivateRoute = ({ children }) => {
  const { user } = useAppSelector((state) => state.authSlice)
  const location = useLocation()

  if (!user)
    return (
      <Navigate
        to={getPath('login')}
        state={{ returnUrl: location.pathname + location.search }}
      />
    )

  return children
}

export default PrivateRoute
