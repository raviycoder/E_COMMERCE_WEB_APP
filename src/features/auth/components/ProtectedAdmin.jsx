/* eslint-disable react/prop-types */
import {useSelector} from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'

function ProtectedAdmin({children}) {
    const user = useSelector(selectLoggedInUser)
    if(!user){
      return <Navigate to="/login" replace={true} />
    }
  if(user && user.role!=='admin') {
    return <Navigate to='/login' replace={true} ></Navigate>
  }
  return children
}

export default ProtectedAdmin