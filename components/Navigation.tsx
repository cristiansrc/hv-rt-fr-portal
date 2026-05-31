import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import shuffleLetters from "shuffle-letters";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useResume } from "@/contexts/ResumeContext";
import { useLoading } from "@/contexts/LoadingContext";
import { downloadCurriculumPdf } from "@/api";
import ProtectedEmail from "@/components/ProtectedEmail";

const Navigation = ({ setNavOpen, navOpen }: { setNavOpen: Dispatch<SetStateAction<boolean>>; navOpen: boolean }) => {
  const navRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { data } = useResume();
  const { setLoading } = useLoading();
  const [menuHovered, setMenuHovered] = useState(false);

  const handleLanguageSwitch = (e: React.MouseEvent) => {
    e.preventDefault();
    setLanguage(language === "en" ? "es" : "en");
    setNavOpen(false);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setNavOpen(false);
    
    const element = document.getElementById(targetId);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200; // Duración en milisegundos (1.2 segundos)
      let start: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  const handleResumeDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    const lang = language === "es" ? "spanish" : "english";
    try {
      setLoading(true);
      await downloadCurriculumPdf(lang);
    } catch (error) {
      console.error("Error downloading resume:", error);
    } finally {
      setLoading(false);
      setNavOpen(false);
    }
  };

  // Build LinkedIn URL with locale parameter for English
  const getLinkedInUrl = (): string => {
    if (!data?.basicData?.linkedin) return "";
    
    let baseUrl = data.basicData.linkedin.trim();
    
    if (language === "en") {
      // Remove existing locale parameter if present
      baseUrl = baseUrl.replace(/[?&]locale=[^&]*/g, "");
      // Clean up trailing ? or /? if they exist
      baseUrl = baseUrl.replace(/[\/\?]+$/, "");
      
      // Add locale parameter
      // Check if URL already has query parameters
      if (baseUrl.includes("?")) {
        return `${baseUrl}&locale=en_US`;
      } else {
        return `${baseUrl}/?locale=en_US`;
      }
    } else {
      // Remove locale parameter for Spanish
      baseUrl = baseUrl.replace(/[?&]locale=[^&]*/g, "");
      // Clean up trailing ? or /? if they exist
      baseUrl = baseUrl.replace(/[\/\?]+$/, "");
      return baseUrl;
    }
  };

  useEffect(() => {
    const activeTimeouts = new Map<HTMLElement, NodeJS.Timeout>();
    
    // Mapeo de los elementos a sus claves de traducción
    const getTranslationKey = (textElement: HTMLElement): string | null => {
      const linkElement = textElement.closest('.nav-link');
      if (!linkElement) return null;
      
      const text = textElement.textContent?.trim();
      
      // Identificar por el contenido del span numérico hermano
      const numberSpan = linkElement.querySelector('span:first-child');
      const number = numberSpan?.textContent?.trim();
      
      switch(number) {
        case '01': return 'navigation.top';
        case '02': return 'navigation.aboutMe';
        case '03': return 'navigation.skills';
        case '04': return 'navigation.experiences';
        case '05': return 'navigation.contact';
        case '06': return 'navigation.resume';
        case '07': return 'navigation.linkedin';
        case '08': return 'navigation.github';
        case '09': return 'navigation.switchLanguage';
        default: return null;
      }
    };
    
    const handleClassChange = (mutationsList: MutationRecord[]) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const target = mutation.target as HTMLElement;
          const textElement = target.querySelector(".text") as HTMLElement;
          
          if (target.classList.contains("active") && textElement) {
            // Limpiar timeout anterior si existe
            const existingTimeout = activeTimeouts.get(textElement);
            if (existingTimeout) {
              clearTimeout(existingTimeout);
              activeTimeouts.delete(textElement);
            }
            
            // Obtener la clave de traducción para este elemento
            const translationKey = getTranslationKey(textElement);
            
            // Aplicar shuffleLetters
            shuffleLetters(textElement, { iterations: 5 });
            
            // Restaurar el texto traducido correcto después de la animación
            const restoreTimeout = setTimeout(() => {
              if (textElement && translationKey) {
                // Obtener el texto traducido actual directamente
                textElement.textContent = t(translationKey as any);
              }
              activeTimeouts.delete(textElement);
            }, 1000);
            
            activeTimeouts.set(textElement, restoreTimeout);
          }
        }
      });
    };

    const observer = new MutationObserver(handleClassChange);
    const config = { attributes: true, subtree: true, attributeFilter: ["class"] };

    if (navRef.current) {
      observer.observe(navRef.current, config);
    }

    return () => {
      observer.disconnect();
      // Limpiar todos los timeouts pendientes y restaurar textos correctos
      activeTimeouts.forEach((timeout, textElement) => {
        clearTimeout(timeout);
        const translationKey = getTranslationKey(textElement);
        if (translationKey) {
          textElement.textContent = t(translationKey as any);
        }
      });
      activeTimeouts.clear();
    };
  }, [language, t]);

  useGSAP(() => {
    gsap.to(".navigation", { "--height": "100%", duration: 1, ease: "power1.inOut" });
    gsap.from(".nav-link", { duration: 0.8, delay: 0.5, opacity: 0, stagger: 0.1 });
  });

  // Store the time when the component mounts to calculate relative delays
  const mountTimeRef = useRef<number>(Date.now());
  
  // Animate LinkedIn and GitHub links when they appear (after data loads)
  // They should appear after "Hoja de vida" (06), so LinkedIn (07) and GitHub (08)
  // The initial animation starts with delay 0.5s and stagger 0.1s per item
  useEffect(() => {
    if (data?.basicData?.linkedin || data?.basicData?.github) {
      // Wait a bit for DOM to update
      const timer = setTimeout(() => {
        const linkedInLink = navRef.current?.querySelector('[data-social="linkedin"]') as HTMLElement;
        const githubLink = navRef.current?.querySelector('[data-social="github"]') as HTMLElement;
        
        // Calculate the correct delay based on position in the menu
        // Initial delay: 0.5s, stagger: 0.1s per item
        // "Hoja de vida" is 06, so it appears at 0.5 + (5 * 0.1) = 1.0s (0-indexed: position 5)
        // LinkedIn is 07, so it should appear at 0.5 + (6 * 0.1) = 1.1s (0-indexed: position 6)
        // GitHub is 08, so it should appear at 0.5 + (7 * 0.1) = 1.2s (0-indexed: position 7)
        
        const initialDelay = 0.5;
        const staggerDelay = 0.1;
        const linkedInPosition = 6; // 0-indexed position (7th item)
        const githubPosition = 7; // 0-indexed position (8th item)
        
        // Calculate when these should appear relative to component mount
        const linkedInTargetTime = initialDelay + (linkedInPosition * staggerDelay);
        const githubTargetTime = initialDelay + (githubPosition * staggerDelay);
        
        // Calculate how much time has passed since mount
        const timeSinceMount = (Date.now() - mountTimeRef.current) / 1000; // Convert to seconds
        
        // Calculate remaining delay needed (if data loaded late, use minimal delay)
        const linkedInDelay = Math.max(0.05, linkedInTargetTime - timeSinceMount);
        const githubDelay = Math.max(0.05, githubTargetTime - timeSinceMount);
        
        if (linkedInLink) {
          gsap.set(linkedInLink, { opacity: 0 });
          gsap.to(linkedInLink, {
            duration: 0.8,
            opacity: 1,
            delay: linkedInDelay,
            ease: "power2.out"
          });
        }
        
        if (githubLink) {
          gsap.set(githubLink, { opacity: 0 });
          gsap.to(githubLink, {
            duration: 0.8,
            opacity: 1,
            delay: githubDelay,
            ease: "power2.out"
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [data?.basicData?.linkedin, data?.basicData?.github]);

  return (
    <>
      <nav ref={navRef} className={`navigation ${navOpen ? "opened" : ""}`} id="navigation">
        <div className="mb-4 d-xl-none">
          <Logo showText={true} />
        </div>
        <ul>
          <li className="nav-link">
            <a href="#top" onClick={(e) => handleSmoothScroll(e, 'top')} className="active" aria-label={`01 ${t("navigation.top")}`}>
              <span aria-hidden="true">01</span> <span className="text" aria-hidden="true">{t("navigation.top")}</span>{" "}
              <span className="sr-only">01 {t("navigation.top")}</span>
            </a>
          </li>
          <li className="nav-link">
            <a href="#about_me" onClick={(e) => handleSmoothScroll(e, 'about_me')} aria-label={`02 ${t("navigation.aboutMe")}`}>
              <span aria-hidden="true">02</span> <span className="text" aria-hidden="true">{t("navigation.aboutMe")}</span>{" "}
              <span className="sr-only">02 {t("navigation.aboutMe")}</span>
            </a>
          </li>
          <li className="nav-link">
            <a href="#attainments" onClick={(e) => handleSmoothScroll(e, 'attainments')} aria-label={`03 ${t("navigation.skills")}`}>
              <span aria-hidden="true">03</span> <span className="text" aria-hidden="true">{t("navigation.skills")}</span>{" "}
              <span className="sr-only">03 {t("navigation.skills")}</span>
            </a>
          </li>
          <li className="nav-link">
            <a href="#experience" onClick={(e) => handleSmoothScroll(e, 'experience')} aria-label={`04 ${t("navigation.experiences")}`}>
              <span aria-hidden="true">04</span> <span className="text" aria-hidden="true">{t("navigation.experiences")}</span>{" "}
              <span className="sr-only">04 {t("navigation.experiences")}</span>
            </a>
          </li>
          <li className="nav-link">
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} aria-label={`05 ${t("navigation.contact")}`}>
              <span aria-hidden="true">05</span> <span className="text" aria-hidden="true">{t("navigation.contact")}</span>{" "}
              <span className="sr-only">05 {t("navigation.contact")}</span>
            </a>
          </li>
          <li onClick={handleResumeDownload} className="nav-link">
            <a href="#" onClick={(e) => e.preventDefault()} aria-label={`06 ${t("navigation.resume")}`}>
              <span aria-hidden="true">06</span> <span className="text" aria-hidden="true">{t("navigation.resume")}</span>{" "}
              <span className="sr-only">06 {t("navigation.resume")}</span>
            </a>
          </li>
          {data?.basicData?.linkedin && (
            <li onClick={() => setNavOpen(false)} className="nav-link" data-social="linkedin">
              <a href={getLinkedInUrl()} target="_blank" rel="noopener noreferrer" aria-label={`07 ${t("navigation.linkedin")}`}>
                <span aria-hidden="true">07</span> <span className="text" aria-hidden="true">{t("navigation.linkedin")}</span>{" "}
                <span className="sr-only">07 {t("navigation.linkedin")}</span>
              </a>
            </li>
          )}
          {data?.basicData?.github && (
            <li onClick={() => setNavOpen(false)} className="nav-link" data-social="github">
              <a href={data.basicData.github} target="_blank" rel="noopener noreferrer" aria-label={`08 ${t("navigation.github")}`}>
                <span aria-hidden="true">08</span> <span className="text" aria-hidden="true">{t("navigation.github")}</span>{" "}
                <span className="sr-only">08 {t("navigation.github")}</span>
              </a>
            </li>
          )}
          <li onClick={handleLanguageSwitch} className="nav-link">
            <a href="#" onClick={(e) => e.preventDefault()} aria-label={`09 ${t("navigation.switchLanguage")}`}>
              <span aria-hidden="true">09</span> <span className="text" aria-hidden="true">{t("navigation.switchLanguage")}</span>{" "}
              <span className="sr-only">09 {t("navigation.switchLanguage")}</span>
            </a>
          </li>
        </ul>
        <div 
          className="contact"
          onMouseEnter={() => setMenuHovered(true)}
          onMouseLeave={() => setMenuHovered(false)}
        >
          <ProtectedEmail 
            fallback="email@example.com"
            asLink={true}
            onMenuHover={menuHovered}
          />
        </div>
      </nav>
      <div onClick={() => setNavOpen(false)} className="nav-overlay d-xl-none"></div>
    </>
  );
};

export default Navigation;
