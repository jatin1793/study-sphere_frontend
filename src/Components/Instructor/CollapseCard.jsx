import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import baseUrl from '../../utils/baseUrl.js'
import { Collapse, Button, Card, Typography, CardBody, } from "@material-tailwind/react";
import { CardHeader, CardFooter } from "@material-tailwind/react";

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DeleteIcon from '@mui/icons-material/Delete';


const CollapseCard = (props) => {

  const courseid = props.courseid;
  const { videoid } = useParams();

  const [videodetails, setvideodetails] = useState({})
  const [instructordets, setinstructordets] = useState({})
  const [coursedets, setcoursedets] = useState([])

  const [size, setSize] = useState(null);
  const handleOpen = (value) => { setSize(value) };

  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);

  const deleteVideo = async (id) => {
    const response = await baseUrl.delete(`/instructor/course/deletecourse/${courseid}`, {
      headers: {
        "Content-type": 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
      },
      data: { courseid: id }
    });
    let d = response.data;
  }

  const deleteCourseVideo = async (id) => {
    let bodyContent = JSON.stringify({ "id": id, });

    let response = await fetch(`http://localhost:3000/instructor/deletevideo/${id}`, {
      headers: {
        "Content-type": 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
      },
      method: 'delete',
      body: bodyContent
    });
    let d = await response.json();
  }

  return (
    <div>
      <Card className="w-[70rem] z-[9999] static flex-row">
        <CardHeader
          shadow={false} floated={false}
          className="m-0 static w-2/5 shrink-0 rounded-r-none cursor-pointer"
        >
          <Link to={`/instructor/course/${props.courseid}`}>
            <img
              src={props.courseposter}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </Link>
        </CardHeader>

        <div className='flex flex-col justify-between'>
          <CardBody>
            <Typography variant="h4" color="blue-gray" className="mb-2">{props.coursetitle}</Typography>
            <Typography color="gray" className="mb-2 font-normal">{props.courseDomain}</Typography>
            <Typography color="gray" className="mb-8 font-normal"> {props.coursedescription} </Typography>
            <Typography variant='small'>No. of students enrolled : {props.enrolledstudents}</Typography>
            <Typography variant='small'>Created at:  {props.courseDate}</Typography>
          </CardBody>
          <CardFooter>
            <Button className='static' onClick={toggleOpen}>All videos</Button>
          </CardFooter>
        </div>

        <DeleteIcon className='mt-10 ml-96' />
      </Card>

      <Collapse open={open}>
        <Card className="my-2 w-8/12">
          <Link to={`/instructor/course/videoform/${props.courseid}`}>
            <Button size="sm">Add video</Button>
          </Link>

          <CardBody>
            {props.coursevideos.map((item) => {
              return (
                <div key={item._id} className='p-4 bg-[#E8EDF4] flex gap-12 mb-[4px] flex justify-between items-center'>
                  <Link to={`/instructor/course/${item.videoCourse}/video/${item._id}`} >
                    <div className='flex gap-6'>
                      <PlayCircleIcon className='text-gray' />
                      <h3>{item.videotitle}</h3>
                    </div>
                  </Link>
                  <DeleteIcon />
                </div>
              )
            })}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  )
}

export default CollapseCard