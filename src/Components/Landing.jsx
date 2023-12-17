import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Avatar } from "@material-tailwind/react";
import '../index.css'
import landing from '../images/landing (1).png'
import both from '../images/both2.png'
import instructor from '../images/instructor (1).png'
import chat from '../images/chat.png'
import logo from '../images/logo.png'

const Landing = () => {
    return (
        <div>
            <div className='w-full mb-4  h-[4rem] flex justify-between px-6' style={{boxShadow: '0px 0px 15px -2px #444444'}}>
                <img src={logo} />
                <div className='flex py-4 gap-4'>
                    <Link to="/student/signup-signin"><Button color='blue'>STUDENT LOGIN</Button> </Link>
                    <Link to="/instructor/signup-signin"><Button color='green'>INSTRUCTOR LOGIN</Button></Link>
                </div>
            </div>
            <div className='flex items-center m-auto'>
                <div className='h-[35rem] w-[38rem]   pl-20 flex flex-col gap-6 justify-center'>
                    <div className='flex items-center mt-[-2rem]'><div className='h-[1rem] w-[1rem]  rounded-full bg-[#FF7A03]'></div><p className='m-4 text-[#FF7A03]'>New platform</p></div>
                    <h6 className='text-5xl font-bold leading-snug'>Take your time <br /> and learn from <br /> anywhere</h6>
                    <Button variant="text" color='deep-orange' className="flex w-max items-center gap-2">
                        Get Started{" "}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </Button>
                    <div className='flex items-center gap-4'>
                        <div className="flex items-center -space-x-4">
                            <Avatar
                                variant="circular"
                                alt="user 1"
                                className=" hover:z-10 focus:z-10"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            />
                            <Avatar
                                variant="circular"
                                alt="user 2"
                                className=" hover:z-10 focus:z-10"
                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                            />

                            <Avatar
                                variant="circular"
                                alt="user 5"
                                className=" hover:z-10 focus:z-10"
                                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                            />

                        </div>
                        <p className='text-[#FF7A03]'>Join over 2000+ students</p>
                    </div>
                </div>
                <div className='h-[35rem] w-[28rem]  relative'>
                    <div className=' h-[11rem] w-[11rem] rounded-lg bg-red-500 border border-[2.2rem] border-orange-500 relative  top-[1rem] left-[11rem]'><div className='bg-white absolute top-[5rem] left-[-6rem] w-[10rem] ' ><img src={chat} className='object-fill w-[6rem]' alt="" /></div><img className='h-[10rem] absolute top-[-3rem] object-cover  left-[-1rem]  bg-black' src={both} alt="" /></div>
                    <div className=' h-[9rem] w-[9rem] rounded-lg bg-[#3AAFFF] outline outline-offset-4 outline-[#3AAFFF] outline-2 relative  top-[3rem] left-[2rem]'><div className='bg-white absolute top-[5rem] left-[-6rem] w-[10rem] ' ><img src={chat} className='object-fill w-[6rem]' alt="" /></div><img className='h-[10rem] absolute top-[-3rem] left-[-1rem] object-cover' src={instructor} alt="" /></div>
                    <div className=' h-[8rem] relative w-[8rem] rounded-lg bg-gray-700 outline outline-offset-4 outline-gray-700 outline-2 relative  top-[3rem] left-[15rem]'><div className='bg-white absolute top-[5rem] left-[-6rem] w-[10rem] ' ><img src={chat} className='object-fill w-[6rem]' alt="" /></div><img className='h-[10rem] absolute top-[-3rem] left-[-1rem] object-cover' src={landing} alt="" /></div>

                </div>
            </div>
        </div>
    )
}

export default Landing