import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar.jsx'
import Loader from '../../../Loader.jsx';
import Footer from '../../../Footer.jsx';
import VideoCard from '../VideoCard.jsx'
import baseUrl from '../../../utils/baseUrl.js';

const SavedCourse = () => {
  const [isLoading, setisLoading] = useState(false)
  const [likedvideos, setlikedvideos] = useState([])

  async function fetchData() {
    try {
      setisLoading(true)
      let response = await baseUrl.post("/student/details", {}, {
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("student_token")
          )}`,
        },
      });
      if (response.data) {
        setlikedvideos(response.data.likedvideos);
        setisLoading(false)
      }
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
        <div>

          <div className='w-[90vw] px-12 py-12'>
            <h3 className='font-[Poppins] text-[6vh] items-center mb-6 mr-6 flex'>Liked Lectures</h3>
            <div className='flex w-[95vw] gap-6 flex-wrap'>
              {likedvideos.length > 0 ? (
                likedvideos.reverse().map((item) => (
                  <VideoCard
                    key={item._id} 
                    courseid={item.videoCourse._id}
                    videoid={item._id}
                    coursename={item.videoCourse.courseTitle}
                    videotitle={item.videotitle}
                    video={item.videoUrl}
                    likes={item.videoLikes.length}
                    instructor={item.instructor.name}
                  />
                ))
              ) : (
                <h3>You haven't liked any lecture yet.</h3>
              )}

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