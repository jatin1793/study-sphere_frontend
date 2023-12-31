import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar.jsx'
import Loader from '../../../Loader.jsx';
import Footer from '../../../Footer.jsx';
import CourseCard from '../CourseCard.jsx'
import baseUrl from '../../../utils/baseUrl.js';

const SavedCourse = () => {
  const [isLoading, setisLoading] = useState(false)
  const [data, setdata] = useState([])

  async function fetchData() {
    try {
      let response = await baseUrl.post("/student/details", {}, {
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("student_token")
          )}`,
        },
      });
      setdata(response.data.joinedcourses);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
    }, 500);
    fetchData();
  }, [])

  return (
    isLoading ? (<Loader />) : (
      <div className='w-full overflow-hidden'>
        <Navbar />
        <div>
          
          <div className='w-[90vw] px-12 py-12'>
            <h3 className='font-[Poppins] text-[6vh] ml-4'>Enrolled courses</h3>
            <div className='flex flex-wrap w-[95vw] gap-2 mt-2'>
              {data.map((item) => {
                return (
                  <CourseCard
                    courseposter={item.coursePoster}
                    coursename={item.courseTitle}
                    courseDomain={item.courseDomain}
                    coursedate={item.courseDate.split('T')[0]}
                    instructor={item.Instructor.name}
                    courselength={item.courseVideos.length}
                    courseid={item._id}
                    coursedescription={item.courseDescription}
                  />

                );
              })}
            </div>

          </div>
        </div>
        <div className='mt-48'> 
          <Footer />
        </div>
      </div>
    )
  )
}

export default SavedCourse