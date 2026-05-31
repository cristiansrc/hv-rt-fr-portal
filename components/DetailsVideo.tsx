"use client";
import Image from "next/image";
import React, { useState } from "react";
import blogVideo from "@/public/images/blog-video.png";
import youtube from "@/public/images/youtube.png";
import ModalVideo from "react-modal-video";
const DetailsVideo = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="mb-4 mb-xl-5 position-relative blog-video">
        <Image src={blogVideo} className="w-100 img-fluid rounded-3" alt="" />
        <span onClick={() => setOpen(true)} className="youtube">
          <Image src={youtube} alt="" />
        </span>
      </div>
      <ModalVideo channel="youtube" youtube={{ mute: 0, autoplay: 0 }} isOpen={isOpen} videoId="dImgZ_AH7uA" onClose={() => setOpen(false)} />
    </>
  );
};

export default DetailsVideo;
