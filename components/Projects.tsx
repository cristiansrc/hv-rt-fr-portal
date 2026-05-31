import React, { useState } from "react";
import projectOne from "@/public/images/project-one.png";
import projectTwo from "@/public/images/project-two.png";
import projectThree from "@/public/images/project-three.png";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SectionTitle from "./SectionTitle";
import SectionOverlayText from "./SectionOverlayText";
import { createPortal } from "react-dom";
import projectDetailsOne from "@/public/images/project-details-1.png";
import projectDetailsTwo from "@/public/images/project-details-2.png";
import edumasterBig from "@/public/images/edumaster-big.png";
import techshopBig from "@/public/images/techshop-big.png";
import quickbiteBig from "@/public/images/quickbite-big.png";
const projects = [
  {
    name: "TechShop",
    description: `TechShop is a state-of-the-art e-commerce platform designed to cater to the diverse needs of both businesses and consumers, providing a seamless shopping experience powered by cutting-edge technology and innovative design. The platform's sleek design, characterized by a clean layout and easy navigation, ensures that users can effortlessly browse through products, categories, and deals. TechShop offers a comprehensive product catalog management system, allowing businesses to showcase their products with rich media, detailed descriptions, and customer reviews. The checkout process on TechShop is designed to be smooth and hassle-free, minimizing cart abandonment rates and enhancing customer satisfaction. The platform integrates with multiple payment gateways, offering a variety of payment options, including credit/debit cards, digital wallets, and bank transfers. TechShop leverages advanced data analytics to offer personalized shopping experiences tailored to individual preferences and behaviors. The backend of TechShop is built using modern technologies, ensuring scalability, reliability, and security. The platform is compliant with international data protection regulations, employing industry-standard encryption and security protocols to safeguard user information. Looking ahead, TechShop aims to expand its reach and continue innovating to meet the evolving needs of the e-commerce landscape, with plans to integrate augmented reality for virtual try-ons and expand its global logistics network.`,
    tags: ["design", "frontend", "backend"],
    category: "E-commerce Platform",
    image: projectOne,
    bigImg: techshopBig,
  },
  {
    name: "Edumaster",
    description: `Edumaster is a comprehensive online learning platform that empowers students and educators alike to explore new horizons in education. The platform offers a rich array of courses and educational resources that span multiple disciplines and skill levels. Edumaster's innovative approach to course delivery emphasizes engagement and interactivity, leveraging multimedia elements, including videos, animations, quizzes, and interactive exercises, to create immersive learning experiences. Edumaster offers personalized learning journeys tailored to individual goals, preferences, and learning styles. The platform adapts to the pace and progress of each student, providing targeted recommendations and feedback that support continuous improvement and mastery. The platform also offers a comprehensive suite of features for educators, including course authoring tools, analytics dashboards, and communication channels. Edumaster fosters a vibrant community of learners and educators who collaborate and connect through the platform. Discussion forums, peer reviews, group projects, and live sessions create opportunities for meaningful interaction and knowledge exchange. The platform is optimized for accessibility, offering features such as closed captioning, screen reader compatibility, and multilingual support. Looking to the future, Edumaster is poised to lead the way in shaping the future of education, with plans to incorporate cutting-edge technologies such as virtual reality and artificial intelligence.`,
    tags: ["design", "frontend", "backend"],
    category: "Online Learning Platform",
    image: projectTwo,
    bigImg: edumasterBig,
  },
  {
    name: "QuickBite",
    description: `QuickBite is a groundbreaking mobile app that redefines the food delivery experience, offering users a seamless, user-friendly, and innovative way to satisfy their cravings with just a few taps on their smartphones. The app's intuitive interface allows users to browse a vast selection of restaurants and cuisines, from local favorites to international delicacies. QuickBite offers real-time order tracking, allowing users to monitor the status of their delivery from preparation to arrival. QuickBite has established a highly efficient delivery network, partnering with a wide range of restaurants and local eateries to offer users an extensive selection of options. The app's sophisticated logistics system optimizes delivery routes and dispatches, ensuring that orders are fulfilled promptly and accurately. QuickBite prioritizes user-centric design, making the app accessible and easy to use for everyone. The app's clean and modern interface is complemented by seamless navigation and intuitive controls. To further enhance customer satisfaction and engagement, QuickBite offers a variety of promotions and loyalty programs. Users can take advantage of exclusive discounts, special offers, and rewards that incentivize repeat orders and foster brand loyalty. QuickBite is committed to ensuring the highest standards of quality and sustainability in its operations. The app collaborates with restaurants to ensure that food is delivered fresh and in an eco-friendly manner.`,
    tags: ["ui/ux design", "mobile development"],
    category: "Food Delivery Mobile App",
    image: projectThree,
    bigImg: quickbiteBig,
  },
];

