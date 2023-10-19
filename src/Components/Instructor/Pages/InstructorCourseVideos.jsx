import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../../../index.css'

import toast from 'react-hot-toast'

import Loader from '../../../Loader';
import NewNav from '../NewNav'

import { Button } from "@material-tailwind/react";

import PlayCircleIcon from '@mui/icons-material/PlayCircle';


const CourseVideos = () => {

    const { id } = useParams();

    const [isLoading, setisLoading] = useState(false)
    const [coursedata, setcoursedata] = useState([])

    const sendIDtoserver = async () => {
        let bodyContent = JSON.stringify({ "courseid": id, });

        let response = await fetch(`http://localhost:3000/instructor/course/${id}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
            },
            method: "post",
            body: bodyContent
        });
        let d = await response.json();
        setcoursedata(d)
    }

    useEffect(() => {
        setisLoading(true);
        setTimeout(() => {
            setisLoading(false);
        }, 1200);
        sendIDtoserver();
    }, [])

    return (

        isLoading ? (<Loader />) : (
            <div>
                <NewNav />
                <div className='py-12 px-24'>

                    <div className='flex gap-36'>
                        <div>
                            <div className='flex flex-col w-96'>
                                <h1 className='text-[8vh] font-black font-[Poppins] leading-tight'>{coursedata.courseTitle}</h1>
                                <h3 className='mt-6 text-[2.5vh] text-gray-700'>{coursedata.courseDescription}</h3>
                            </div>

                            <div className='mt-12'>
                                <h3 className='p-4 bg-[#E8EDF4] mb-[4px] text-[3vh] font-bold'>Course Info</h3>
                                <div className='p-4 bg-[#E8EDF4] flex gap-12 mb-[4px]'><h3 className='w-36'>Domain</h3><h3>{coursedata.courseDomain}</h3></div>
                                <div className='p-4 bg-[#E8EDF4] flex gap-12 mb-[4px]'><h3 className='w-36'>Lectures</h3><h3>{coursedata.courseVideos ? coursedata.courseVideos.length : <></>}</h3></div>
                                <div className='p-4 bg-[#E8EDF4] flex gap-12 mb-[4px]'><h3 className='w-36'>Enrolled</h3><h3>{coursedata.enrolledStudents ? coursedata.enrolledStudents.length : <></>}</h3></div>
                                <div className='p-4 bg-[#E8EDF4] flex gap-12 mb-[4px]'><h3 className='w-36'>Started on</h3><h3>23/04/2023</h3></div>
                            </div>
                        </div>

                        <div>
                            <img src={coursedata.coursePoster} className='w-[35vw] h-72' />
                            <h3 className='py-4 mb-[4px] text-[3vh] font-bold'>Lectures</h3>
                            <div className='mt-2'>
                                {coursedata.courseVideos ? (
                                    coursedata.courseVideos.length === 0 ? (
                                        <h3>No lectures uploaded.</h3>
                                    ) : (
                                        coursedata.courseVideos.map((item) => (
                                            <Link to={`/instructor/course/${item.videoCourse}/video/${item._id}`} key={item._id}>
                                                <div className='p-2 mt-4 bg-[#E8EDF4] flex items-center justify-between'>
                                                    <div className='flex gap-6'>
                                                        <PlayCircleIcon className='text-gray' />
                                                        <h3>{item.videotitle}</h3>
                                                    </div>
                                                    <div className='ml-6'>
                                                        <video className="h-24 w-36 relative rounded-lg" src={`${item.videoUrl}`}></video>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    )
                                ) : (
                                    <h3>Loading....</h3>
                                )}

                            </div>
                        </div>
                    </div>

                </div>
            </div >
        )
    )
}

export default CourseVideos