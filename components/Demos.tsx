"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import clean from "@/public/images/versions/clean-bg.png";
import dotsBg from "@/public/images/versions/dots-bg.png";
import gradientBg from "@/public/images/versions/gradiant-bg.png";
import leftBar from "@/public/images/versions/left-bar.png";
import shapeBg from "@/public/images/versions/shape-bg.png";
import snowfallBg from "@/public/images/versions/snowfall-bg.png";
import stickyMenu from "@/public/images/versions/sticky-menu.png";
import topBar from "@/public/images/versions/top-bar.png";
import triangleBg from "@/public/images/versions/traingle-bg.png";
import videoBg from "@/public/images/versions/video-bg.png";
const Demos = () => {
  const [opened, setOpened] = useState(false);
  return (
    <OutsideClickHandler onOutsideClick={() => setOpened(false)}>
      <div className={`demos ${opened && "opened"}`}>
        <div className="d-flex align-items-center">
          <button onClick={() => setOpened(!opened)} className="demo-btn">
            Demos
          </button>
          <div className="demo-list">
            <div className="d-flex justify-content-between gap-2 align-items-center">
              <h3> Bg & Menu Styles</h3>
              <button className="bg-transparent border-0 d-flex align-items-center justify-content-center fs-4" onClick={() => setOpened(false)}>
                <i className="ph ph-x"></i>
              </button>
            </div>
            <Link onClick={() => setOpened(false)} href="/" className="col">
              <Image src={clean} alt="" />
              <p>Clean Background</p>
            </Link>
            <Link onClick={() => setOpened(false)} href="/bg-dots" className="col">
              <Image src={dotsBg} alt="" />
              <p>Dots Background</p>
            </Link>
            <Link onClick={() => setOpened(false)} href="/bg-gradiant" className="col">
              <Image src={gradientBg} alt="" />
              <p>Gradient Background</p>
            </Link>
            <Link onClick={() => setOpened(false)} href="/bg-shape" className="col">
              <Image src={shapeBg} alt="" />
              <p>Shape Background</p>
            </Link>
            <Link onClick={() => setOpened(false)} href="/bg-snow" className="col">
              <Image src={snowfallBg} alt="" />
              <p>Snowfall Background</p>
            </Link>
            <Link onClick={() => setOpened(false)} href="/bg-triangle" className="col">
              <Image src={triangleBg} alt="" />
              <p>Triangle Background</p>
            </Link>
            <Link onClick={() => setOpened(false)} href="/bg-video" className="col">
              <Image src={videoBg} alt="" />
              <p>Video Background</p>
            </Link>
            <Link onClick={() => setOpened(false)} href="/sticky-menu" className="col">
              <Image src={stickyMenu} alt="" />
              <p>Sticky Menu</p>
            </Link>
            <Link onClick={() => setOpened(false)} href="/top-bar" className="col">
              <Image src={topBar} alt="" />
              <p>Top Bar Menu</p>
            </Link>
            <Link onClick={() => setOpened(false)} href="/left-bar" className="col">
              <Image src={leftBar} alt="" />
              <p>Left Bar Menu</p>
            </Link>
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Demos;
