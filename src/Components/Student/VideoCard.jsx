import React from 'react'
import { Link } from 'react-router-dom';
import '../../index.css'

const CourseCard = (props) => {
  return (

    <Link to={`/student/course/${props.courseid}/video/${props.videoid}`}>
      <div className='flex gap-6 bg-[#E8EDF4] p-4'>
        <img src={props.video}
        className='rounded-lg h-30 w-48' />
        <div className='flex flex-col w-72'>
          <h3 className='text-lg uppercase font-[Poppins] leading-[4vh] h-12'>{props.videotitle}</h3>
          <h3 className='mt-4 font-extralight text-sm'>{props.coursename}</h3>
          <h3 className='mt-6 text-sm capitalize'>{props.instructor}</h3>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard