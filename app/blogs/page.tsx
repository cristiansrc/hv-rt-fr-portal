"use client";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import fb from "@/public/images/fb.png";
import tt from "@/public/images/tt.png";
import x from "@/public/images/x.png";
import sp from "@/public/images/sp.png";
import hero from "@/public/images/hero.png";
import { blogData } from "@/public/blogdata";
import Link from "next/link";
import { formatString } from "@/utils/formatString";
import { useState } from "react";
import AnimateHeight from "react-animate-height";
const topics = [
  {
    id: 1,
    title: "Fundamentals",
    articles: ["Web dev basics", "Getting Started in web dev", "Key web concepts", "Clean code tips", "First web app guide"],
  },
  {
    id: 2,
    title: "HTML",
    articles: ["Introduction to HTML", "Semantic HTML Guide", "HTML Form Best Practices", "HTML for SEO & Access", "Responsive HTML Layouts"],
  },
  {
    id: 3,
    title: "CSS",
    articles: ["Master CSS Grid", "Responsive Flexbox Tips", "CSS Animations Guide", "Scalable CSS Practices", "Advanced CSS Tricks"],
  },
  {
    id: 4,
    title: "JavaScript",
    articles: ["JavaScript ES6 Features You Should Know", "JavaScript Functions: A Brief Guide", "JavaScript Design Patterns: Writing More Efficient Code", "DOM Manipulation with JavaScript", "Asynchronous JavaScript: Understanding Promises"],
  },
  {
    id: 5,
    title: "Databases",
    articles: ["Basic SQL Queries for Beginners", "NoSQL vs SQL: Key Differences", "Understanding Database Indexing Techniques", "Database Normalization Simplified", "Integrating Databases with Your Web Application"],
  },
  {
    id: 6,
    title: "Deployment",
    articles: ["Deploying Web Applications: A Guide", "Introduction to Continuous Deployment", "Deploying with Git and GitHub", "Best Practices for Secure Deployment", "Automating Deployments with CI/CD"],
  },
];
const AllBlogs = () => {
  const [opened, setOpened] = useState<null | number>(1);
  return (
    <>
      <header className="header-blog">
        <div className="container d-flex flex-wrap gap-4 align-items-center justify-content-between">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
          <Link href="/" className="d-flex align-items-center gap-2">
            <i className="ph ph-arrow-left"></i> Back to Home
          </Link>
        </div>
      </header>

      {/* <!-- main content --> */}
      <main>
        <section id="top" className="hero blog-hero">
          <div className="container">
            <div className="row gx-4 justify-content-center align-items-center">
              <div className="col-12 col-md-6 col-xl-6 hero-content">
                <div>
                  <h1 className="fw-medium mb-4">Hi, i&apos;m Jenny Wilson</h1>
                  <p className="mb-4 mb-xl-5">I&apos;m a Developer in California. I like working on the front-end of the web. This is my site, Portify where I blog, share and write tutorials...</p>
                </div>
                <form className="connect">
                  <input type="text" placeholder="Enter your email address" />
                  <button>Subscribe</button>
                </form>
                <div className="d-flex gap-3 align-items-center">
                  <span className="fw-medium">Follow Me</span>
                  <div className="d-flex gap-3">
                    <a href="#">
                      <Image src={fb} alt="" />
                    </a>
                    <a href="#">
                      <Image src={tt} alt="" />
                    </a>
                    <a href="#">
                      <Image src={x} alt="" />
                    </a>
                    <a href="#">
                      <Image src={sp} alt="" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-5 offset-md-1 offset-xxl-2 col-xl-4 d-flex justify-content-center">
                <div className="img-wrapper">
                  <div className="waves-top">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <Image className="img-fluid rounded-circle hero-img" src={hero} alt="" />
                  <div className="waves-bottom">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Topics --> */}
        <section className="topics">
          <div className="container">
            <h2 className="fw-medium mb-4 mb-xl-5 text-center">Trending Topics</h2>
            <div className="topics-inner">
              <a href="#" className="topic-box">
                <div className="icon">
                  <span>4</span>
                  <i className="ph ph-file-html"></i>
                </div>
                <p>HTML</p>
              </a>
              <a href="#" className="topic-box">
                <div className="icon">
                  <span>1</span>
                  <i className="ph ph-code"></i>
                </div>
                <p>Fundamentals</p>
              </a>
              <a href="#" className="topic-box">
                <div className="icon">
                  <span>7</span>
                  <i className="ph ph-file-css"></i>
                </div>
                <p>CSS</p>
              </a>
              <a href="#" className="topic-box">
                <div className="icon">
                  <span>5</span>
                  <i className="ph ph-stack"></i>
                </div>
                <p>Deployment</p>
              </a>
              <a href="#" className="topic-box">
                <div className="icon">
                  <span>2</span>
                  <i className="ph ph-database"></i>
                </div>
                <p>Databases</p>
              </a>
            </div>
            <div className="row">
              <div className="col-md-4 col-xxl-3">
                <div className="topic-index position-sticky">
                  <h4 className="mb-3 mb-xl-4">Topics Index</h4>
                  <div className="d-flex flex-column gap-3">
                    {topics.map(({ id, articles, title }) => (
                      <div key={id} className="blog-topic">
                        <div onClick={() => setOpened(opened === id ? null : id)} className="title">
                          <span>1</span>
                          <div className="d-flex align-items-center gap-2">
                            <p>{title}</p>
                            <i className="ph ph-arrow-right"></i>
                          </div>
                        </div>
                        <AnimateHeight height={opened == id ? "auto" : 0} key={id}>
                          <div className="list">
                            <div className="list-inner">
                              {articles.map((item) => (
                                <li key={item}>
                                  <a href="#">{item}</a>
                                </li>
                              ))}
                            </div>
                          </div>
                        </AnimateHeight>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-xxl-9 d-flex flex-column gap-4">
                {blogData.map(({ date, desc, id, image, tags, time, title }) => (
                  <Link key={id} href={`/blogs/${formatString(title)}`} className="blog-card">
                    <div className="overflow-hidden rounded-4 img-wrapper">
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
                          <p> {time}</p>
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
            </div>
            <div className="pagination">
              <a href="#">
                <i className="ph ph-caret-left"></i>
              </a>
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">...</a>
              <a href="#">
                <i className="ph ph-caret-right"></i>
              </a>
            </div>
          </div>
        </section>
        {/* <!-- newsletter --> */}
        <section className="newsletter">
          <div className="container">
            <div className="content">
              <h2 className="mb-3 fw-medium">Subscribe our newsletter</h2>
              <p className="mb-4 pb-2">Technology blogging, captivating your audience goes beyond just the written word.</p>
              <form className="mb-3">
                <input type="text" placeholder="Enter your email address" />
                <button>Subscribe</button>
              </form>
              <div>
                <label htmlFor="agree" className="d-flex align-items-center gap-2">
                  <input type="checkbox" id="agree" />
                  <p>
                    I agree with{" "}
                    <a href="#" className="underlined">
                      Privacy Policy
                    </a>{" "}
                    &amp;{" "}
                    <a href="#" className="underlined">
                      Terms
                    </a>
                  </p>
                </label>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="contaner">
          <div className="d-flex justify-content-center gap-3">
            <p>
              Copyright @ <span id="year"></span> Portify
            </p>
            <p>|</p>
            <p>
              Designed By <a href="#">Pixelaxis</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AllBlogs;
