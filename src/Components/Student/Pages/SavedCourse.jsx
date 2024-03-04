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
      setisLoading(true);
      let response = await baseUrl.post("/student/details", {}, {
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("student_token")
          )}`,
        },
      });
      setdata(response.data.joinedcourses);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    isLoading ? (<Loader />) : (
      <div className='w-full overflow-hidden'>
        <Navbar />
        <div className='kuhu'>
        <div>

          <div className='w-[90vw] px-12 py-12'>
            <h3 className='font-[Poppins] text-[6vh] ml-4'>Enrolled courses</h3>
            <div className='flex flex-wrap w-[95vw] gap-2 mt-2'>
              {data.length > 0 ? (
                data.reverse().map((item) => (
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
                ))
              ) : (
                <h3>You haven't enrolled in any of the course yet.</h3>
              )}

            </div>

          </div>
        </div>
        <div className='mt-48'>
          <Footer />
        </div></div>
      </div>
    )
  )
}

export default SavedCourse