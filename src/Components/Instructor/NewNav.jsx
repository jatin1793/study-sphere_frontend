import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css'

import logo from '../../images/logo.png'

import { Dialog, CardHeader, CardBody, CardFooter, Checkbox, } from "@material-tailwind/react";
import { IconButton, SpeedDial, SpeedDialHandler, SpeedDialContent, SpeedDialAction, Typography, } from "@material-tailwind/react";
import { Badge, Drawer, Avatar, Input, Textarea, Button, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, } from "@material-tailwind/react";
import { DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";

import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import SearchIcon from '@mui/icons-material/Search';

const NewNav = (props) => {

  const navigate = useNavigate();

  const [data, setData] = useState({ username: "", about: "", email: "", phone: "", qualification: "", experiance: "" })

  const [openRight, setOpenRight] = useState(false);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  const [size, setSize] = useState(null);
  const handlelogoutdialog = (value) => setSize(value);

  const logouthandler = () => {
    localStorage.removeItem('student_user');
    localStorage.removeItem('student_token');
    navigate('/instructor/signup-signin')
  }

  const submitHandler = async () => {
    const { username } = data;
    let response = await fetch('https://study-sphere-backend.onrender.com/instructor/update', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify({ username }),
      }
    });
    let d = await response.json();
  }

  return (
    <div className='flex gap-2'>
      <div className='justify-center items-center w-full bg-white z-[9999999]'>
        <div className="px-6 py-2 text-white w-screen border-b-[black] border-b border-solid">
          <div className="flex items-center justify-between text-black">
            <div className='flex gap-12 items-center'>
              <img src={logo} className='w-24' />
              <div className="w-[40vw] flex border border-solid border-[black] rounded-[30px] py-2 px-4">
                <input type="text" placeholder='Search' onChange={props.handler} className="w-full border-none outline-none" />
                <SearchIcon />
              </div>
            </div>
            <div className='flex gap-6'>
              <button onClick={openDrawerRight} className='cursor-pointer'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_RlT-ytB9A_TQFLKMqVYpdJiiRbckTCThmw&usqp=CAU' className='h-14 w-14 rounded-full mr-6' />
              </button>

              <Drawer placement="right" size={480} open={openRight} onClose={closeDrawerRight} className="p-4" >
                <div className="mb-6 flex items-center justify-between">
                  <Typography variant="h5" color="blue-gray"> Profile </Typography>
                  <IconButton variant="text" color="blue-gray" onClick={closeDrawerRight} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5" >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </IconButton>
                </div>

                <div className='card p-4 w-[28rem] flex flex-col gap-2 justify-between items-center border overflow-y-scroll  h-[82vh]'>

                  <form>
                    <Badge content={<EditNoteOutlinedIcon />} overlap="circular" placement="bottom-end">
                      <Avatar className='w-[10rem] h-[10rem]' src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="avatar" size="xxl" />
                    </Badge>
                  </form>

                  <div className='flex gap-20 my-4'>
                    <Chip color="blue" value="Followers" />
                    <Chip color="blue" value="Courses : " />
                  </div>

                  <form className='w-full flex flex-col justify-center items-center gap-4' onSubmit={submitHandler}>
                    <Input label="Username" onChange={(e) => { setData({ ...data, username: e.target.value }) }} required icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />
                    <Textarea label="About" onChange={(e) => { setData({ ...data, about: e.target.value }) }} />
                    <Input label="Contact No." onChange={(e) => { setData({ ...data, phone: e.target.value }) }} value={data.phone} icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />
                    <Input label="Email" disabled icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />
                    <Input label="Experiance" onChange={(e) => { setData({ ...data, experiance: e.target.value }) }} icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />
                    <Input label="Qualifications" onChange={(e) => { setData({ ...data, qualification: e.target.value }) }} icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />
                    <Button className='mt-4' type='submit' >Save Changes</Button>
                  </form>

                </div>
              </Drawer>

              <Button onClick={() => handlelogoutdialog("xs")}>Log out</Button>
              <Dialog open={size === "xs"} size={size || "md"} handler={handlelogoutdialog} >
                <DialogHeader className='text-[3vh]'>Are you sure you want to log out ?</DialogHeader>
                <DialogFooter>
                  <Button variant="text" color="red" onClick={() => handlelogoutdialog(null)} className="mr-1" >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="green" onClick={logouthandler} >
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewNav