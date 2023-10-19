import React from "react";
import './index.css'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from '../src/images/logo.png'

const Footer = () => {
  return (
    <div>
      <div className="w-full h-[70vh] bg-[gray] p-8">
        <div className="text-white">
          <img
            src={logo}
            className="h-10 mb-4"
          />
          <h3 className="mb-6">Learn in-demand tech skills in half the time</h3>
          <hr />

          <div className="w-full mt-6 flex mb-6 border-b-[0.5px] border-b-[white] border-solid pb-6">
            <div className="w-1/4 flex flex-col gap-2 ">
              <h3 className="text-[bold] tracking-[2px]">RESOURCES</h3>
              <h3 className="">Blog</h3>
              <h3 className="">Sessions</h3>
              <h3 className="">Answers</h3>
            </div>

            <div className="w-1/4 flex flex-col gap-2 ">
              <h3 className="text-[bold] tracking-[2px]">ABOUT US</h3>
              <h3 className="">Our Team</h3>
              <h3 className="">Contact us</h3>
              <h3 className="">Careers</h3>
              <h3 className="">Frequently Asked Questions</h3>
              <h3 className="">Press</h3>
            </div>

            <div className="w-1/4 flex flex-col gap-4 ">
              <h3 className="text-[bold] tracking-[2px]">PRICING</h3>
              <h3 className="">For Individuals</h3>
              <h3 className="">Free Trial</h3>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-6">
              <FacebookOutlinedIcon />
              <LinkedInIcon />
              <InstagramIcon />
              <TwitterIcon />
              <YouTubeIcon />
            </div>
            <h5 className="text-[2vh]">
              Copyright ©2023 Educative, Inc. All rights reserved.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
