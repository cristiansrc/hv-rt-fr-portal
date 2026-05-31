import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SectionTitle from "./SectionTitle";
const HowIWork = () => {
  useGSAP(() => {
    // Verificar que los elementos existan antes de animarlos
    const howIWorkSection = document.querySelector(".how-i-work");
    const overlayText = howIWorkSection?.querySelector(".section-title-overlay-text") as HTMLElement;
    const moreInfo = document.querySelector(".more-info");
    const process = document.querySelector(".process");
    const processList = document.querySelector(".process-list");

    if (overlayText && howIWorkSection) {
      gsap.fromTo(
        overlayText,
        { y: "50%", force3D: true },
        {
          y: "-50%",
          force3D: true,
          scrollTrigger: {
            trigger: ".how-i-work",
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

    if (moreInfo) {
      gsap.from(".more-info", {
        scale: 0,
        duration: 1.2,
        ease: "elastic",
        delay: 0.5,
        force3D: true,
        scrollTrigger: {
          trigger: ".more-info",
          invalidateOnRefresh: true,
        },
      });
    }

    if (process && processList) {
      gsap.from(".process", {
        stagger: 0.15,
        scale: 0,
        duration: 2.8,
        ease: "elastic",
        force3D: true,
        scrollTrigger: {
          trigger: ".process-list",
          start: "top 60%",
          end: "top 20%",
          invalidateOnRefresh: true,
        },
      });
    }
  });
  return (
    <section id="how_i_work" className="how-i-work section position-relative">
      <span className="section-title-overlay-text">How i Work</span>
      <SectionTitle subtitle="How I Work" title="My Working Process" />

      <div className="row pb-60 px-4 process-list justify-content-center">
        <div className="process col-6">
          <span className="circle position-absolute w-100 h-100"></span>
          <div>
            <p>01.</p>
            <p>idea</p>
          </div>
        </div>
        <div className="process col-6">
          <span className="circle-even position-absolute w-100 h-100"></span>
          <div>
            <p>02.</p>
            <p>sketch</p>
          </div>
        </div>
        <div className="process col-6">
          <span className="circle position-absolute w-100 h-100"></span>
          <div>
            <p>03.</p>
            <p>design</p>
          </div>
        </div>
        <div className="process col-6">
          <span className="circle-even position-absolute w-100 h-100"></span>
          <div>
            <p>04.</p>
            <p>develop</p>
          </div>
        </div>
        <div className="process col-6">
          <span className="circle position-absolute w-100 h-100"></span>
          <div>
            <p>05.</p>
            <p>text</p>
          </div>
        </div>
        <div className="process col-6">
          <span className="circle-even position-absolute w-100 h-100"></span>
          <div>
            <p>06.</p>
            <p>launch</p>
          </div>
        </div>
      </div>
      <div className="more-info d-flex flex-wrap align-items-center gap-5 gap-md-3">
        <p>Need More info? Please Get in touch</p>
        <span className="line"></span>
        <Link href="#contact" className="arrow-down position-relative">
          <div className="waves-top-md">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <svg width="45" height="54" viewBox="0 0 45 54" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <Link href="#testimonials" className="d-flex gap-4 align-items-center next-chapter">
          <span className="page">08/11</span>
          <span className="next">Next Chapter</span>
          <i className="ph ph-arrow-elbow-right-down"></i>
        </Link>
      </div>
    </section>
  );
};

export default HowIWork;
