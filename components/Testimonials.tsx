import Image from "next/image";
import React from "react";
import HeroImg from "@/public/images/hero.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SectionTitle from "./SectionTitle";

const Testimonials = () => {
  useGSAP(() => {
    // Verificar que los elementos existan antes de animarlos
    const testimonialsSection = document.querySelector(".testimonials");
    const overlayText = testimonialsSection?.querySelector(".section-title-overlay-text") as HTMLElement;
    const testimonialCard = document.querySelector(".testimonial-card");

    if (overlayText && testimonialsSection) {
      gsap.fromTo(
        overlayText,
        { y: "50%", force3D: true },
        {
          y: "-50%",
          force3D: true,
          scrollTrigger: {
            trigger: ".testimonials",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1, // Optimizar para scroll asíncrono
            refreshPriority: -1, // Prioridad baja para mejor rendimiento
            fastScrollEnd: true, // Optimizar fin de scroll para Firefox
            // Aplicar will-change solo cuando la animación esté activa
            onEnter: () => {
              overlayText.style.willChange = "transform";
            },
            onLeave: () => {
              overlayText.style.willChange = "auto";
            },
            onEnterBack: () => {
              overlayText.style.willChange = "transform";
            },
            onLeaveBack: () => {
              overlayText.style.willChange = "auto";
            },
          },
        },
      );
    }

    if (testimonialCard) {
      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.2,
        force3D: true,
        scrollTrigger: {
          trigger: ".testimonial-card",
          invalidateOnRefresh: true,
        },
      });
    }
  });
  return (
    <section id="testimonials" className="testimonials section position-relative">
      <span className="section-title-overlay-text">TESTIMONIALS</span>
      <SectionTitle subtitle="My Clients and Testimonials" title="My Clients Reviews" />

      <div dir="ltr" className="row pb-120 testimonial px-3">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          scrollbar={{ draggable: true, el: ".s-scrollbar", dragSize: "auto" }}
          navigation={{ nextEl: ".testi-next", prevEl: ".testi-prev" }}
          modules={[Autoplay, Scrollbar, Navigation]}
          breakpoints={{
            1024: {
              slidesPerView: 1.4,
              spaceBetween: 24,
            },
          }}
          className="swiper testimonial-swiper pb-60"
        >
          <SwiperSlide>
            <div className="testimonial-card">
              <div className="img-wrapper">
                <div className="inner">
                  <div className="waves-top-sm">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <Image src={HeroImg} width="82" height="82" alt="" />
                  <div className="waves-bottom-sm">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="content">
                <h3>James Smith</h3>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <p>website owner</p>
                  <p>--</p>
                  <span>www.websites.com</span>
                </div>
                <p className="desc">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-card">
              <div className="img-wrapper">
                <div className="inner">
                  <div className="waves-top-sm">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <Image src={HeroImg} width="82" height="82" alt="" />
                  <div className="waves-bottom-sm">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="content">
                <h3>James Smith</h3>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <p>website owner</p>
                  <p>--</p>
                  <span>www.websites.com</span>
                </div>
                <p className="desc">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-card">
              <div className="img-wrapper">
                <div className="inner">
                  <div className="waves-top-sm">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <Image src={HeroImg} width="82" height="82" alt="" />
                  <div className="waves-bottom-sm">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="content">
                <h3>James Smith</h3>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <p>website owner</p>
                  <p>--</p>
                  <span>www.websites.com</span>
                </div>
                <p className="desc">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-card">
              <div className="img-wrapper">
                <div className="inner">
                  <div className="waves-top-sm">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <Image src={HeroImg} width="82" height="82" alt="" />
                  <div className="waves-bottom-sm">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="content">
                <h3>James Smith</h3>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <p>website owner</p>
                  <p>--</p>
                  <span>www.websites.com</span>
                </div>
                <p className="desc">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="d-flex justify-content-between gap-4 align-items-center">
          <div className="s-scrollbar flex-grow-1"></div>
          <div className="d-flex gap-3">
            <button className="testi-prev">
              <i className="ph ph-arrow-left"></i>
            </button>
            <button className="testi-next">
              <i className="ph ph-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="col-12">
        <Link href="#contact" className="d-flex gap-4 align-items-center next-chapter">
          <span className="page">10/11</span>
          <span className="next">Next Chapter</span>
          <i className="ph ph-arrow-elbow-right-down"></i>
        </Link>
      </div>
    </section>
  );
};

export default Testimonials;
