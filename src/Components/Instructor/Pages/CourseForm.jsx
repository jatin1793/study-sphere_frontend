import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../index.css'
import toast from 'react-hot-toast'
import baseUrl from '../../../utils/baseUrl.js'
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Card, Textarea, Input, Button, Typography, } from "@material-tailwind/react";
import NewNav from '../NewNav.jsx';
import Loader from '../../../Loader.jsx'
import FileLoader from '../../../FileLoader.jsx'

const CourseForm = () => {

  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false)
  const [fileloading, setfileloading] = useState(false)
  const [file, setFile] = useState(null);
  const [data, setData] = useState({ courseTitle: "", courseDomain: "", coursePrice: "", courseDescription: "" })

  const submithandler = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file.');
    }
    else if (data.courseTitle.length > 20 || data.courseTitle.length < 3) {
      toast.error("Course title should be in range of 3 to 15 chaacters. ")
    }
    else {
      setfileloading(true);

      const formData = new FormData();
      formData.set('file', file);
      formData.set('courseTitle', data.courseTitle)
      formData.set('courseDomain', data.courseDomain)
      formData.set('courseDescription', data.courseDescription)
      formData.set('coursePrice', data.coursePrice)
      
      const response = await baseUrl.post("/instructor/createcourse", formData, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
        }
      });
      const d = response.data;
      setfileloading(false);
      toast.success("Course created successfully!");
      navigate(`/instructor/course/videoform/${d.course._id}`);
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
      <div>
        <div className='w-full overflow-hidden'>
          <NewNav />
          {fileloading ? (<FileLoader message="Creating your course ......" />) : (
            <div className='kuhu no-scrollbar px-12 justify-center z-[99] flex py-4'>
              <div color="transparent" shadow={true} className="container coursecreate  w-fit p-4">
                <Typography variant="h4" className='text-center text-[#9179F5]' color="blue-gray"> Create your Course </Typography>
                <Typography variant='h6' className='mt-2 text-center text-gray-700'>Select course poster</Typography>
                <div className="container w-60 h-20 m-auto mt-4 rounded-lg border">
                  <ArrowUpTrayIcon className="w-16 text-[#9179F5] h-16 m-auto mt-2" />
                </div>

                <form className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submithandler} encType="multipart/form-data" >
                  <div className="mb-4 flex flex-col gap-6">
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <Input color="indigo" label="Course title" value={data.courseTitle} onChange={(e) => { setData({ ...data, courseTitle: e.target.value }) }} />
                    <Input color="indigo" label="Domain" value={data.courseDomain} onChange={(e) => { setData({ ...data, courseDomain: e.target.value }) }} />
                    <Textarea color="indigo" value={data.courseDescription} onChange={(e) => { setData({ ...data, courseDescription: e.target.value }) }} label="Description" />
                  </div>
                  <Button className="mt-4 bg-[#9179F5]" type='submit' fullWidth >Create</Button>
                </form>

              </div>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default CourseForm