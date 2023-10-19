import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Loader from '../../../Loader.jsx';
import Footer from '../../../Footer.jsx';

const LikedVideos = () => {
  const [isLoading, setisLoading] = useState(false)
  useEffect(()=>{
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
    }, 500);
  },[])
  return (

    isLoading?(<Loader />):(
      <div>
        <Navbar />
        <div>
          <h3 className=''>Liked Videos</h3>
        </div>
        <Footer />
      </div>
    )
  )
}

export default LikedVideos