const Projects = () => {
  const [currentProject, setCurrentProject] = useState(projects[0]);
  useGSAP(() => {
    // Verificar que los elementos existan antes de animarlos
    const singleProject = document.querySelector(".single-project");
    const projectList = document.querySelector(".project-list");

    if (singleProject && projectList) {
      gsap.from(".single-project", {
        opacity: 0,
        stagger: 0.2,
        scale: 0,
        force3D: true,
        scrollTrigger: {
          trigger: ".project-list",
          start: "top 60%",
          end: "top 20%",
          invalidateOnRefresh: true,
        },
      });
    }
  });
  return (
    <>
      <section id="projects" className="projects section position-relative">
        <SectionOverlayText text="projects" />
        <SectionTitle subtitle="Some of my most recent projects" title="My Featured Projects" />
        <div className="row pb-60 project-list g-4">
          {projects.map((project) => (
            <div key={project.name} onClick={() => setCurrentProject(project)} className="col-sm-6 col-lg-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <div className="single-project">
                <div className="project-card">
                  <div className="card-inner"></div>
                  <Image src={project.image} className="img-fluid w-100 card-img h-100" alt="" />
                  <div className="card-arrow">
                    <div className="arrow-inner">
                      <i className="ph ph-arrow-up-right"></i>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <h2>{project.name}</h2>
                  <p>{project.category}</p>
                  <div className="tags d-flex align-items-center gap-1">
                    {project.tags.map((tag, i) => (
                      <React.Fragment key={tag}>
                        <span>{tag}</span> {i < project.tags.length - 1 && "-"}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-12">
          <Link href="#how_i_work" className="d-flex gap-4 align-items-center next-chapter">
            <span className="page">07/11</span>
            <span className="next">Next Chapter</span>
            <i className="ph ph-arrow-elbow-right-down"></i>
          </Link>
        </div>
      </section>
      {createPortal(
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-body">
                <button type="button" className="btn-close fs-3" data-bs-dismiss="modal" aria-label="Close">
                  <i className="ph ph-x"></i>
                </button>
                <Image src={currentProject.bigImg} className="w-100 img-fluid project-details-img rounded-3 mb-3 mb-xl-4" alt="" />
                <div className="row gx-4 gy-4 gy-md-0">
                  <div className="col-md-7 col-xl-9">
                    <h1 className="mb-3 fw-semibold" id="project-title">
                      {currentProject.name}
                    </h1>
                    <p className="mb-4 mb-xl-5">Designed and developed a fully functional e-commerce platform for a startup specializing in handcrafted goods. The project involved creating a visually appealing user interface, and ensuring an overall smooth shopping experience.</p>
                    <h2 className="mb-3 fw-semibold">Project Goals</h2>
                    <p className="mb-4">Developed a website for a non-profit organization aimed at raising awareness and funds for environmental conservation. The site features educational content, event management, and donation capabilities.</p>
                    <ul className="list-plus">
                      <li>Create a visually cohesive blog that aligns with the influencer&apos;s personal brand.</li>
                      <li>Implement a secure and reliable payment gateway.</li>
                      <li>Ensure the website is responsive and performs well across all devices.</li>
                      <li>Optimize the site for search engines to increase organic traffic.</li>
                    </ul>
                  </div>
                  <div className="col-md-5 col-xl-3">
                    <div className="right-bar">
                      <div>
                        <p className="mb-1">Client</p>
                        <h6 className="fw-semibold">Mashroom</h6>
                      </div>
                      <div>
                        <p className="mb-1">Category</p>
                        <h6 className="fw-semibold">User Experience</h6>
                      </div>
                      <div>
                        <p className="mb-1">Start Date</p>
                        <h6 className="fw-semibold">02/08/2023</h6>
                      </div>
                      <div>
                        <p className="mb-1">End Date</p>
                        <h6 className="fw-semibold">01/03/2024</h6>
                      </div>
                      <div>
                        <p className="mb-1">Tools</p>
                        <h6 className="fw-semibold">Adobe Xd, Figma</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="fw-medium mb-2">Challenges and Solutions</h3>
                  <p className="mb-4">
                    One of the main challenges was optimizing the website&apos;s load time while maintaining high-quality images of the products. To address this, I implemented lazy loading for images and used optimized image formats, resulting in a faster, smoother browsing experience without
                    compromising visual quality.
                  </p>
                  <div className="row gx-4 gy-4 gy-md-0 mb-4 mb-xl-5 pb-3">
                    <div className="col-md-6">
                      <Image src={projectDetailsOne} className="w-100 img-fluid rounded-3" alt="" />
                    </div>
                    <div className="col-md-6">
                      <Image src={projectDetailsTwo} className="w-100 img-fluid rounded-3" alt="" />
                    </div>
                  </div>
                  <h4 className="mb-3">Key Features:</h4>
                  <p className="mb-4">Developed a website for a non-profit organization aimed at raising awareness and funds for environmental conservation. The site features educational content, event management, and donation capabilities.</p>
                  <ul className="bullet mb-4 pb-3 mb-xl-5">
                    <li>Custom Blog Layouts: Designed multiple blog layouts to cater to different content types, including image-heavy posts and long-form articles.</li>
                    <li>Content Management System: Integrated WordPress for easy content updates and management, allowing the influencer to focus on creating content without technical hurdles.</li>
                    <li>Responsive Design: Ensured the blog is fully responsive, providing a seamless experience on smartphones, tablets, and desktops.</li>
                    <li>SEO and Social Media Integration: Implemented SEO best practices and integrated social media sharing buttons, making it easy for readers to share posts across platforms.</li>
                    <li>Newsletter Signup: Added a newsletter signup form to help the influencer grow their email list and maintain engagement with followers.</li>
                  </ul>
                  <div className="outcome">
                    <h5 className="mb-3">Outcome:</h5>
                    <p>The blog quickly gained traction, attracting a growing audience and enhancing the influencer’s online presence. The user-friendly design and seamless social media integration led to higher engagement rates and increased content sharing.</p>
                  </div>
                  <form className="contact-form full-width">
                    <h3 className="mb-3">Have project in mind? Let&apos;s discuss</h3>
                    <p className="mb-4 mb-xl-5 pb-2">Get in touch with us to see how we can help you with your project</p>
                    <div className="row g-4 g-xl-5">
                      <div className="col-sm-6 contact-input">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="user_name" placeholder="Your name" required />
                      </div>
                      <div className="col-sm-6 contact-input">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="user_email" placeholder="Your e-mail" required />
                      </div>
                      <div className="col-12 contact-input">
                        <label htmlFor="service">Service</label>
                        <input name="service" placeholder="Your Serivice" />
                      </div>
                      <div className="col-12 contact-input">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" placeholder="Your message"></textarea>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="submit-btn position-relative">
                          <div className="waves-top-md">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          submit
                          <div className="waves-bottom-md">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default Projects;
