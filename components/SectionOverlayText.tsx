import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SectionOverlayText = ({ text }: { text: string }) => {
  const sectionTitleRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const element = sectionTitleRef.current;
    const triggerElement = document.querySelector(".about");

    // Verificar que los elementos existan antes de animar
    if (!element || !triggerElement) return;

    const anim = gsap.fromTo(
      element,
      { y: "50%", force3D: true },
      {
        y: "-50%",
        force3D: true,
        scrollTrigger: {
          trigger: ".about",
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Usar scrub suave para mejor rendimiento
          invalidateOnRefresh: true,
          anticipatePin: 1, // Optimizar para scroll asíncrono
          refreshPriority: -1, // Prioridad baja para mejor rendimiento
          fastScrollEnd: true, // Optimizar fin de scroll para Firefox
          // Aplicar will-change solo cuando la animación esté activa
          onEnter: () => {
            if (element) {
              element.style.willChange = "transform";
            }
          },
          onLeave: () => {
            if (element) {
              element.style.willChange = "auto";
            }
          },
          onEnterBack: () => {
            if (element) {
              element.style.willChange = "transform";
            }
          },
          onLeaveBack: () => {
            if (element) {
              element.style.willChange = "auto";
            }
          },
        },
      },
    );

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Clean up all ScrollTriggers
    };
  });

  return (
    <span ref={sectionTitleRef} className="section-title-overlay-text">
      {text}
    </span>
  );
};

export default SectionOverlayText;
