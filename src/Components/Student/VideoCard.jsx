import React from 'react'
import { Link } from 'react-router-dom';
import '../../index.css'

const CourseCard = (props) => {
  return (

    <Link to={`/student/course/${props.courseid}/video/${props.videoid}`}>
      <div className='flex gap-6 bg-[#E8EDF4] p-4'>
        <video src={props.video}
        className='rounded-lg h-30 w-48' />
        <div className='flex flex-col w-72'>
          <h3 className='text-lg uppercase font-[Poppins] leading-[4vh] h-6'>{props.videotitle}</h3>
          <h3 className='mt-2 font-extralight text-sm'>{props.coursename}</h3>
          <h3 className='mt-2 text-sm capitalize'>{props.instructor}</h3>
          <h6 className='mt-4 text-sm capitalize'>{props.likes}Likes</h6>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard