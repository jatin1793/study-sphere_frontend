import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css'
import HomeIcon from '@mui/icons-material/Home';
import baseUrl from '../../utils/baseUrl.js';
import Loader from '../../Loader.jsx';
import FileLoader from '../../FileLoader.jsx'
import logo from '../../images/logo.png'
import toast from 'react-hot-toast'
import { Dialog, CardHeader, CardBody, CardFooter, Checkbox, } from "@material-tailwind/react";
import { IconButton, SpeedDial, SpeedDialHandler, SpeedDialContent, SpeedDialAction, Typography, } from "@material-tailwind/react";
import { Badge, Drawer, Avatar, Input, Textarea, Button, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, } from "@material-tailwind/react";
import { DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import SearchIcon from '@mui/icons-material/Search';

const NewNav = (props) => {

  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false);
  const [fileloading, setfileloading] = useState(false)
  const [data, setData] = useState({ username: "", about: "", email: "", phone: "", qualification: "", experiance: "" })
  const [data1, setData1] = useState([]);
  const [profileimage, setprofileimage] = useState("");

  const [openRight, setOpenRight] = useState(false);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  const [open, setOpen] = useState(false);
  const handlelogoutdialog = () => setOpen(!open);

  // Log out handler
  const logouthandler = () => {
    localStorage.removeItem('student_user');
    localStorage.removeItem('student_token');
    navigate('/instructor/signup-signin')
  }

  // input of profile img
  const inputref = useRef(null);
  const handleInputClick = () => {
    inputref.current.click();
  };
  const submitref = useRef(null);

  // Check if profile img is in correct extension or not.
  const changehandler = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].type.startsWith('image/')) {
        setprofileimage(e.target.files[0]);
        setTimeout(() => {
          submitref.current.click();
        }, 1000);
      }
      else {
        toast.error('Please select a image.');
        e.target.value = null;
      }
    }
  };

  // change profile image
  const sendimagetoserver = async (e) => {
    setfileloading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.set("file", profileimage);

    let response = await baseUrl.post("/instructor/profileimg", formData, {
      headers: {
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("instructor_token")
        )}`
      }
    });
    setprofileimage(response.data.profileimg);
    toast.success(
      "Profile image uploaded successfully. Please refresh the page ."
    );
    setfileloading(false);
  };

  // Fetch data of all courses
  async function fetchData() {
    let d = await baseUrl.get('/instructor/mycourses', {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
      }
    })
    let response = d.data;
    setData1(response)
    setData({ username: response.name, phone: response.phone, qualification: response.qualification, experiance: response.experience })
    setprofileimage(response.profileimg)
  }

  // Instructor update handler
  const submitHandler = async (e) => {
    e.preventDefault();
    const { username, phone, qualification, experiance } = data;
    let response = await baseUrl.post('/instructor/update', JSON.stringify({ username, phone, qualification, experiance }), {
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`,
      }
    });
    let d = response.data;
    toast.success("Profile Updated!")
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    isLoading ? (<Loader />) : (

      <div className='flex gap-2 '>
        <div className='justify-center items-center w-full bg-white z-[9999999]' style={{ boxShadow: '0px 0px 15px -2px #444444' }}>
          <div className="px-6 py-2 text-white w-screen ">
            <div className="flex items-center justify-between text-black">
              <div className='flex gap-12 items-center'>

                <img src={logo} className='w-24' />
              </div>

              <div className='flex gap-6 items-center'>
                
                    <Link to={'/instructor/home'}>
                      <HomeIcon fontSize='large' className='text-[#9179F5]'></HomeIcon>
                    </Link>
                  
                    <button className='cursor-pointer' onClick={openDrawerRight}>
                      <img src={profileimage} className='h-14 w-14 border border-2 border-[#9179F5] rounded-full ' />
                    </button>
                

                    

                    

                    {/* <hr className=" border-blue-gray-50" /> */}
                    <Button onClick={handlelogoutdialog} className='bg-[#9179F5]'>LogOut</Button>
                    {/* Sign out button */}
                    

                {/* Drawer of Edit profile  */}
                <Drawer placement="right" size={480} open={openRight} onClose={closeDrawerRight} className="p-4" >
                  <div className='w-[28rem] flex flex-col gap-2 justify-between items-center h-[82vh]'>

                    <div className="h-full px-12 mb-4 flex flex-col items-center">
                      <h3 className="mb-2 font-bold text-[3vh] font-[Poppins] tracking-[.5px]">Personal Details</h3>
                      <div className='h-36 w-36 flex items-center justify-center mx-auto'>
                        {fileloading ? (<FileLoader />) : (
                          <img
                            src={profileimage}
                            className="h-36 w-36 object-cover rounded-full"
                          />
                        )}

                      </div>
                      <form onSubmit={sendimagetoserver}>
                        <input type="file" className="bg-blue-100 hidden" name="image" ref={inputref} onChange={changehandler} />
                        <input type="submit" className="hidden" ref={submitref} />
                        <Button className="bg-[#9179F5] mt-4" onClick={handleInputClick} >Choose photo</Button>
                      </form>

                    </div>

                    <form className='w-full flex flex-col justify-center items-center gap-2' onSubmit={submitHandler}>

                      <Input label="Username" color='indigo' defaultValue={data1.name} onChange={(e) => { setData({ ...data, username: e.target.value }) }} required icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />

                      <Input label="Contact No." color='indigo' defaultValue={data1.phone} onChange={(e) => { setData({ ...data, phone: e.target.value }) }} icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />

                      <Input label="Email" color='indigo' value={data1.email} disabled icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />


                      <Input label="Experiance" color='indigo' defaultValue={data1.experience} onChange={(e) => { setData({ ...data, experiance: e.target.value }) }} icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />
                      <Input label="Qualifications" color='indigo' defaultValue={data1.qualification} onChange={(e) => { setData({ ...data, qualification: e.target.value }) }} icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />
                      <Button className='mt-4 bg-[#9179F5] w-full' onClick={closeDrawerRight} type='submit' >Save Changes </Button>
                    </form>
                  </div>
                </Drawer>

                {/* Dialog box of logout button */}
                <Dialog open={open} handler={handlelogoutdialog} >
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
  )
}

export default NewNav