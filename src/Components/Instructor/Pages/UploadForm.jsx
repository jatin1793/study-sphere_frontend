import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NewNav from '../NewNav.jsx'
import FileLoader from "../../../FileLoader.jsx"

import toast from 'react-hot-toast'
import baseUrl from "../../../utils/baseUrl.js";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

import { Card, Input, Button, Textarea, Typography, } from "@material-tailwind/react";

function UploadForm() {

  const { courseid } = useParams();
  const navigate = useNavigate();

  const [fileloading, setfileloading] = useState(false)
  const [file, setFile] = useState(null);
  const [videodescription, setvideodescription] = useState(null)
  const [videotitle, setvideotitle] = useState(null)


  const submithandler = async (e) => {
    setfileloading(true);
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file.');
    }
    const formData = new FormData();
    formData.set('file', file);
    formData.set('videodescription', videodescription)
    formData.set('videotitle', videotitle)

    let response = await baseUrl.post(`/instructor/uploadvideo/${courseid}`, formData, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
      },
    });
    setfileloading(false);
    toast.success(`"${file.name}" uploaded successfully to the course id:  "${courseid}"`);
    navigate(`/instructor/course/${courseid}`)
  }

  return (
    <div className="">
      <div className='h-full w-full overflow-hidden'>
        <NewNav />
        {fileloading ? (<FileLoader message="Please be patient. Your lecture is being uploaded...." />) : (

          <div className="px-20 flex justify-center mt-8">
            <Card color="transparent" shadow={true} className="container w-fit p-4">
              <Typography variant="h4" className="text-center text-[#9179F5]" color="blue-gray">Upload Video Lessons</Typography>
              <div className="container w-60 h-20 mt-4 m-auto rounded-lg border">
                <ArrowUpTrayIcon className="w-16 h-16 text-[#9179F5] m-auto mt-2" />
              </div>
              <Typography color="gray" className="mt-1 font-normal text-center"> Add Video Details </Typography>
              <form onSubmit={submithandler} encType="multipart/form-data" className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  <Input label="Title" color="indigo" onChange={(e) => setvideotitle(e.target.value)} />
                  <Textarea color="indigo" onChange={(e) => setvideodescription(e.target.value)} label="Description" />
                </div>
                <Button type="submit" className="mt-6 w-full bg-[#9179F5]">Upload</Button>
              </form>
            </Card>
          </div>

        )}
      </div>
    </div>
  );
}

export default UploadForm