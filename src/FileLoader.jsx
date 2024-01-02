import React from 'react'
import "./index.css"
import { ColorRing } from "react-loader-spinner";


const fileloader = (props) => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h3 className='mb-4'>{props.message}</h3>
            <ColorRing />
        </div>

    )
}

export default fileloader