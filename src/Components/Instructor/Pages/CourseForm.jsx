import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../index.css'
import toast from 'react-hot-toast'
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Card, Textarea, Input, Button, Typography, } from "@material-tailwind/react";
import NewNav from '../NewNav';

const CourseForm = () => {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [data, setData] = useState({ courseTitle: "", courseDomain: "", courseDescription: "" })

  const submithandler = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file.');
    }

    const formData = new FormData();
    formData.set('file', file);
    formData.set('courseTitle', data.courseTitle)
    formData.set('courseDomain', data.courseDomain)
    formData.set('courseDescription', data.courseDomain)

    let response = await fetch("http://localhost:3000/instructor/createcourse", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
      },
      method: "post",
      body: formData
    });
    let d = await response.json();
    toast.success(`Course created successfully!`);
    navigate(`/instructor/course/videoform/${d.course._id}`)
  }


  return (
    <div>
      <NewNav />
      <div className='px-12'>
        <div color="transparent" shadow={true} className="container w-fit p-4">
          <Typography variant="h4" color="blue-gray"> Create your Course </Typography>
          <Typography variant='h6'>Select course poster</Typography>
          <div className="container w-60 h-40 m-auto rounded-lg border">
            <ArrowUpTrayIcon className="w-20 h-20 m-auto mt-8" />
          </div>

          <form className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submithandler} encType="multipart/form-data" >
            <div className="mb-4 flex flex-col gap-6">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <Input color="blue" label="Course title" value={data.courseTitle} onChange={(e) => { setData({ ...data, courseTitle: e.target.value }) }} />
              <Input color="blue" label="Domain" value={data.courseDomain} onChange={(e) => { setData({ ...data, courseDomain: e.target.value }) }} />
              <Textarea color="blue" value={data.courseDescription} onChange={(e) => { setData({ ...data, courseDescription: e.target.value }) }} label="Description" />
            </div>
            <Button className="mt-6" type='submit' fullWidth >Create</Button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default CourseForm