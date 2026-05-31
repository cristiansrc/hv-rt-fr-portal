import Image from "next/image";
import React from "react";
import arrow from "@/public/images/arrow.png";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SectionTitle from "./SectionTitle";
import SectionOverlayText from "./SectionOverlayText";
import { useTranslation } from "@/hooks/useTranslation";
import { useResume } from "@/contexts/ResumeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLoading } from "@/contexts/LoadingContext";
import { formatDateRange } from "@/utils/dateFormatter";
import { downloadCurriculumPdf } from "@/api";

const Experience = () => {
  const { t } = useTranslation();
  const { data, loading: resumeLoading } = useResume();
  const { language } = useLanguage();
  const { setLoading } = useLoading();

  const handleDownloadCv = async (e: React.MouseEvent<HTMLAnchorElement>) => {
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

  const formatSkills = (skillSons: any[]) => {
    if (!skillSons || skillSons.length === 0) return "";
    
    const skillNames = skillSons.map(skillSon => 
      language === "es" ? skillSon.name : skillSon.nameEng
    );
    
    if (skillNames.length === 1) {
      return skillNames[0];
    }
    
    if (skillNames.length === 2) {
      const connector = language === "es" ? " y " : " and ";
      return skillNames.join(connector);
    }
    
    // Para más de 2, separar con ", " excepto entre el último y penúltimo
    const lastTwo = skillNames.slice(-2);
    const rest = skillNames.slice(0, -2);
    const connector = language === "es" ? " y " : " and ";
    
    return rest.length > 0 
      ? `${rest.join(", ")}, ${lastTwo.join(connector)}`
      : lastTwo.join(connector);
  };

  useGSAP(() => {
    // Solo ejecutar animaciones cuando el loading inicial haya terminado
    if (resumeLoading || !data) return;

    // Verificar que los elementos existan antes de animarlos
    const experienceItem = document.querySelector(".experience-item");
    const experienceWrapper = document.querySelector(".experience-wrapper");

    if (experienceItem) {
      gsap.from(".experience-item", {
        opacity: 0,
        duration: 1,
        stagger: 0.5,
        force3D: true,
        scrollTrigger: {
          trigger: ".experience-item",
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray(".experience-item").forEach((item: any) => {
        if (item) {
          gsap.to(item, {
            "--item-height": "100%",
            stagger: 0.5,
            delay: 0.5,
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 20%",
              invalidateOnRefresh: true,
            },
          });
        }
      });
    }

    if (experienceWrapper) {
      gsap.to(".experience-wrapper", {
        duration: 2,
        ease: "back",
        delay: 0.5,
        "--height": "100%",
        force3D: true,
        scrollTrigger: {
          trigger: ".experience-wrapper",
          invalidateOnRefresh: true,
        },
      });
    }
  }, { dependencies: [resumeLoading, data] });
  return (
    <section id="experience" className="experience section position-relative">
      <SectionOverlayText text={t("experience.overlayText")} />
      <SectionTitle subtitle={t("experience.subtitle")} title={t("experience.title")} />
      <div className="row pb-60">
        <div className="col-lg-10 col-xl-8">
          <div className="experience-wrapper d-flex flex-column">
            {data?.experiences?.map((experience) => (
              <div key={experience.id} className="experience-item">
                <h5>{formatDateRange(experience.yearStart, experience.yearEnd, language)}</h5>
                <h3>
                  {language === "es" 
                    ? `${experience.position} en ${experience.company}:`
                    : `${experience.positionEng} at ${experience.company}:`
                  }
                </h3>
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: language === "es" ? experience.summary : experience.summaryEng 
                  }}
                />
                {experience.skillSons && experience.skillSons.length > 0 && (
                  <p style={{ marginTop: "1em" }}>
                    <strong>{language === "es" ? "Habilidades: " : "Skills: "}</strong>
                    {formatSkills(experience.skillSons)}
                  </p>
                )}
              </div>
            ))}
          </div>

          <a 
            href="#" 
            onClick={handleDownloadCv}
            className="download-cv position-relative"
          >
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
          </a>
        </div>
      </div>

      <div className="col-12">
        <Link href="#contact" className="d-flex gap-4 align-items-center next-chapter">
          <span className="page">04/5</span>
          <span className="next">{t("hero.nextChapter")}</span>
          <span className="icon">
            <i className="ph ph-arrow-elbow-right-down"></i>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Experience;
