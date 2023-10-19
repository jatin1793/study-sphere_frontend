import React, { useEffect } from 'react'
import "../../../index.css"

import NewNav from '../NewNav';
import CoursesList from '../CoursesList'


const InstructorHome = () => {

  return (
    <div>
      <NewNav />
      <CoursesList />
    </div>
  )
}

export default InstructorHome