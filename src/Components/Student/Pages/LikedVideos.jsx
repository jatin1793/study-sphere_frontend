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
      let response = await baseUrl.post("/student/details", {}, {
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("student_token")
          )}`,
        },
      });
      setlikedvideos(response.data.likedvideos);
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
      <div>
        <Navbar />
        <div>

          <div className='w-[90vw] px-12 py-12'>
            <h3 className='font-[Poppins] text-[6vh] items-center mb-6 mr-6 flex'>Liked videos</h3>
            <div className='flex w-[95vw] gap-6 overflow-x-auto'>
              {likedvideos.reverse().map((item) => {
                return (
                  <VideoCard
                    courseid={item._id}
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