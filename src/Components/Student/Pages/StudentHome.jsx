import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "../../../../src/index.css"
import Navbar from '../Navbar'
import CourseCard from '../CourseCard'
import Footer from '../../../Footer.jsx'
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Carousel, IconButton } from "@material-tailwind/react";

import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import Loader from '../../../Loader.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { setFollowingStatus } from '../../../store/reducers/followingSlice.js';

const StudentHome = () => {
  const ref = useRef(null);
  const [isLoading, setisLoading] = useState(false)
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  function StarIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-yellow-700" >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  const scrollto = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [courses, setcourses] = useState([])
  const [instructors, setinstructors] = useState([])

  async function fetchData() {
    try {
      let response = await fetch("http://localhost:3000/student/home", {
        method: 'post',
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('student_token'))}`
        }
      });
      response = await response.json();
      console.log(response)
      setcourses(response.courses)
      setinstructors(response.instructors)
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
  }, []);


  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = courses.filter((el) => {
    if (inputText === '') {
      return true;
    } else {
      return el.courseTitle.toLowerCase().includes(inputText);
    }
  });

  const [isfollowed, setisfollowed] = useState(false)

  const followhandler = async (id) => {
    let bodyContent = JSON.stringify({
      "id": id,
    });

    let response = await fetch(`http://localhost:3000/student/follow/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem('student_token'))}`
      },
      method: "post",
      body: bodyContent
    });
    let d = await response.json();
    setisfollowed(d.isfollowed)
  }



  return (
    isLoading ? (<Loader />) : (
      <div className='box w-screen overflow-hidden'>
        <Navbar handler={inputHandler} searchhandler={scrollto} />
        <div className='w-full h-96' >
          <Carousel
            prevArrow={({ handlePrev }) => (
              <IconButton variant="text" color="white" size="lg" onClick={handlePrev} className="!absolute top-2/4 left-4 -translate-y-2/4" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton variant="text" color="white" size="lg" onClick={handleNext} className="!absolute top-2/4 !right-4 -translate-y-2/4" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /> </svg>
              </IconButton>
            )}
          >
            <div>

              <div className='absolute bg-white p-6 mt-20 ml-20 flex flex-col gap-4'>
                <h3 className='font-[Poppins]'>The fastest way to learn in-demand <br /> tech skills</h3>
                <h5 className='text-[2vh]'>Master the skills you need to get the job <br /> you want — and excel when you get there</h5>
                <Button className='bg-[#ff723f] w-36 rounded-[0px]' onClick={scrollto}>Join a course</Button>
              </div>
              <img
                src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/09206fc2-d0f1-41f6-b714-36242be94ee7.jpg"
                alt="image 1"
                className="h-full w-full object-cover"
              />
            </div>
            <img
              src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/e6cc1a30-2dec-4dc5-b0f2-c5b656909d5b.jpg"
              alt="image 2"
              className="h-full w-full object-cover"
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1678565999588-08fdd0b1410b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1894&q=80"
              alt="image 3"
              className="h-full w-full object-cover"
            />
          </Carousel>
        </div>

        <div className='h-full py-12 px-12 flex flex-col gap-6'>
          {/* All Courses */}
          <div className='w-[90vw]' ref={ref}>
            <h3 className='font-[Poppins] text-[6vh] items-center mb-6 mr-6 flex'>Explore Best-In-Class Content</h3>
            <h6 className='text-[3vh] text-gray-700 items-center mb-6 mr-6 flex'>Choose from over 210,000 online video courses with new additions published every month</h6>
            <div className='flex w-[95vw] gap-6 overflow-x-auto'>
              {filteredData.reverse().map((item) => {
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

          {/* Trending Courses */}
          <div className='py-4 mt-16'>
            <h2 className='py-4 text-[6vh] font-[Poppins]'>The Best Free Online Courses of <br /> All Time</h2>
            <h4 className='text-[3vh] text-gray-700 mb-10'>The highest rated online courses and MOOCs of all time from top universities around the <br /> world. Based on thousands of reviews written by Class Central users.</h4>
            <div className='flex w-[95vw] gap-6 overflow-x-auto'>
              {filteredData.reverse().map((item) => {
                return (
                  <CourseCard
                    courseposter={item.coursePoster}
                    coursename={item.courseTitle}
                    coursedescription={item.courseDomain}
                    coursedate={item.courseDate.split('T')[0]}
                    instructor={item.Instructor.name}
                    courselength={typeof item.courseVideos}
                    courseid={item._id}
                  />
                );
              })}
            </div>
          </div>

          {/* Top Educators To learn from */}
          <div>
            <h2 className='py-4 mt-16 text-[6vh] font-[Poppins]'>Top educators To learn from</h2>
            <div className='gap-12 flex'>
              <div className='flex gap-2 items-center' >
                <BeenhereOutlinedIcon className='text-[2vh] text-gray-700' /><h3 className='text-[2vh] text-gray-700'>Proven history of delivering results</h3>
              </div>
              <div className='flex gap-2 items-center' >
                <BeenhereOutlinedIcon className='text-[2vh] text-gray-700' /><h3 className='text-[2vh] text-gray-700'>Mentored past rankers</h3>
              </div>
              <div className='flex gap-2 items-center' >
                <BeenhereOutlinedIcon className='text-[2vh] text-gray-700' /><h3 className='text-[2vh] text-gray-700'>Unique style of teaching</h3>
              </div>

            </div>
            <div className='mt-12 flex gap-6 flex-wrap'>
              {instructors.map((item) => {
                return (
                  < Card shadow={false} className="p-4 w-full max-w-[26rem] bg-[#E8EDF4] text-white" >
                    <CardHeader
                      color="transparent"
                      floated={false}
                      shadow={false}
                      className="mx-0 flex items-center gap-4 pt-0 pb-8"
                    >
                      <Avatar size="lg" variant="circular" src={item.profileimg} alt="tania andrew" />
                      <div className="flex w-full flex-col gap-0.5">
                        <div className="flex items-center justify-between">
                          <Typography variant="h5" color="blue-gray"> {item.name} </Typography>
                          <div className="5 flex items-center gap-0">
                            <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
                          </div>
                        </div>
                        <Typography color="blue-gray">{item.qualification}</Typography>
                      </div>
                    </CardHeader>
                    <CardBody className="mb-6 p-0">
                      <h3 className='text-black'>
                        &quot;I found solution to all my design needs from Creative Tim. I use
                        them as a freelancer in my hobby projects for fun! And its really
                        affordable, very humble guys !!!&quot;
                      </h3>
                      {isfollowed ?
                        <Button variant="" onClick={() => { followhandler(item._id) }}
                          className="bg-[#5553ff] mt-4 flex items-center gap-3">
                          Unfollow
                          <PersonAddIcon />
                        </Button>
                        :
                        <Button onClick={() => { followhandler(item._id) }}
                          className="bg-[#5553ff] mt-4 flex items-center gap-3">
                          Follow
                          <PersonAddIcon />
                        </Button>
                      }

                    </CardBody>
                  </Card >
                )
              })}
            </div>
          </div>

        </div>

        <Footer />

      </div>)

  )
}

export default StudentHome


