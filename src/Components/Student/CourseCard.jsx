import React from 'react'
import { Link } from 'react-router-dom';
import '../../index.css'
import { Tooltip } from "@material-tailwind/react";


import { Card, CardHeader, CardBody, CardFooter, Typography, Button, } from "@material-tailwind/react";

const CourseCard = (props) => {
  return (
    <div>
      <Tooltip className="bg-transparent" placement="right" content={
        <Card className="bg-[#E8EDF4] shrink-0 rounded-none h-max p-4 w-[350px]">
          <div>
            <img
              src={props.courseposter}
              className='w-full h-36 bg-white object-contain rounded-none'
            />
          </div>
          <div className='w-full py-2'>
            <h3 className="uppercase font-bold text-[3vh] font-[Poppins] text-[black] font-medium">
              {props.coursename}
            </h3>
            <div className='mt-2 rounded-[7px] mb-2 bg-[#6495ED] w-max p-[5px]'>
              <h6 className='text-[2vh] text-white'> {props.coursedescription} </h6>
            </div>
            <div className='my-6'>
              <div className="flex text-[2vh] text-[black] font-medium">
                <p className='text-[2vh] w-2/5 text-[black] font-medium mr-2'>Created on : </p>
                <p className='text-[2vh] text-[grey] w-3/5 font-medium mr-2'>{props.coursedate}</p>
              </div>
              <div className="mt-2 flex text-[2vh] text-[black] font-medium">
                <p className='text-[2vh] w-2/5 text-[black] font-medium mr-2'>Instructor : </p>
                <p className='text-[2vh] w-3/5 text-[grey] font-medium mr-2'>{props.instructor}</p>
              </div>
              <div className="mt-2 flex text-[2vh] text-[black] font-medium">
                <p className='text-[2vh] w-2/5 text-[black] font-medium mr-2'>Lectures : </p>
                <p className='text-[2vh] w-3/5 text-[grey] font-medium mr-2'>{props.courselength}</p>
              </div>
            </div>
          </div>
          <Link to={`/student/course/${props.courseid}`}>
            <Button className='bg-[#5553FF] w-full rounded-[0px]'>Watch now</Button>
          </Link>
        </Card>
      }>

        <div className="shrink-0 rounded-none h-max p-4 w-72">
          <div>
            <img
              src={props.courseposter}
              className='w-full h-36 bg-white rounded-none'
            />
          </div>
          <div className='w-full py-2'>
            <h3 className="uppercase font-bold text-[3vh] font-[gilroy] mb-4 text-[black] font-medium">
              {props.coursename}
            </h3>
            <h3 className="text-[2vh] font-[gilroy] mb-2 text-[gray] font-medium">
              {props.instructor}
            </h3>
            <h3 className="text-[2vh] font-[gilroy] mb-4 text-[black] font-medium">
            {props.courselength} Lectures 
            </h3>
          </div>
          <Link to={`/student/course/${props.courseid}`}>
            <Button className='bg-[#ff723f] w-full rounded-[0px]'>Watch now</Button>
          </Link>
        </div>

      </Tooltip>
    </div>
  )
}

export default CourseCard