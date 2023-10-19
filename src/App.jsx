import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Landing from './components/Landing'
import Notfound from './Components/Notfound';
import Test from './Components/Test';

import InstructorSignup from './Components/Instructor/Pages/InstructorSignUp'
import InstructorHome from './Components/Instructor/Pages/InstructorHome'
import CourseForm from './Components/Instructor/Pages/CourseForm';
import UploadForm from './Components/Instructor/Pages/UploadForm'
import Instructorvideoplayer from './Components/Instructor/Pages/Instructorvideoplayer';
import InstructorCourseVideos from './Components/Instructor/Pages/InstructorCourseVideos'

import StudentSignup from './Components/Student/Pages/StudentSignup'
import StudentHome from './Components/Student/Pages/StudentHome'
import LikedVideos from './Components/Student/Pages/LikedVideos';
import SavedCourse from './Components/Student/Pages/SavedCourse';
import ProfilePage from './Components/Student/Pages/ProfilePage';
import CourseVideos from './Components/Student/Pages/CourseVideos';
import Videoplayer from './Components/Student/Pages/Videoplayer';
import CourseCard from './Components/Student/CourseCard';

import { Navbar } from '@material-tailwind/react';
import toast, { Toaster } from 'react-hot-toast';

import Protected from './ProtectedRoute.jsx'
import Ins_Protected from './Instructor_ProtectedRoute.jsx';

const App = () => {
  return (
    <div>
      <Routes >

        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/test" element={<Test />} />

        <Route path="/instructor/signup-signin" element={<InstructorSignup />} />
        <Route path="/instructor/home" element={<Ins_Protected Component={InstructorHome} />} />
        <Route path="/instructor/courseform" element={<Ins_Protected Component={CourseForm} />} />
        <Route path="/instructor/course/videoform/:courseid" element={<Ins_Protected Component={UploadForm} />} />
        <Route path="/instructor/course/:courseid/video/:videoid" element={<Ins_Protected Component={Instructorvideoplayer} />} />
        <Route path="/instructor/course/:id" element={<Ins_Protected Component={InstructorCourseVideos} />} />


        <Route path="/student/signup-signin" element={<StudentSignup />} />
        <Route path="/student/home" element={<Protected Component={StudentHome} />} />
        <Route path="/student/likedvideos" element={<Protected Component={LikedVideos} />} />
        <Route path="/student/savedcourses" element={<Protected Component={SavedCourse} />} />
        <Route path="/student/profile" element={<Protected Component={ProfilePage} />} />
        <Route path="/student/course/:id" element={<Protected Component={CourseVideos} />} />
        <Route path="/student/course/:courseid/video/:videoid" element={<Protected Component={Videoplayer} />} />
      </Routes>

      <Toaster toastOptions={{
        success: {
          style: {
            background: '#5CB85C',
            color: 'white',
            border:'0px solid green'
          },
        },
        error: {
          style: {
            background: '#BD362F',
            color: 'white'
          },
        },
      }} />

    </div>
  )
}

export default App