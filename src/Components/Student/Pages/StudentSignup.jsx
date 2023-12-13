import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../../../utils/baseUrl.js';
import '../../../index.css'

import logo from '../../../images/logo.png'
import landing from '../../../images/landing.png'

import toast from 'react-hot-toast'

import Loader from '../../../Loader.jsx';

import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Card, CardBody, Input, Button, Typography, Tabs, TabsHeader, TabsBody, Tab, TabPanel, Select, Option, } from "@material-tailwind/react";


const Studentsignin = () => {

  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false)
  const [type, setType] = useState("card");
  const [inputs, setInputs] = useState({ phone: "", email: "", name: "", password: "", institution: "", qualification: "", course: "" })
  const [loginInput, setLoginInputs] = useState({ email: "", password: "" })

  async function registerStudent(e) {
    e.preventDefault();
    const { phone, email, name, password, institution, qualification, course } = inputs;

    if (!phone || !email || !name || !password || !institution || !qualification || !course) {
      toast.error("Fill in all required fields !!! ")
    }
    else if(phone.length > 10 || phone.length < 10 ){
      toast.error("Phone number should be of 10 digits.")
    }
    else if (email.length > 30 || email.length < 10) {
      toast.error("Email should in range of 10 to 30 characters. ")
    }
    else if(name.length > 15 || name.length < 6 ){
      toast.error("Name should be in range of 6 to 15 chaacters. ")
    }
    else if(password.length > 15 || password.length < 6 ){
      toast.error("Password should be in range of 6 to 15 chaacters. ")
    }
    else if(qualification.length > 25 || qualification.length < 6 ){
      toast.error("Password should be in range of 6 to 25 chaacters. ")
    }
    else {
      try {
        const response = await baseUrl.post('/student/register', {
          phone, email, name, password, institution, qualification, course
        }).then((response) => {
          if (response.data.alreadyExists) {
            toast.error("Student with this email already exists !")
          } else {
            toast.success("Student registered successfully !! ")
            localStorage.setItem('student_user', JSON.stringify(response.data.user));
            localStorage.setItem('student_token', JSON.stringify(response.data.student_token))
            navigate(`/student/home`)
          }
        })
          .catch((error) => {
            console.log(response);
          })
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async function loginStudent(e) {
    e.preventDefault();
    const { email, password } = loginInput;

    if (!email || !password) {
      toast.error("Fill in all required fields !!! ")
    }
    else {
      try {
        let response = await baseUrl.post('/student/login', JSON.stringify({ email, password }), {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.data.student_token) {
          localStorage.setItem('student_user', JSON.stringify(response.data.user));
          localStorage.setItem('student_token', JSON.stringify(response.data.student_token))
          toast.success("Login successfully !!")
          navigate(`/student/home`)
        }
        if (!response.data.StudentExists && !response.data.passCheck) {
          toast.error("Student doesn't exists with this email !!")
        }
        else if (response.data.StudentExists && !response.data.passCheck) {
          toast.error("Incorrect password !!")
        }
      }
      catch (error) {
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
            <img src={landing} className='w-2/5 mb-6' />
          </div>

          <div className='absolute ml-[55%]'>
            <div className="w-96 bg-transparent">
              <div>
                <Tabs value={type} className="overflow-visible">
                  <TabsBody className="!overflow-x-hidden !overflow-y-visible" animate={{ initial: { x: type === "card" ? 400 : -400, }, mount: { x: 0, }, unmount: { x: type === "card" ? 400 : -400, }, }} >

                    <TabPanel value="card" className="p-0">
                      <form className="mt-2 flex flex-col gap-4" onSubmit={registerStudent}>
                        <div className='flex flex-col'>
                          <h1 className='text-[black] text-[5vh] font-[gilroy] font-extrabold mt-12'>Welcome to Signup!</h1>
                          <h1 className='text-[black] text-[3vh] font-[gilroy] font-medium'>Let's  Get you Started.</h1>
                        </div>
                        <div className='flex flex-col gap-2'>

                          <Input icon={<LocalPhoneOutlinedIcon className='text-[#ff723f]' />} color='deep-orange' type="Number" label="Phone number" onChange={(e) => { setInputs({ ...inputs, phone: e.target.value }) }} />
                          <Input icon={<PersonOutlineIcon className='text-[#ff723f]' />} color='deep-orange' type="email" label="Email Address" onChange={(e) => { setInputs({ ...inputs, email: e.target.value }) }} />
                          <Input icon={<PermIdentityOutlinedIcon className='text-[#ff723f]' />} color='deep-orange' type="name" label="Name" onChange={(e) => { setInputs({ ...inputs, name: e.target.value }) }} />
                          <Input icon={<LockOutlinedIcon className='text-[#ff723f]' />} color='deep-orange' type="password" label="Password" onChange={(e) => { setInputs({ ...inputs, password: e.target.value }) }} />
                          <Input color='deep-orange' type="name" label="Institution name" onChange={(e) => { setInputs({ ...inputs, institution: e.target.value }) }} />
                          <Select color='deep-orange' label="Select Qualification" onChange={(e) => { setInputs({ ...inputs, qualification: e }) }}>
                            <Option value='Material Tailwind HTML'>Material Tailwind HTML</Option>
                            <Option value='Material Tailwind React'>Material Tailwind React</Option>
                            <Option value='Material Tailwind Vue'>Material Tailwind Vue</Option>
                            <Option value='Material Tailwind Angular'>Material Tailwind Angular</Option>
                            <Option value='Material Tailwind Svelte'>Material Tailwind Svelte</Option>
                          </Select>
                          <Select color='deep-orange' label="Select Course" onChange={(e) => { setInputs({ ...inputs, course: e }) }}>
                            <Option value='Material Tailwind HTML'>Material Tailwind HTML</Option>
                            <Option value='Material Tailwind React'>Material Tailwind React</Option>
                            <Option value='Material Tailwind Vue'>Material Tailwind Vue</Option>
                            <Option value='Material Tailwind Angular'>Material Tailwind Angular</Option>
                            <Option value='Material Tailwind Svelte'>Material Tailwind Svelte</Option>
                          </Select>
                        </div>
                        <button className='bg-[#ff723f] rounded-[5px] font-medium  font-[gilroy] text-[white] p-2' type='submit' >Register</button>
                        <h3 className='flex cursor-pointer justify-center items-center text-[black] font-medium font-[gilroy] text-[2.5vh]'><span>Already have an account?</span> <Tab className='font-medium font-[gilroy] text-[2.5vh] text-[#ff723f] w-max' value="paypal" onClick={() => setType("paypal")}>Login</Tab></h3>
                      </form>
                    </TabPanel>

                    <TabPanel value="paypal" className="p-0">
                      <form className="mt-6 overflow-hidden flex flex-col gap-4" onSubmit={loginStudent}>
                        <div className='mt-12 flex flex-col gap-2'>
                          <h1 className='text-[black] text-[5vh] font-[gilroy] font-extrabold mt-12'>Welcome back.</h1>
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

export default Studentsignin