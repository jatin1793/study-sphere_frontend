import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar.jsx";
import baseUrl from "../../../utils/baseUrl.js";
import { Card, CardHeader, CardBody, Typography, Button, } from "@material-tailwind/react";
import { Dialog, Select, CardFooter, Input, Checkbox, } from "@material-tailwind/react";
import { DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import toast from "react-hot-toast";
import Loader from "../../../Loader.jsx";
import Footer from "../../../Footer.jsx";
import EditIcon from '@mui/icons-material/Edit';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const ProfilePage = () => {
  const [isLoading, setisLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [openprofileimg, setOpenprofileimg] = useState(false);
  const handleOpenprofileimg = () => setOpenprofileimg(!openprofileimg);

  const [data, setdata] = useState([]);
  const [data1,setData1]=useState([]);
  async function fetchData() {
    try {
      let response = await baseUrl.post("/student/details",{} , {
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("student_token")
          )}`,
        },
      });
      setdata(response.data);
      setData1(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const inputref = useRef(null);
  const handleInputClick = () => {
    inputref.current.click();
  };

  const submitref = useRef(null);


  useEffect(() => {
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
    fetchData();
  }, []);

  const [profileimage, setprofileimage] = useState("");
  const [newprofileimg, setnewprofileimg] = useState("");
  const sendimagetoserver = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("file", profileimage);

    let response = await baseUrl.post("/student/profileimg", formData, {
      headers: {
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("student_token")
        )}`,
      },
    });
    setnewprofileimg(response.data);
    fetchData();
    toast.success(
      "Profile image uploaded successfully. Please refresh the page ."
    );
  };
  const editProfileData =async (e)=>{
    e.preventDefault();
    
      const {name,phone,qualification,institution,course}=data1;
      console.log("update")
    let response = await baseUrl.post('/student/updateprofile', JSON.stringify({ name ,phone,qualification,institution,course}), {
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('student_token'))}`,

      }
    });
    let d = response.data;
    if(d){
      toast.success("Profile Updated!")
    }
    fetchData();
  }
  
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
  const [edit,setEdit]=useState(true);
  const makeEditable = ()=>{
    setEdit(!edit);
  }
  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-screen flex flex-col">
      <Navbar />
      <div className="absolute flex gap-6 mt-[90px] ml-24">
        {/* 1 */}
        <div className="bg-[#E8EDF4] h-full px-12 py-10 flex flex-col items-center">
          <h3 className="mb-2 font-bold text-[3vh] font-[Poppins] tracking-[.5px]">Personal Details</h3>
          <div>
            <img
              src={`${data.profileimg}`}
              onClick={handleOpenprofileimg}
              className="h-36 w-36 object-cover rounded-full"
            />
          </div>
          <Dialog open={openprofileimg} handler={handleOpenprofileimg}>
            <img src={`${data.profileimg}`} className="h-[90vh] w-full" />
          </Dialog>
          <h3 className="mb-4 mt-2 font-bold text-[4vh]">{data.name}</h3>
          <form onSubmit={sendimagetoserver}>
            {/* <button> */}
            <input type="file" className="bg-blue-100 hidden" name="image" ref={inputref} onChange={changehandler} />
            <input type="submit" className="hidden" ref={submitref} />
            <Button className="bg-[#ff723f]" onClick={handleInputClick} >Choose photo</Button>
            {/* </button> */}
          </form>
          <Button onClick={makeEditable} className="mt-2 bg-[#ff723f]" >Edit Profile</Button>
          
        </div>

        {/* 2 */}
        <div className="px-12 flex flex-col">
          <h3 className="font-[Poppins] font-bold text-[4vh]">Basic Information</h3>
          <form className="mt-4 flex flex-col  gap-2" onSubmit={editProfileData} >
            <input defaultValue={data.name} disabled={edit} onChange={(e)=>{setData1({...data1,name:e.target.value})}}  type="text" className="w-96 bg-[#E8EDF4] px-12 py-2  outline-none" />
            <input defaultValue={data.email}  type="text" className="w-96 bg-[#E8EDF4] px-12 py-2 pointer-events-none outline-none" />
            <input defaultValue={data.phone} disabled={edit} onChange={(e)=>{setData1({...data1,phone:e.target.value})}} type="text" className="w-96 bg-[#E8EDF4] px-12 py-2  outline-none" />
            <input defaultValue={data.qualification} disabled={edit} onChange={(e)=>{setData1({...data1,qualification:e.target.value})}} type="text" className="w-96 bg-[#E8EDF4] px-12 py-2  outline-none" />
            <input defaultValue={data.institution} disabled={edit} onChange={(e)=>{setData1({...data1,institution:e.target.value})}} type="text" className="w-96 bg-[#E8EDF4] px-12 py-2  outline-none" />
            <input defaultValue={data.course} disabled={edit} onChange={(e)=>{setData1({...data1,course:e.target.value})}} type="text" className="w-96 bg-[#E8EDF4] px-12 py-2  outline-none" />
            
            <Button type="submit" onClick={makeEditable}> Save </Button>
          </form>
        </div>

        {/* 3 */}
        <div className="px-12 flex flex-col">
          <h3 className="font-[Poppins] font-bold text-[4vh]">My Courses</h3>
          {data.joinedcourses ?
            data.joinedcourses.map((e) => {
              return (
                <div className='p-4 w-72 mt-4 bg-[#E8EDF4] flex items-center justify-between'>
                  <div className='flex gap-6'>
                    <LibraryBooksIcon className='text-gray' />
                    <h3>{e.courseTitle}</h3>
                  </div>
                </div>
              )
            })
            : <>No enrolled courses found</>}
        </div>
      </div>

      <div className="mt-[500px]"><Footer /></div>
    </div>
  );
};

export default ProfilePage;
