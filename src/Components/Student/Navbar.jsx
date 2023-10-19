import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../../index.css"

import logo from '../../images/LOGO.png'

import { Dialog } from "@material-tailwind/react";
import { IconButton, SpeedDial, SpeedDialHandler, SpeedDialContent, SpeedDialAction, Typography, } from "@material-tailwind/react";
import { Drawer, Button, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, } from "@material-tailwind/react";
import { DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";

import HomeIcon from '@mui/icons-material/Home';
import StarsIcon from '@mui/icons-material/Stars';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';


const Navbars = (props) => {

  const navigate = useNavigate();

  const [data, setdata] = useState("")

  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const [size, setSize] = useState(null);
  const handlelogoutdialog = (value) => setSize(value);

  const logouthandler = () => {
    localStorage.removeItem('student_user');
    localStorage.removeItem('student_token');
    navigate('/')
  }

  async function fetchData() {
    try {
      let response = await fetch("http://localhost:3000/student/details", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("student_token")
          )}`,
        },
      });
      response = await response.json();
      setdata(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex gap-2 bg-white'>
      <div className='justify-center items-center w-full'>
        <div className="px-6 py-2 text-white w-screen">
          <div className="flex items-center justify-between text-black">
            <div className='flex gap-12 items-center'>
              <MenuIcon onClick={openDrawer} className='cursor-pointer' />
              <img src={logo} className='w-24' />
              <div className="w-[40vw] flex border border-solid border-[black] rounded-[30px] py-2 px-4">
                <input type="text" placeholder='Search' onChange={props.handler} className="w-full border-none outline-none" onFocus={props.searchhandler} />
                <SearchIcon />
              </div>
            </div>
            <Link to="/student/profile" className='flex gap-2 items-center'>
              <h3>{data.name}</h3>
              <img src={data.profileimg} className='h-14 w-14 rounded-full mr-6' />
            </Link>
          </div>
        </div>
      </div>

      <Drawer open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <img src={logo} className='w-24' />
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>
        <List>
          <div className='px-4  flex flex-col h-[80vh] justify-between'>
            <div>
              <Link to='/student/home'>
                <ListItem><ListItemPrefix><HomeIcon className='text-black cursor-pointer' /></ListItemPrefix>Home</ListItem>
              </Link>

              <Link to='/student/likedvideos'>
                <ListItem><ListItemPrefix><StarsIcon className='text-black cursor-pointer' /></ListItemPrefix>Liked Videos</ListItem>
              </Link>

              <Link to='/student/savedcourses'>
                <ListItem><ListItemPrefix><TurnedInIcon className='text-black cursor-pointer' /></ListItemPrefix>Saved Courses </ListItem>
              </Link>
            </div>

            <div>
              <Link to='/student/profile' className='px-2 flex items-center gap-4 mb-2'>
                <img src={data.profileimg} className='w-12 h-12 rounded-full object-center'/>
                <h3>{data.name}</h3>
              </Link>

              <ListItem onClick={() => handlelogoutdialog("xs")} >
                <ListItemPrefix><LogoutIcon className='text-black cursor-pointer' /></ListItemPrefix>Log Out
              </ListItem>
            </div>

          </div>
        </List>
      </Drawer>
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
  )
}

export default Navbars