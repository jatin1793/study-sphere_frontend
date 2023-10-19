import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../index.css'

import { Button } from '@material-tailwind/react'

import CollapseCard from './CollapseCard.jsx'

const CoursesList = () => {

    const navigate = useNavigate()

    const [data, setdata] = useState([]);

    async function fetchData() {
        let response = await fetch("https://study-sphere-backend.onrender.com/instructor/mycourses", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
            }
        });
        response = await response.json();
        setdata(response.coursescreated)
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='kuhu p-4'>
            <div className='banner mt-20 w-full flex bg-red-500 px-24 py-10'>
                <img className='h-full w-[18rem] object-cover object-center mr-20' src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg" />
                <div className='text p-4'>
                    <p>Whether you are teaching for years or teaching for first time you can create an ingaging course.We have compiled resourses</p>
                    <h6 className='mt-20'>Get Started</h6>
                </div>
            </div>

            <div className='coursecontainer w-full min-h-[20rem] p-4 '>
                <div className='flex justify-between  px-16'>
                    <Button onClick={() => navigate('/instructor/courseform')} className=' z-[99]'>New course</Button>
                </div>

                {data.reverse().map((item) => {
                    return (
                        <div key={item._id} className='mt-4 flex flex-col w-full items-center justify-center p-2 gap-6 z-50'>
                            <CollapseCard coursetitle={item.courseTitle}
                                courseDomain={item.courseDomain}
                                enrolledstudents={item.enrolledstudents}
                                courseDate={item.courseDate.split('T')[0]}
                                coursevideos={item.courseVideos}
                                courseid={item._id}
                                coursedescription={item.courseDescription}
                                courseposter={item.coursePoster}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CoursesList

