import React, { useEffect } from 'react'
import "../../../index.css"

import NewNav from '../NewNav.jsx';
import CoursesList from '../CoursesList.jsx'


const InstructorHome = () => {

  return (
    <div className='overflow-hidden'>
      <NewNav />
      <CoursesList />
    </div>
  )
}

export default InstructorHome