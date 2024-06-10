import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const AdminRoute  = ({childern}) => {
   const navigate = useNavigate()
const {role} = useAuth();

if(role !== 'Admin') {
  return navigate('/unauthorized')
}
return childern
}

export default AdminRoute;