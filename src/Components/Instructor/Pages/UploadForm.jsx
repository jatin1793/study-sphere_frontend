import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NewNav from '../NewNav'

import toast from 'react-hot-toast'

import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

import { Card, Input, Button, Textarea, Typography, } from "@material-tailwind/react";

function UploadForm() {

  const { courseid } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [videodescription, setvideodescription] = useState(null)
  const [videotitle, setvideotitle] = useState(null)

  const submithandler = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file.');
    }

    const formData = new FormData();
    formData.set('file', file);
    formData.set('videodescription', videodescription)
    formData.set('videotitle', videotitle)

    let response = await fetch(`https://study-sphere-backend.onrender.com/instructor/uploadvideo/${courseid}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
      },
      method: "post",
      body: formData
    });
    let d = await response.json();
    console.log(d);
    toast.success(`"${file.name}" uploaded successfully to the course id:  "${courseid}"`);
    navigate('/instructor/home')
  }

  return (
    <div>
      <NewNav />

      <div className="px-20">
        <Card color="transparent" shadow={true} className="container w-fit p-4">
          <Typography variant="h4" color="blue-gray">Upload Video Lessons</Typography>
          <div className="container w-60 h-40 m-auto rounded-lg border">
            <ArrowUpTrayIcon className="w-20 h-20 m-auto mt-8" />
          </div>
          <Typography color="gray" className="mt-1 font-normal"> Add Video Details </Typography>
          <form onSubmit={submithandler} encType="multipart/form-data" className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <Input label="Title" onChange={(e) => setvideotitle(e.target.value)} />
              <Textarea color="blue" onChange={(e) => setvideodescription(e.target.value)} label="Description" />
            </div>
            <Button type="submit" className="mt-6" >Upload</Button>
          </form>
        </Card>
      </div>

    </div>
  );
}

export default UploadForm