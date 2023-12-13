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
            <Button className="bg-[#5553FF]" onClick={handleInputClick} >Choose photo</Button>
            {/* </button> */}
          </form>
          <Button onClick={handleOpen} className="mt-2 bg-[#5553FF]" type="submit" >Edit Profile</Button>
          <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none" >
            <Card className="mx-auto w-full">
              <form className="p-4 flex flex-col gap-4">
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="mt-4 font-medium" > Edit Profile</Typography>
                  <Input type="Number" label="Phone number" />
                  <Input type="name" label="Name" />
                  <Typography variant="small" color="blue-gray" className="mt-4 font-medium" >Education Details</Typography>
                  <Input type="name" label="Institution name" />
                  <Select label="Select Qualification">
                    <Option value="Material Tailwind HTML"> Material Tailwind HTML </Option>
                    <Option value="Material Tailwind React"> Material Tailwind React </Option>
                    <Option value="Material Tailwind Vue"> Material Tailwind Vue </Option>
                    <Option value="Material Tailwind Angular"> Material Tailwind Angular </Option>
                    <Option value="Material Tailwind Svelte"> Material Tailwind Svelte </Option>
                  </Select>
                  <Select label="Select Course">
                    <Option value="Material Tailwind HTML"> Material Tailwind HTML </Option>
                    <Option value="Material Tailwind React"> Material Tailwind React </Option>
                    <Option value="Material Tailwind Vue"> Material Tailwind Vue </Option>
                    <Option value="Material Tailwind Angular"> Material Tailwind Angular </Option>
                    <Option value="Material Tailwind Svelte"> Material Tailwind Svelte </Option>
                  </Select>
                </div>
                <Button color="blue" size="sm" type="submit"> Save </Button>
              </form>
            </Card>
          </Dialog>
        </div>

        {/* 2 */}
        <div className="px-12 flex flex-col">
          <h3 className="font-[Poppins] font-bold text-[4vh]">Basic Information</h3>
          <form className="mt-4 flex flex-col  gap-2">
            <input placeholder={data.name} type="text" className="w-96 bg-[#E8EDF4] px-12 py-2 pointer-events-none outline-none" />
            <input placeholder={data.email} type="text" className="w-96 bg-[#E8EDF4] px-12 py-2 pointer-events-none outline-none" />
            <input placeholder={data.phone} type="text" className="w-96 bg-[#E8EDF4] px-12 py-2 pointer-events-none outline-none" />
            <input placeholder={data.qualification} type="text" className="w-96 bg-[#E8EDF4] px-12 py-2 pointer-events-none outline-none" />
            <input placeholder={data.institution} type="text" className="w-96 bg-[#E8EDF4] px-12 py-2 pointer-events-none outline-none" />
            <input placeholder={data.course} type="text" className="w-96 bg-[#E8EDF4] px-12 py-2 pointer-events-none outline-none" />

            <Button type="submit"> Save </Button>
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
