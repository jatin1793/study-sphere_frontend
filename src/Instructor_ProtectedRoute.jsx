import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const { Component } = props;

    useEffect(()=>{
        let login = localStorage.getItem('instructor_token');
        if(!login){
            navigate('/instructor/signup-signin')
            toast.error("Login first to access !!")
        }
    },[])

    return (
        <div>
            <Component />
        </div>
    )
}

export default ProtectedRoute;