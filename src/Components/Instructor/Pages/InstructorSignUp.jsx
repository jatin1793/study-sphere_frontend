import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import baseUrl from '../../../utils/baseUrl.js';

import logo from '../../../images/logo.png'
import instructor from '../../../images/instructor.png'

import '../../../index.css'
import toast from 'react-hot-toast';

import Loader from '../../../Loader.jsx';

import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Card, CardBody, Input, Button, Typography, Tabs, TabsHeader, TabsBody, Tab, TabPanel, Select, Option, } from "@material-tailwind/react";

const InstrunctorSignUp = () => {

  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false)
  const [type, setType] = useState("card");
  const [inputs, setInputs] = useState({ phone: "", email: "", name: "", password: "", qualification: "", experience: "", domain: "" })
  const [loginInput, setLoginInputs] = useState({ email: "", password: "" })


  async function registerInstructor(e) {
    e.preventDefault();
    const { phone, email, name, password, qualification, experience, domain } = inputs;
    if (!phone || !email || !name || !password || !qualification || !experience || !domain) {
      toast.error("Fill in all required fields !!! ")
    }
    else if(phone.length > 10 || phone.length < 10 ){
      toast.error("Phone number should be of 10 digits.")
    }
    else if(name.length > 15 || name.length < 6 ){
      toast.error("Name should be in range of 6 to 15 chaacters. ")
    }
    else if(password.length > 15 || password.length < 6 ){
      toast.error("Password should be in range of 6 to 15 chaacters. ")
    }
    
    else {
      try {
        const response = await baseUrl.post('/instructor/register', {
          phone, email, name, password, qualification, experience, domain
        })
          .then((response) => {
            if (response.data.alreadyExists) {
              toast.error("Instructor with this email already exists !")
            } else {
              toast.success("Instructor registered successfully !! ")
              localStorage.setItem('instructor_user', JSON.stringify(response.user));
              localStorage.setItem('instructor_token', JSON.stringify(response.instructor_token))
              navigate(`/instructor/home`)
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async function loginInstructor(e) {
    e.preventDefault();
    const { email, password } = loginInput;
  
    if (!email || !password) {
      toast.error("Fill in all required fields !!!");
    } 
    else {
      try {
        const response = await baseUrl.post('/instructor/login', {
          email,
          password,
        });
  
        if (response.data.instructor_token) {
          localStorage.setItem('instructor_user', JSON.stringify(response.data.user));
          localStorage.setItem('instructor_token', JSON.stringify(response.data.instructor_token));
          navigate(`/instructor/home`);
        } else if (!response.data.InstructorExists && !response.data.passCheck) {
          toast.error("Instructor doesn't exist with this email!!");
        } else if (response.data.InstructorExists && !response.data.passCheck) {
          toast.error("Incorrect password!!");
        }
      } catch (error) {
        alert(error);
      }
    }
  }
  

  useEffect(() => {
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
    }, 500);
  }, [])

  return (
    isLoading ? (<Loader />) : (

      <div className='w-screen h-screen'>

        <nav className='absolute px-12 py-4 w-full'>
          <img className="h-12" src={logo} />
        </nav>

        <div className='w-screen h-screen flex'>
          <div className='flex flex-col px-6 justify-end'>
            <img src={instructor} className='w-2/5 mb-6' />
          </div>

          <div className='absolute ml-[55%]'>
            <div className="w-96 bg-transparent">
              <div>
                <Tabs value={type} className="overflow-visible">
                  <TabsBody className="!overflow-x-hidden !overflow-y-visible" animate={{ initial: { x: type === "card" ? 400 : -400, }, mount: { x: 0, }, unmount: { x: type === "card" ? 400 : -400, }, }} >

                    <TabPanel value="card" className="p-0">
                      <form className="mt-2 flex flex-col gap-4" onSubmit={registerInstructor}>
                        <div className='flex flex-col'>
                          <h1 className='text-[black] text-[5vh] font-[gilroy] font-extrabold mt-12'>Welcome to Instructor Signup!</h1>
                          <h1 className='text-[black] text-[3vh] font-[gilroy] font-medium'>Let's  Get you Started.</h1>
                        </div>
                        <div className='flex flex-col gap-2'>

                          <Input icon={<LocalPhoneOutlinedIcon className='text-[#ff723f]' />} color='deep-orange' type="Number" label="Phone number" onChange={(e) => { setInputs({ ...inputs, phone: e.target.value }) }} />
                          <Input icon={<PersonOutlineIcon className='text-[#ff723f]' />} color='deep-orange' type="email" label="Email Address" onChange={(e) => { setInputs({ ...inputs, email: e.target.value }) }} />
                          <Input icon={<PermIdentityOutlinedIcon className='text-[#ff723f]' />} color='deep-orange' type="name" label="Name" onChange={(e) => { setInputs({ ...inputs, name: e.target.value }) }} />
                          <Input icon={<LockOutlinedIcon className='text-[#ff723f]' />} color='deep-orange' type="password" label="Password" onChange={(e) => { setInputs({ ...inputs, password: e.target.value }) }} />
                          <Input type="name" label="Qualification" onChange={(e) => { setInputs({ ...inputs, qualification: e.target.value }) }} />
                          <Input type="name" label="experience" onChange={(e) => { setInputs({ ...inputs, experience: e.target.value }) }} />
                          <Select label="Select Domain" onChange={(e) => { setInputs({ ...inputs, domain: e }) }}>
                            <Option value="10+12">10+12</Option>
                            <Option value="JEE Mains/Advance preparation">JEE Mains/Advance preparation</Option>
                            <Option value="Software Development">Software Development</Option>
                            <Option value="Engineering">Engineering</Option>
                            <Option value="Programming languages">Programming languages</Option>
                          </Select>
                        </div>
                        <button className='bg-[#ff723f] rounded-[5px] font-medium  font-[gilroy] text-[white] p-2' type='submit' >Register</button>
                        <h3 className='flex cursor-pointer justify-center items-center text-[black] font-medium font-[gilroy] text-[2.5vh]'><span>Already have an account?</span> <Tab className='font-medium font-[gilroy] text-[2.5vh] text-[#ff723f] w-max' value="paypal" onClick={() => setType("paypal")}>Login</Tab></h3>
                      </form>
                    </TabPanel>

                    <TabPanel value="paypal" className="p-0">
                      <form className="mt-6 overflow-hidden flex flex-col gap-4" onSubmit={loginInstructor}>
                        <div className='mt-12 flex flex-col gap-2'>
                          <h1 className='text-[black] text-[5vh] font-[gilroy] font-extrabold mt-12'>Welcome back Instructor.</h1>
                          <h1 className='text-[black] text-[3vh] font-[gilroy] font-medium'>please login to your account!</h1>
                          <div className='mt-12 flex flex-col gap-4'>
                            <Input icon={<PersonOutlineIcon className='text-[#ff723f]' />} size='lg' color='deep-orange' type="email" label="Email Address" onChange={(e) => { setLoginInputs({ ...loginInput, email: e.target.value }) }} />
                            <Input icon={<LockOutlinedIcon className='text-[#ff723f]' />} size='lg' color='deep-orange' type="password" label="Password" onChange={(e) => { setLoginInputs({ ...loginInput, password: e.target.value }) }} />
                          </div>
                          <h3 className='cursor-pointer text-right text-[black] font-medium font-[gilroy] text-[2vh]'>Forgot password?</h3>
                        </div>
                        <button className='bg-[#ff723f] rounded-[5px] font-medium  font-[gilroy] text-[white] p-2' type='submit'>Login</button>
                        <h3 className='flex cursor-pointer justify-center items-center text-[black] font-medium font-[gilroy] text-[2.5vh]'><span>Don't have an account?</span> <Tab className='font-medium font-[gilroy] text-[2.5vh] text-[#ff723f] w-max' value="card" onClick={() => setType("card")}>Signup</Tab></h3>
                      </form>
                    </TabPanel>

                  </TabsBody>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  )
}

export default InstrunctorSignUp