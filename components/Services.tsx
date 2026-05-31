import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "./SectionTitle";
import SectionOverlayText from "./SectionOverlayText";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  useGSAP(() => {
    // Verificar que los elementos existan antes de animarlos
    const serviceCard = document.querySelector(".service-card");
    const servicesSection = document.querySelector(".services");

    if (serviceCard && servicesSection) {
      gsap.from(".service-card", {
        stagger: 0.2,
        opacity: 0,
        duration: 1.5,
        force3D: true,
        scrollTrigger: {
          trigger: ".services",
          start: "top 60%",
          end: "top 20%",
          invalidateOnRefresh: true,
        },
      });
    }
  });
  return (
    <section id="services" className="services section position-relative">
      <SectionOverlayText text="my services" />
      <SectionTitle subtitle="How I can help your next project" title="What i do" />
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={24}
        loop={true}
        autoplay={{
          delay: 5000,
        }}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1550: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        dir="ltr"
        className="swiper service-swiper"
      >
        <SwiperSlide className="overflow-visible p-3">
          <div className="service-card">
            <div className="card-inner"></div>
            <div className="content">
              <div className="number-circle">
                <div className="waves-top-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <h2>01</h2>
                <div className="waves-bottom-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <h4>UI/UX Design</h4>
              <ul className="service-list">
                <li>
                  <i className="ph ph-caret-double-right"></i> Landing Pages
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> User Flow
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Wireframing
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Prototyping
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Mobile App Design
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="overflow-visible p-3">
          <div className="service-card">
            <div className="card-inner"></div>
            <div className="content">
              <div className="number-circle">
                <div className="waves-top-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <h2>02</h2>
                <div className="waves-bottom-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <h4>Development</h4>
              <ul className="service-list">
                <li>
                  <i className="ph ph-caret-double-right"></i> Front-End Development
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Back-End Development
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Full-Stack Development
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Database Management
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> API Integration Design
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="overflow-visible p-3">
          <div className="service-card">
            <div className="card-inner"></div>
            <div className="content">
              <div className="number-circle">
                <div className="waves-top-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <h2>03</h2>
                <div className="waves-bottom-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <h4>Illustration</h4>
              <ul className="service-list">
                <li>
                  <i className="ph ph-caret-double-right"></i> Character Design
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Icon Set
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Illustration Guide
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Illustration Set
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Motion Graphic Design
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="overflow-visible p-3">
          <div className="service-card">
            <div className="card-inner"></div>
            <div className="content">
              <div className="number-circle">
                <div className="waves-top-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <h2>04</h2>
                <div className="waves-bottom-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <h4>App Development</h4>
              <ul className="service-list">
                <li>
                  <i className="ph ph-caret-double-right"></i> Android App
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Ios App
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Wireframing
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Prototyping
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> Mobile App Design
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>

        <div className="swiper-pagination"></div>
      </Swiper>
      <div className="col-12">
        <Link href="#attainments" className="d-flex gap-4 align-items-center next-chapter">
          <span className="page">03/11</span>
          <span className="next">Next Chapter</span>

          <i className="ph ph-arrow-elbow-right-down"></i>
        </Link>
      </div>
    </section>
  );
};

export default Services;
