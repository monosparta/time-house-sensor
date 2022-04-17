import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../features/counter/userSlice';

const Logout = () => {
    const dispatch=useDispatch();

    const handleLogout =(e)=>{
        dispatch(logout())
    }
  return (
    <div>
        HI<span>dsdsd</span>
        <Button onClick={(e)=>{handleLogout(e);e.preventDefault();}}>Logout</Button>
    </div>

  )
}

export default Logout