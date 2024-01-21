import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
     const {userInfo} = useSelector((state)=>state.user)
    console.log(userInfo)
  return userInfo?.uid ? children : <Navigate to="/" />
    
}

export default PrivateRoute
