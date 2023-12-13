import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../index.css'
import baseUrl from '../../utils/baseUrl.js'

import { Button } from '@material-tailwind/react'

import InsCourseCard from "./InsCourseCard.jsx"

const CoursesList = () => {

    const navigate = useNavigate()

    const [data, setdata] = useState([]);

    async function fetchData() {
        let response = await baseUrl.get("/instructor/mycourses", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
            }
        });
        setdata(response.data.coursescreated)
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='kuhu p-4 '>
            <div className='banner mt-6 w-full flex  px-24 py-10  bg-cover' style={{ backgroundImage: 'url(https://edtechmagazine.com/higher/sites/edtechmagazine.com.higher/files/styles/cdw_hero/public/articles/%5Bcdw_tech_site%3Afield_site_shortname%5D/202305/GettyImages-597959356.jpg?itok=D69yLV2x)' }}>
                <div className='text px-8 py-6 w-[35vw]  bg-white'>
                    <p className='text-gray-600'>Whether you are teaching for years or teaching for first time you can create an engaging course.We have compiled resourses and best practices to help you to get the next level,no matter where you are starting .</p>
                    <h6 className='mt-10 text-[#9179F5]'>Get Started</h6>
                </div>

            </div>

            <div className='coursecontainer w-full min-h-[20rem] p-4 '>
                <div className='flex justify-between  px-16'>
                    <Button onClick={() => navigate('/instructor/courseform')} className=' z-[99] bg-[#9179F5]'>New course</Button>
                </div>

                <div>
                    <h1 className='px-4 text-[8vh] font-black font-[Poppins] leading-tight'>My Courses</h1>
                    <div className='flex gap-8'>
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
    )
}

export default CoursesList

