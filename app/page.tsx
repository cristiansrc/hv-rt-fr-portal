"use client";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Attainments from "@/components/Attainments";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Loading from "@/components/Loading";
import ErrorPopup from "@/components/ErrorPopup";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useResume } from "@/contexts/ResumeContext";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const { language } = useLanguage();
  const { data, loading, error } = useResume();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Obtener URL de LinkedIn desde variables de entorno
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/cristiansrc";

  const handleRedirectToLinkedIn = () => {
    window.location.href = linkedinUrl;
  };

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;

    const savedColor = localStorage.getItem("color");
    if (savedColor) {
      document.documentElement.style.setProperty("--primary", savedColor);
    }
    const savedDir = localStorage.getItem("dir");
    if (savedDir) {
      document.documentElement.dir = savedDir;
    }
  }, []);

  // Marcar cuando el loading inicial termine
  useEffect(() => {
    if (!loading && data) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        setInitialLoadComplete(true);
      }, 100);
    }
  }, [loading, data]);

  // Inicializar ScrollSpy usando Intersection Observer API
  useEffect(() => {
    if (!initialLoadComplete) return;

    const sections = ["top", "about_me", "attainments", "experience", "contact"];
    let observer: IntersectionObserver | null = null;
    let scrollTimeout: NodeJS.Timeout | null = null;
    let throttledScrollHandler: (() => void) | null = null;

    const initScrollSpy = () => {
      // Verificar que todas las secciones existan
      const sectionElements = sections
        .map(id => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (sectionElements.length === 0) {
        setTimeout(initScrollSpy, 100);
        return;
      }

      // Limpiar observer anterior si existe
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      // Función para actualizar el menú activo
      const updateActiveMenu = (activeSectionId: string) => {
        // Remover clase active de todos los enlaces y li
        const navLinks = document.querySelectorAll('#navigation a[href^="#"]');
        const navItems = document.querySelectorAll('#navigation li');
        
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });
        navItems.forEach((li) => {
          li.classList.remove("active");
        });

        // Agregar clase active al enlace correspondiente
        const activeLink = document.querySelector(
          `#navigation a[href="#${activeSectionId}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
          const parentLi = activeLink.closest("li");
          if (parentLi) {
            parentLi.classList.add("active");
          }
        }
      };

      // Función para determinar la sección activa basada en el scroll
      const getActiveSection = (): string => {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const triggerPoint = scrollPosition + viewportHeight * 0.3; // 30% desde el top del viewport

        let activeSection = "";
        let maxScore = -Infinity;

        sectionElements.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;
          const sectionHeight = rect.height;

          // Calcular un score basado en qué tan visible está la sección
          let score = 0;

          // Si el trigger point está dentro de la sección
          if (triggerPoint >= sectionTop && triggerPoint <= sectionBottom) {
            // Score alto si está en el rango
            const distanceFromTop = triggerPoint - sectionTop;
            const distanceFromBottom = sectionBottom - triggerPoint;
            const minDistance = Math.min(distanceFromTop, distanceFromBottom);
            
            // Score más alto si está más cerca del centro
            score = sectionHeight - minDistance;
          } else if (triggerPoint < sectionTop) {
            // Si está antes de la sección, dar score negativo proporcional a la distancia
            score = -(sectionTop - triggerPoint) / 100;
          } else {
            // Si está después de la sección, dar score negativo proporcional a la distancia
            score = -(triggerPoint - sectionBottom) / 100;
          }

          // Priorizar secciones que están cerca del trigger point
          if (score > maxScore) {
            maxScore = score;
            activeSection = section.id;
          }
        });

        return activeSection;
      };

      // Crear Intersection Observer
      observer = new IntersectionObserver(
        (entries) => {
          // Usar la función getActiveSection para determinar la sección activa
          const activeSection = getActiveSection();
          if (activeSection) {
            updateActiveMenu(activeSection);
          }
        },
        {
          rootMargin: "0px 0px -30% 0px",
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
        }
      );

      // También agregar un listener de scroll para actualizar más frecuentemente
      const handleScroll = () => {
        const activeSection = getActiveSection();
        if (activeSection) {
          updateActiveMenu(activeSection);
        }
      };

      // Throttle del scroll para mejor rendimiento
      throttledScrollHandler = () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 50);
      };

      window.addEventListener("scroll", throttledScrollHandler, { passive: true });

      // Observar todas las secciones
      sectionElements.forEach((section) => {
        observer?.observe(section);
      });

      // Actualizar el menú activo inicialmente
      const updateInitialActive = () => {
        const activeSection = getActiveSection();
        if (activeSection) {
          updateActiveMenu(activeSection);
        } else if (window.scrollY < 100) {
          // Si estamos al inicio, activar "top"
          updateActiveMenu("top");
        }
      };

      // Actualizar inicialmente
      setTimeout(updateInitialActive, 100);

      // Manejar el hash de la URL al cargar
      const hash = window.location.hash.slice(1);
      if (hash && sections.includes(hash)) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "auto" });
            setTimeout(updateInitialActive, 200);
          }, 300);
        }
      }
    };

    // Iniciar después de un pequeño delay
    setTimeout(initScrollSpy, 300);

    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
        scrollTimeout = null;
      }
      if (throttledScrollHandler) {
        window.removeEventListener("scroll", throttledScrollHandler);
        throttledScrollHandler = null;
      }
    };
  }, [initialLoadComplete, language, data]); // Reinicializar cuando cambie el idioma o se carguen los datos

  // Mostrar error popup si hay error al cargar el servicio inicial
  if (error && !loading) {
    return <ErrorPopup onRedirect={handleRedirectToLinkedIn} />;
  }

  // Mostrar loading mientras carga el servicio inicial
  if (loading || !initialLoadComplete) {
    return (
      <div className="loader-container w-100 d-flex align-items-center justify-content-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Loading />
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* <!-- navigation --> */}
      <Navigation setNavOpen={setNavOpen} navOpen={navOpen} />

      {/* <!-- shape bg --> */}
      <svg className="bg-gradiant" preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80">
        <path fill="#9b5de5" className="out-top" d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z" />
        <path fill="#f15bb5" className="in-top" d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z" />
        <path fill="#00bbf9" className="out-bottom" d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z" />
        <path fill="#00f5d4" className="in-bottom" d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z" />
      </svg>

      {/* <!-- main content --> */}
      <main className="container-fluid">
        <div className="row gx-xxl-6">
          <div className="col col-xl-9" data-bs-spy="scroll" data-bs-target="#navigation">
            {/* <!-- hero --> */}
            <Hero />

            {/* <!-- about me --> */}
            <AboutMe />

            {/* <!-- attainments --> */}
            <Attainments />

            {/* <!-- experience --> */}
            <Experience />

            {/* <!-- contact --> */}
            <Contact />
          </div>
        </div>
      </main>
      {/* <!-- color switcher --> */}
      {/* Console Easter Egg - Se ejecuta al cargar la página */}
      <ConsoleEasterEgg />
    </>
  );
}
