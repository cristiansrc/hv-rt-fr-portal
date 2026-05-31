import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type Props = {
  subtitle: string;
  title: string;
};

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ title, subtitle }: Props) => {
  const sectionTitleRef = useRef(null);

  useGSAP(() => {
    const element = sectionTitleRef.current;
    if (!element) return;

    const fromAnimation = gsap.from(element, {
      opacity: 0,
      y: 50,
      force3D: true,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        invalidateOnRefresh: true,
      },
    });

    const toAnimation = gsap.to(element, {
      "--height": "100%",
      delay: 0.5,
      force3D: true,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        invalidateOnRefresh: true,
      },
    });

    return () => {
      fromAnimation.kill();
      toAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Clean up all ScrollTriggers
    };
  });

  return (
    <div ref={sectionTitleRef} className="section-title text-capitalize">
      <h4>{subtitle}</h4>
      <h2>{title}</h2>
    </div>
  );
};

export default SectionTitle;
