import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import '../../../index.css'

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
        let bodyContent = JSON.stringify({ "videoid": videoid, });

        let response = await fetch(`https://study-sphere-backend.onrender.com/instructor/video/${videoid}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('instructor_token'))}`
            },
            method: "post",
            body: bodyContent
        });
        let d = await response.json();
        setvideodetails(d);
    }

    useEffect(() => {
        setisLoading(true);
        setTimeout(() => {
            setisLoading(false);
        }, 500);
        sendIDtoserver();
    }, []);


    return (
        isLoading ? (<Loader />) : (

            <div className=''>
                <NewNav />
                <div className='px-8 py-6 flex'>
                    <div className='mt-[72px] w-[60vw] h-[60vh]'>
                        <MediaPlayer
                            autoplay
                            title={videodetails.videotitle}
                            src={`${videodetails.videoUrl}`}
                            aspectRatio={16 / 9}
                        >
                            <MediaOutlet />
                            <MediaCommunitySkin />
                        </MediaPlayer>

                        <div className='px-2 py-4 flex flex-col gap-4'>
                            <h3 className='text-[4vh] font-bold'>{videodetails.videotitle}</h3>
                            <div className='flex justify-between  items-center'>
                                <div className='flex gap-6 items-center jusify-center border rounded min-w-[21rem] px-4 py-2 border-black'>
                                    <Avatar size='sm' src={`${videodetails.instructor ? videodetails.instructor.profileimg : <></>}`} alt="avatar" />
                                    <div><h6>{videodetails.instructor ? videodetails.instructor.name : <></>}</h6><small>followers</small></div>
                                </div>
                                <h6>Likes</h6>
                            </div>
                            <p>Description</p>
                            <p>{videodetails.videodescription}</p>
                        </div>
                    </div>

                    <div className='courseVideos mt-[72px] rounded border-2 border-zinc-950 px-6 py-4  w-[40vw] max-h-[100vh] ml-4'>
                        <h6>{videodetails.videoCourse ? videodetails.videoCourse.courseTitle : <></>}</h6>

                        <div>
                            {videodetails.videoCourse ? videodetails.videoCourse.courseVideos.map((item) => {
                                return (
                                    <a href={`/instructor/course/${item.videoCourse}/video/${item._id}`} key={item._id} >
                                        <div className='p-4 bg-[#E8EDF4] flex gap-12 mb-[4px]'>
                                            <PlayCircleIcon className='text-gray' />
                                            <h3>{item.videotitle}</h3>
                                        </div>
                                    </a>
                                )
                            }) : <></>}
                        </div>
                    </div>
                </div>

            </div>
        )
    )
}

export default Instructorvideoplayer