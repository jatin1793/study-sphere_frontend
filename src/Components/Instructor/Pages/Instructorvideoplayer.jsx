import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import '../../../index.css'
import baseUrl from '../../../utils/baseUrl.js';
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster } from '@vidstack/react';

import NewNav from '../NewNav.jsx'
import Loader from '../../../Loader.jsx';

import { Avatar } from "@material-tailwind/react";

import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const Instructorvideoplayer = () => {

    const { courseid, videoid } = useParams();

    const [isLoading, setisLoading] = useState(false)
    const [videodetails, setvideodetails] = useState({})

    const sendIDtoserver = async () => {
        setisLoading(true)
        let bodyContent = JSON.stringify({ "videoid": videoid, });

        let response = await baseUrl.post(`/instructor/video/${videoid}`, bodyContent, {
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
            },
        });
        setvideodetails(response.data);
        setisLoading(false)
    }

    useEffect(() => {
        sendIDtoserver();
    }, []);


    return (
        isLoading ? (<Loader />) : (

            <div className=''>
                <NewNav />
                <div className='px-8 py-6 flex kuhu'>

                    <div className='w-[60vw] h-[60vh]'>
                        <MediaPlayer
                            autoplay
                            title={videodetails.videotitle}
                            src={`${videodetails.videoUrl}`}
                            aspectRatio={16 / 9}
                            crossorigin=""
                        >
                            <MediaOutlet />
                            <MediaCommunitySkin />
                        </MediaPlayer>

                        <div className='px-2 py-4 flex flex-col gap-2'>
                            <h3 className='text-[4vh] font-bold'>{videodetails.videotitle}</h3>
                            <div className='flex justify-between  items-center'>
                                <div className='bg-[#E8EDF4] flex justify-between items-center w-[60vw] rounded-lg px-4 py-2'>
                                    <div className='flex gap-6 items-center jusify-center'>
                                        <Avatar size='lg' src={`${videodetails.instructor ? videodetails.instructor.profileimg : <></>}`} alt="avatar" />
                                        <div><h6>{videodetails.instructor ? videodetails.instructor.name : <></>}</h6><small>{videodetails.instructor ? videodetails.instructor.followers.length : <></>} followers</small></div>
                                    </div>
                                    <div className='flex gap-2 p-2 border border-solid border-[black] rounded-3xl'>
                                        <h3>{videodetails.videoLikes ? videodetails.videoLikes.length : <></>} likes</h3>
                                    </div>
                                </div>

                            </div>
                            <div className='p-4 mt-4 bg-[#E8EDF4] rounded-lg'>
                                <p>{videodetails.videodescription}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-6'>
                        <div className='px-6 py-4 rounded border-2 border-zinc-950 w-[30vw] h-max ml-4'>
                            <h4 className='text-2xl font-bold'>{videodetails.videoCourse ? videodetails.videoCourse.courseTitle : <></>}</h4>
                            <div className='flex py-2'>
                                <span className='text-gray-800'>{videodetails.instructor ? videodetails.instructor.name : <></>}</span>
                                <span className='text-gray-800 ml-6'>{videodetails.videoCourse ? videodetails.videoCourse.courseVideos.length : <></>}</span>
                                <span className='text-gray-800 ml-2'> lectures</span>
                            </div>
                            <div className=''>
                                {videodetails.videoCourse ? videodetails.videoCourse.courseVideos.map((item) => {
                                    return (
                                        <a href={`/student/course/${item.videoCourse}/video/${item._id}`} key={item._id} >
                                            <div className='px-2 mt-4 bg-[#E8EDF4] flex'>
                                                <div className='w-36 p-2'>
                                                    <video className="" src={item.videoUrl}></video>
                                                </div>
                                                <div className='flex gap-6 mr-2 py-2 px-4'>
                                                    <h3 className='text-[3vh] text-black'>{item.videotitle}</h3>
                                                </div>

                                            </div>
                                        </a>
                                    )
                                }) : <></>}

                            </div>
                        </div>



                    </div>

                </div>

            </div>
        )
    )
}

export default Instructorvideoplayer