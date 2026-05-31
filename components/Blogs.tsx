import React from "react";
import blog1 from "@/public/images/blog-1.png";
import blog2 from "@/public/images/blog-2.png";
import Image from "next/image";
import Link from "next/link";
import { formatString } from "@/utils/formatString";
import { blogData } from "@/public/blogdata";
const Blogs = () => {
  return (
    <section id="blogs" className="section blogs position-relative">
      <span className="section-title-overlay-text">My Blogs</span>
      <div className="section-title text-capitalize">
        <h4>Explore My Blog</h4>
        <h2>Latest Articles</h2>
      </div>
      <div className="pb-60 d-flex flex-column gap-4">
        {blogData.slice(0, 2).map(({ date, desc, id, image, tags, time, title }) => (
          <Link key={id} href={`/blogs/${formatString(title)}`} className="blog-card">
            <div className="rounded-4 overflow-hidden img-wrapper">
              <Image src={image} className="img-fluid" alt="" />
            </div>
            <div>
              <h4 className="fw-medium mb-3">{title}</h4>
              <div className="d-flex align-items-center gap-4 flex-wrap mb-3">
                <div className="d-flex gap-2 align-items-center fs-5">
                  <i className="ph ph-calendar"></i>
                  <p>{date}</p>
                </div>
                --
                <div className="d-flex gap-2 align-items-center fs-5">
                  <i className="ph ph-clock"></i>
                  <p>{time}</p>
                </div>
              </div>
              <p className="details">{desc}</p>
              <div className="d-flex align-items-center gap-3">
                {tags.map((tag) => (
                  <div key={tag} className="d-flex align-items-center gap-2">
                    <span className="fs-3">•</span>
                    <p>{tag}</p>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="more-info d-flex flex-wrap align-items-center gap-5 gap-md-3">
        <Link href="/blogs" className="fs-5 fw-medium">
          View All Articles
        </Link>
        <span className="line"></span>
        <Link href="/blogs" className="arrow-down position-relative">
          <div className="waves-top-md">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <svg width="45" height="54" viewBox="0 0 45 54" className="rotate-90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 31.449L22.5 52.949L1 31.449L8.98204 23.3382L16.8353 31.449V0.550781H28.1647V31.449L36.018 23.3382L44 31.449Z" stroke="currentColor" />
          </svg>
          <div className="waves-bottom-md">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Link>
      </div>
      <div className="col-12">
        <a href="#testimonials" className="d-flex gap-4 align-items-center next-chapter">
          <span className="page">09/11</span>
          <span className="next">Next Chapter</span>
          <i className="ph ph-arrow-elbow-right-down"></i>
        </a>
      </div>
    </section>
  );
};

export default Blogs;
