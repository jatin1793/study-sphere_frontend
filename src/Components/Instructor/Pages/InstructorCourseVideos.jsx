import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../../index.css'
import baseUrl from '../../../utils/baseUrl.js';
import toast from 'react-hot-toast'
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../../Loader.jsx';
import NewNav from '../NewNav.jsx'
import { Button } from "@material-tailwind/react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const CourseVideos = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false)
    const [coursedata, setcoursedata] = useState([])
    const [opendeletecourse, setOpendeletecourse] = useState(false);
    const handleOpendeletecourse = () => setOpendeletecourse(!opendeletecourse);
    const [opendeletevideo, setOpendeletevideo] = useState(false);
    const handleOpendeletevideo = () => setOpendeletevideo(!opendeletevideo);
    const sendIDtoserver = async () => {
        setisLoading(true)
        let bodyContent = JSON.stringify({ "courseid": id, });

        let response = await baseUrl.post(`/instructor/course/${id}`, bodyContent, {
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
            },
        });
        setcoursedata(response.data)
        setisLoading(false)
    }

    const deleteCourse = async (courseid) => {
        setisLoading(true)
        const response = await baseUrl.delete(`/instructor/course/deletecourse/${courseid}`, {
            headers: {
                "Content-type": 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
            },
            data: { courseid: id }
        });
        let d = response.data;
        if (d) {
            toast.success("Course Deleted!")
        }
        setisLoading(false);
        sendIDtoserver();
        navigate(`/instructor/home`);
    }

    const deleteVideo = async (id) => {
        setisLoading(true)
        const response = await baseUrl.delete(`/instructor/deletevideo/${id}`, {
            headers: {
                "Content-type": 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
            },
            data: { courseid: id }
        });
        let d = response.data;
        if (d) {
            toast.success("Video Deleted!")
        }
        setisLoading(false);
        sendIDtoserver();
    }

    useEffect(() => {
        sendIDtoserver();
    }, [])

    return (

        isLoading ? (<Loader />) : (
            <div className='h-full w-full overflow-hidden'>
                <NewNav />
                <div className='kuhu py-12 px-24'>

                    <div className='flex gap-36'>
                        <div>
                            <div className='flex flex-col w-96'>
                                <h1 className='text-[8vh] font-black font-[Poppins] leading-tight'>{coursedata.courseTitle}</h1>
                                <h3 className='mt-6 text-[2.5vh] text-gray-700'>{coursedata.courseDescription}</h3>
                            </div>
                            <Button className='mt-4 z-1' onClick={handleOpendeletecourse}>Delete Course</Button>
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
                            <div className='flex justify-between mt-6'>
                                <h3 className='py-4 mb-[4px] text-[3vh] font-bold'>Lectures</h3>
                                <Link to={`/instructor/course/videoform/${coursedata._id}`}>
                                    <Button color='blue' className='h-12'>Add New video</Button>
                                </Link>
                            </div>
                            <div className='mt-2'>
                                {coursedata.courseVideos ? (
                                    coursedata.courseVideos.length === 0 ? (
                                        <h3>No lectures uploaded.</h3>
                                    ) : (
                                        coursedata.courseVideos.map((item) => (
                                            <div className='p-2 mt-4 bg-[#E8EDF4] flex items-center justify-between' key={item._id}>
                                                <Link to={`/instructor/course/${item.videoCourse}/video/${item._id}`} >
                                                    <div className='p-2 mt-4 bg-[#E8EDF4] flex items-center justify-between'>
                                                        <div className='flex gap-4'>
                                                            <PlayCircleIcon className='text-gray' />
                                                            <h3>{item.videotitle}</h3>
                                                        </div>
                                                        <div className='ml-24'>
                                                            <video className="h-24 w-36 relative rounded-lg" src={`${item.videoUrl}`}></video>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <DeleteIcon className='cursor-pointer' onClick={handleOpendeletevideo} />
                                                <Dialog open={opendeletevideo} handler={handleOpendeletevideo}>
                                                    <DialogBody>
                                                        Are you sure you want to delete this lecture of this course ??
                                                    </DialogBody>
                                                    <DialogFooter>
                                                        <Button
                                                            variant="text"
                                                            color="red"
                                                            onClick={handleOpendeletevideo}
                                                            className="mr-1"
                                                        >
                                                            <span>Cancel</span>
                                                        </Button>
                                                        <Button variant="gradient" color="green" onClick={handleOpendeletevideo}>
                                                            <span onClick={() => deleteVideo(item._id)}>Confirm</span>
                                                        </Button>
                                                    </DialogFooter>
                                                </Dialog>
                                            </div>
                                        ))
                                    )
                                ) : (
                                    <h3>Loading....</h3>
                                )}

                            </div>
                        </div>
                    </div>

                </div>
                                    
                <Dialog open={opendeletecourse} handler={handleOpendeletecourse}>
                    <DialogBody>
                        Are you sure you want to delete the course ?? All the lectures of this course will be deleted .
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpendeletecourse}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={handleOpendeletecourse}>
                            <span onClick={() => deleteCourse(coursedata._id)}>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>


            </div >
        )
    )
}

export default CourseVideos