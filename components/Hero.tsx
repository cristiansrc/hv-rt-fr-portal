import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeroImg from "@/public/images/foto.png";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";
import { useTranslation } from "@/hooks/useTranslation";
import { useResume } from "@/contexts/ResumeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLoading } from "@/contexts/LoadingContext";
import { downloadCurriculumPdf } from "@/api";
import shuffleLetters from "shuffle-letters";
import BinaryRainGame from "@/components/BinaryRainGame";

const Hero = ({ classes }: { classes?: string }) => {
  const { t } = useTranslation();
  const { data, loading: resumeLoading } = useResume();
  const { language } = useLanguage();
  const { setLoading } = useLoading();
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const workButtonRef = useRef<HTMLAnchorElement>(null);
  const contactButtonRef = useRef<HTMLAnchorElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleWorkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lang = language === "es" ? "spanish" : "english";
    try {
      setLoading(true);
      await downloadCurriculumPdf(lang);
    } catch (error) {
      console.error("Error downloading curriculum:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    // Detectar si la pantalla es muy pequeña (menor a 1024x768)
    const isSmallScreen = window.innerWidth < 1024 || window.innerHeight < 768;
    
    // No hacer nada en pantallas pequeñas
    if (isSmallScreen) {
      return;
    }
    
    setClickCount((prev) => {
      const newCount = prev + 1;
      
      // Clear previous timeout
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }

      // Reset counter after 2 seconds of inactivity
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);

      // Open game on third click
      if (newCount === 3) {
        setShowGame(true);
        setClickCount(0);
        console.log("%c💥 SYSTEM BREACH DETECTED!", "color: #ff0055; font-size: 20px; font-weight: bold; font-family: monospace;");
        console.log("%c🎮 Launching Binary Rain Catcher...", "color: #0f0; font-size: 16px; font-family: monospace;");
      }

      return newCount;
    });
  };

  useGSAP(() => {
    // Solo ejecutar animaciones cuando el loading inicial haya terminado
    if (resumeLoading || !data) return;

    // Verificar que los elementos existan antes de animarlos
    const imgWrapper = document.querySelector(".img-wrapper");
    const workBtn = document.querySelector(".work-btn");
    const contactBtn = document.querySelector(".contact-btn");
    const freelancerEl = document.querySelector(".freelancer");

    if (imgWrapper) {
      gsap.from(".img-wrapper", { duration: 1.5, scale: 1.5, ease: "back", delay: 0.3, opacity: 0 });
    }

    if (workBtn) {
      gsap.from(".work-btn", { duration: 1.2, scale: 0, opacity: 0, ease: "bounce" });
    }

    if (contactBtn) {
      gsap.from(".contact-btn", { duration: 1.2, scale: 0, opacity: 0, ease: "bounce" });
    }

    if (freelancerEl) {
      try {
        const freelancer = SplitType.create(".freelancer").chars;
        if (freelancer && freelancer.length > 0) {
          gsap.from(freelancer, { duration: 1.5, rotateX: 180, opacity: 0, ease: "bounce", stagger: 0.05 });
        }
      } catch (error) {
        // Silenciar error si SplitType falla
      }
    }
  }, { dependencies: [resumeLoading, data] });

  // Calculate the full text that should be displayed
  const locationText = data?.basicData?.located 
    ? (language === "es" ? data.basicData.located : data.basicData.locatedEng) 
    : "";
  const basedInText = t("hero.basedIn");
  const fullDescriptionText = basedInText + locationText;

  // Handle description SplitType separately, only when data is ready
  useEffect(() => {
    // Wait for data to be available
    if (!data?.basicData?.located && !data?.basicData?.locatedEng) {
      // If data is not available yet, set the text content directly to ensure it updates when data loads
      if (descriptionRef.current) {
        descriptionRef.current.textContent = basedInText;
      }
      return;
    }
    if (!descriptionRef.current || !fullDescriptionText || fullDescriptionText.trim() === '') return;

    // First, ensure the text is set correctly in the DOM before applying any effects
    if (descriptionRef.current.textContent !== fullDescriptionText) {
      descriptionRef.current.textContent = fullDescriptionText;
    }

    const applySplitType = () => {
      if (!descriptionRef.current) return;

      // First, clean up any existing SplitType instance
      // SplitType adds classes like 'split-line', 'split-char', etc.
      const existingSplit = descriptionRef.current.querySelector('.split-line, .split-char');
      if (existingSplit) {
        // Restore original text by getting all text nodes
        const textContent = descriptionRef.current.textContent || fullDescriptionText;
        descriptionRef.current.textContent = textContent;
      }

      // Ensure the text content matches what we expect
      const expectedText = fullDescriptionText;
      if (descriptionRef.current.textContent !== expectedText) {
        descriptionRef.current.textContent = expectedText;
      }

      // Wait for DOM to be fully updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!descriptionRef.current) return;
          
          // Double-check text is correct before applying SplitType
          if (descriptionRef.current.textContent !== expectedText) {
            descriptionRef.current.textContent = expectedText;
          }
          
          try {
            // Create new SplitType instance
            const desc = SplitType.create(descriptionRef.current).chars;
            gsap.from(desc, { duration: 0.5, rotateY: 180, stagger: 0.05 });
          } catch (error) {
            console.error("Error creating SplitType for description:", error);
          }
        });
      });
    };

    let timer: NodeJS.Timeout;
    let retryCount = 0;
    const maxRetries = 5;

    // Use requestAnimationFrame to ensure DOM is updated
    const rafId = requestAnimationFrame(() => {
      timer = setTimeout(() => {
        try {
          if (!descriptionRef.current) return;

          // Verify the text is actually in the DOM and matches expected
          const currentText = descriptionRef.current.textContent || '';
          if (!currentText || currentText.trim() === '') return;
          
          // Check if text matches expected
          const textMatches = currentText.trim() === fullDescriptionText.trim();
          
          if (!textMatches && retryCount < maxRetries) {
            // Text not ready yet, try again
            retryCount++;
            timer = setTimeout(() => {
              if (descriptionRef.current) {
                const retryText = descriptionRef.current.textContent || '';
                if (retryText.trim() === fullDescriptionText.trim()) {
                  applySplitType();
                } else {
                  // Force update text if it still doesn't match
                  descriptionRef.current.textContent = fullDescriptionText;
                  applySplitType();
                }
              }
            }, 100);
            return;
          }

          applySplitType();
        } catch (error) {
          console.error("Error creating SplitType for description:", error);
        }
      }, 50); // Small delay to ensure React has updated the DOM
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timer) clearTimeout(timer);
      retryCount = 0;
    };
  }, [language, fullDescriptionText, data?.basicData?.located, data?.basicData?.locatedEng]);

  // Aplicar animación shuffleLetters al botón cuando cambie el texto (hover o idioma)
  useEffect(() => {
    if (!workButtonRef.current) return;

    const button = workButtonRef.current;
    const currentText = isHovering 
      ? (language === "es" ? "descargar_hv.json()" : "download_hv.json()")
      : (language === "es" ? "Descargar Hoja de vida" : "Download Resume");

    // Asegurar que el texto esté actualizado
    if (button.textContent !== currentText) {
      button.textContent = currentText;
    }

    // Aplicar animación shuffleLetters con iterations: 10
    try {
      shuffleLetters(button, { iterations: 10 });
    } catch (error) {
      console.error("Error applying shuffleLetters to work button:", error);
    }
  }, [isHovering, language]);

  // Aplicar animación shuffleLetters al botón de contacto cuando cambie el idioma o se cargue
  useEffect(() => {
    if (!contactButtonRef.current || !data?.home) return;

    const button = contactButtonRef.current;
    const currentText = data.home.buttonContactLabel 
      ? (language === "es" ? data.home.buttonContactLabel : data.home.buttonContactLabelEng) 
      : "contact me";

    // Asegurar que el texto esté actualizado
    if (button.textContent !== currentText) {
      button.textContent = currentText;
    }

    // Aplicar animación shuffleLetters con iterations: 10
    try {
      shuffleLetters(button, { iterations: 10 });
    } catch (error) {
      console.error("Error applying shuffleLetters to contact button:", error);
    }
  }, [language, data?.home?.buttonContactLabel, data?.home?.buttonContactLabelEng]);

  return (
    <section id="top" className={`hero ${classes}`}>
      <div className="row gx-4 justify-content-center align-items-center">
        <div className="col-12 col-md-6 col-xl-6 hero-content">
          <div style={{ overflow: "visible" }}>
            <h4 className="text-uppercase freelancer">
              {data?.home?.greeting ? (language === "es" ? data.home.greeting : data.home.greetingEng) : "HI, I AM A FREELANCER"}
            </h4>
            <div style={{ overflow: "visible", width: "100%" }}>
              <Typewriter
                component={"h1"}
                options={{
                  strings: data?.home?.labels?.map(label => language === "es" ? label.name : label.nameEng) || ["Designer", "Developer"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
            <p 
              ref={descriptionRef} 
              key={`description-${language}-${data?.basicData?.located || ''}-${data?.basicData?.locatedEng || ''}`}
              className={`description description-${language}`}
            >
              {t("hero.basedIn")}{data?.basicData?.located ? (language === "es" ? data.basicData.located : data.basicData.locatedEng) : ""}
            </p>
          </div>
          <div className="d-flex gap-4">
            <a 
              ref={workButtonRef}
              href="#" 
              onClick={handleWorkClick}
              className="btn work-btn text-capitalize btn-secondary"
              onMouseEnter={() => {
                // Solo activar hover en dispositivos no táctiles (desktop)
                if (!('ontouchstart' in window)) {
                  setIsHovering(true);
                }
              }}
              onMouseLeave={() => setIsHovering(false)}
              style={{ textAlign: "center" }}
              aria-label={language === "es" ? "Descargar Hoja de vida" : "Download Resume"}
            >
              {isHovering 
                ? (language === "es" ? "descargar_hv.json()" : "download_hv.json()")
                : (language === "es" ? "Descargar Hoja de vida" : "Download Resume")
              }
            </a>
            <Link 
              ref={contactButtonRef}
              href="#contact" 
              className="btn contact-btn text-capitalize btn-outline-secondary"
              style={{ textAlign: "center" }}
              aria-label={data?.home?.buttonContactLabel ? (language === "es" ? data.home.buttonContactLabel : data.home.buttonContactLabelEng) : "contact me"}
            >
              {data?.home?.buttonContactLabel ? (language === "es" ? data.home.buttonContactLabel : data.home.buttonContactLabelEng) : "contact me"}
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-5 offset-md-1 offset-xxl-2 col-xl-4 d-flex justify-content-center">
          <div className="img-wrapper" onClick={handleImageClick} style={{ cursor: "pointer" }}>
            <div className="waves-top">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Image className="img-fluid rounded-circle hero-img" priority={true} src={HeroImg} alt="" />
            <div className="waves-bottom">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="col-12">
          <Link href="#about_me" className="d-flex gap-4 align-items-center next-chapter mt-5">
            <span className="page">01/5</span>
            <span className="next">{t("hero.nextChapter")}</span>
            <span className="icon">
              <i className="ph ph-arrow-elbow-right-down"></i>
            </span>
          </Link>
        </div>
      </div>
      
      {/* Binary Rain Game Modal */}
      <BinaryRainGame isOpen={showGame} onClose={() => setShowGame(false)} language={language} />
    </section>
  );
};

export default Hero;
