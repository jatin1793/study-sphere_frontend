import React, { useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css'
import baseUrl from '../../utils/baseUrl';
import logo from '../../images/logo.png'
import toast from 'react-hot-toast'
import { Dialog, CardHeader, CardBody, CardFooter, Checkbox, } from "@material-tailwind/react";
import { IconButton, SpeedDial, SpeedDialHandler, SpeedDialContent, SpeedDialAction, Typography, } from "@material-tailwind/react";
import { Badge, Drawer, Avatar, Input, Textarea, Button, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, } from "@material-tailwind/react";
import { DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";

import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import SearchIcon from '@mui/icons-material/Search';

const NewNav = (props) => {

  const navigate = useNavigate();

  const [data, setData] = useState({ username: "", about: "", email: "", phone: "", qualification: "", experiance: "" })
  const [data1, setData1] = useState([]);
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
  async function fetchData(){
    let d = await baseUrl.get('/instructor/mycourses',{
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
    }
    })
    let response = d.data;
    setData1(response)
    setData({username:response.name,phone:response.phone,qualification:response.qualification,experiance:response.experience})
        
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    
      const {username,phone,qualification,experiance}=data;
      console.log("update")
    let response = await baseUrl.post('/instructor/update', JSON.stringify({ username ,phone,qualification,experiance}), {
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`,

      }
    });
    let d = response.data;
    if(d){
      toast.success("Profile Updated!")
    }
    fetchData();

  }
  useEffect(() => {
    fetchData();
}, []);
console.log(data)
  return (
    <div className='flex gap-2 '>
      <div className='justify-center items-center w-full bg-white z-[9999999]' style={{boxShadow: '0px 0px 15px -2px #444444'}}>
        <div className="px-6 py-2 text-white w-screen ">
          <div className="flex items-center justify-between text-black">
            <div className='flex gap-12 items-center'>
            
              <img src={logo} className='w-24' />
              {/* <div className="w-[45vw] flex border border-solid border-[#9179F5] border-2 ml-48 rounded-[30px] py-2 px-4">
                <input type="text"  placeholder='Search' onChange={props.handler} className="w-full border-none outline-none placeholder-[#9179F5]" />
                <SearchIcon className='text-[#9179F5]'/>
              </div> */}
            </div>
            <div className='flex gap-6'>
            <button onClick={openDrawerRight} className='cursor-pointer'>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_RlT-ytB9A_TQFLKMqVYpdJiiRbckTCThmw&usqp=CAU' className='h-14 w-14 border border-2 border-[#9179F5] rounded-full mr-6' />
            </button>
            <Drawer
              placement="right"
              size={480}
              open={openRight}
              onClose={closeDrawerRight}
              className="p-4"
            >
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h4" className='text-center ml-40 text-[#9179F5]' color="blue-gray">
                 Edit Profile
                </Typography>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={closeDrawerRight}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </IconButton>
              </div>
              <div className='card bg-[#FFFFFF] p-4 w-[28rem] flex flex-col gap-2 justify-between items-center border overflow-y-scroll  h-[82vh]'>
              <form><Badge className='bg-[#9179F5]' content={<EditNoteOutlinedIcon />} overlap="circular" placement="bottom-end">
                  <Avatar className='w-[10rem] h-[10rem] ' src={setData1.profileimg} alt="avatar" size="xxl" /></Badge></form><div className='flex gap-20 my-4'><Chip color="blue" value="followers" /><Chip color="blue" value="Courses : " /></div>
                <form className='w-full flex flex-col justify-center items-center gap-4' onSubmit={submitHandler}>
                  {/* <div className=' flex w-[55rem] ml-8 gap-6 justify-between items-center'> */}
                  {/* <div className='w-[25rem] flex flex-col gap-4'>   */}
                  
                  <Input label="Username" color='indigo' defaultValue={data1.name} onChange={(e)=>{setData({...data,username:e.target.value})}} required icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />

                  <Textarea label="About" color='indigo'  onChange={(e)=>{setData({...data,about:e.target.value})}} />

                  <Input label="Contact No." color='indigo' defaultValue={data1.phone} onChange={(e)=>{setData({...data,phone:e.target.value})}}  icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />

                  {/* </div> */}
                  {/* <div className='w-[25rem] flex flex-col gap-12'> */}
                  <Input label="Email" color='indigo' value={data1.email} disabled icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />


                  <Input label="Experiance" color='indigo' defaultValue={data1.experience} onChange={(e)=>{setData({...data,experiance:e.target.value})}} icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />
                  <Input label="Qualifications" color='indigo' defaultValue={data1.qualification} onChange={(e)=>{setData({...data,qualification:e.target.value})}} icon={<EditNoteOutlinedIcon></EditNoteOutlinedIcon>} />
                  {/* </div></div> */}
                  <Button className='mt-4 bg-[#9179F5] w-full' type='submit' >Save Changes </Button>
                </form>
              </div>
            </Drawer>
            <Button onClick={() => handlelogoutdialog("xs")}  className='h-12 bg-[#9179F5]'>Logout</Button>
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