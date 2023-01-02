import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute(props) {
  console.log(props);
  const { user, adminRoute } = props;
  if(adminRoute){
    return user && user.isAdmin ? props.children : <Navigate to="/admin/signin" />
  }
  return user ? props.children : <Navigate to="/signin" />
}

export default PrivateRoute