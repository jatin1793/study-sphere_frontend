import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../index.css'
import baseUrl from '../../utils/baseUrl.js'

import { Button } from '@material-tailwind/react'

import InsCourseCard from "./InsCourseCard.jsx"
import Loader from '../../Loader.jsx'

const CoursesList = () => {

    const navigate = useNavigate();

    const [isLoading, setisLoading] = useState(false)
    const [data, setdata] = useState([]);

    async function fetchData() {
        setisLoading(true);
        let response = await baseUrl.get("/instructor/mycourses", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
            }
        });
        setdata(response.data.coursescreated);
        setisLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
    isLoading ? (<Loader />) : (

        <div className='kuhu no-scrollbar'>
            <div className='banner w-full flex  px-24 py-10  bg-cover' style={{ backgroundImage: 'url(https://edtechmagazine.com/higher/sites/edtechmagazine.com.higher/files/styles/cdw_hero/public/articles/%5Bcdw_tech_site%3Afield_site_shortname%5D/202305/GettyImages-597959356.jpg?itok=D69yLV2x)' }}>
                <div className='text px-8 py-6 w-[35vw]  bg-white'>
                    <p className='text-gray-600'>Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!</p>
                    <Button className='mt-10 bg-[#9179F5]'>Get Started</Button>
                </div>

            </div>

            <div className='coursecontainer no-scrollbar w-full min-h-[20rem] p-4 '>
                <div className='mt-12 flex shadow-[0px_16px_48px_0px_rgba(0,0,0,0.176)] gap-48 justify-center p-6 '>
                    <img className='h-48' src="https://s.udemycdn.com/instructor/dashboard/engaging-course-2x.jpg" />
                    <div className='w-[700px] flex flex-col gap-6'>
                        <h2 className='text-[4vh] font-black font-[Poppins] leading-tight'>Create an Engaging Course</h2>
                        <h4>Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.</h4>
                        <Button onClick={() => navigate('/instructor/courseform')} className='bg-[#9179F5] w-max'>Create course</Button>
                    </div>
                </div>

                <div className='mt-12 flex shadow-[0px_16px_48px_0px_rgba(0,0,0,0.176)] p-4 '>
                    <div>
                        <h1 className='px-4 text-[5vh] font-black font-[Poppins] leading-tight'>My Courses</h1>
                        <div className='flex flex-wrap mt-6 gap-2'>
                            {data.reverse().map((item) => {
                                return (
                                    <div key={item._id} >
                                        <InsCourseCard coursetitle={item.courseTitle}
                                            courseDomain={item.courseDomain}
                                            enrolledstudents={item.enrolledStudents.length}
                                            courseDate={item.courseDate.split('T')[0]}
                                            coursevideos={item.courseVideos}
                                            courseid={item._id}
                                            coursedescription={item.courseDescription}
                                            courseposter={item.coursePoster}
                                            courselength={item.courseVideos.length}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
    )
}

export default CoursesList

