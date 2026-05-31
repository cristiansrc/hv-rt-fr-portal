import React, { useEffect } from "react";
import ProgressChart from "./ProgressChart";
import Link from "next/link";
import SkillBar from "./SkillBar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionOverlayText from "./SectionOverlayText";
import { useTranslation } from "@/hooks/useTranslation";
import { useResume } from "@/contexts/ResumeContext";
import { useLanguage } from "@/contexts/LanguageContext";
gsap.registerPlugin(ScrollTrigger);

const Attainments = () => {
  const { t } = useTranslation();
  const { data, loading: resumeLoading } = useResume();
  const { language } = useLanguage();
  useGSAP(() => {
    // Solo ejecutar animaciones cuando el loading inicial haya terminado
    if (resumeLoading || !data) return;

    // Verificar que los elementos existan antes de animarlos
    const designRowItems = document.querySelectorAll(".design-row-item");
    const developerRows = document.querySelectorAll(".developer-row");
    const languageRowItems = document.querySelectorAll(".language-row-item");

    if (designRowItems.length > 0) {
      gsap.from(".design-row-item", {
        opacity: 0,
        scale: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "back",
        force3D: true,
        scrollTrigger: {
          trigger: ".attainments",
          start: "top 60%",
          end: "top 20%",
          invalidateOnRefresh: true,
        },
      });
    }

    if (developerRows.length > 0) {
      gsap.from(".developer-row", {
        opacity: 0,
        scale: 0,
        duration: 1.5,
        force3D: true,
        scrollTrigger: {
          trigger: ".design-row",
          start: "top 60%",
          end: "top 20%",
          invalidateOnRefresh: true,
        },
      });
    }

    // Solo animar language-row-item si existe
    if (languageRowItems.length > 0) {
      gsap.from(".language-row-item", {
        opacity: 0,
        scale: 0,
        duration: 1.5,
        ease: "back",
        stagger: 0.1,
        force3D: true,
        scrollTrigger: {
          trigger: ".developer-row",
          start: "top 60%",
          end: "top 20%",
          invalidateOnRefresh: true,
        },
      });
    }
  }, { dependencies: [resumeLoading, data] });
  const skills = data?.skills || [];

  return (
    <section id="attainments" className="attainments section position-relative">
      <SectionOverlayText text={t("attainments.overlayText")} />
      {skills.map((skill, index) => {
        const isOdd = (index + 1) % 2 === 1;
        const rowClass = isOdd ? "design-row" : "developer-row";
        const itemClass = isOdd ? "design-row-item" : "developer-row-item";
        
        return (
          <div key={skill.id} className={`row pb-120 ${rowClass}`}>
            {isOdd ? (
              <>
                <div className="col-lg-4">
                  <div className={`section-title-sm ${itemClass}`}>
                    <div className="top">
                      <h2>{language === "es" ? skill.name : skill.nameEng}</h2>
                      <span>{t("attainments.highlightExpertise")}</span>
                    </div>
                    <span className="serial">{String(index + 1).padStart(2, "0")}.-</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex flex-column gap-3">
                    {skill.skillSons.map((skillSon) => (
                      <SkillBar 
                        key={skillSon.id} 
                        skill={language === "es" ? skillSon.name : skillSon.nameEng} 
                        percentage={100} 
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-5 col-lg-4 offset-md-1 offset-lg-2">
                  <div className="section-title-sm">
                    <div className="top">
                      <h2>{language === "es" ? skill.name : skill.nameEng}</h2>
                      <span>{t("attainments.highlightExpertise")}</span>
                    </div>
                    <span className="serial">{String(index + 1).padStart(2, "0")}.-</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex flex-column gap-3">
                    {skill.skillSons.map((skillSon) => (
                      <SkillBar 
                        key={skillSon.id} 
                        skill={language === "es" ? skillSon.name : skillSon.nameEng} 
                        percentage={100} 
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
      <div className="col-12">
        <Link href="#experience" className="d-flex gap-4 align-items-center next-chapter">
          <span className="page">03/5</span>
          <span className="next">{t("hero.nextChapter")}</span>
          <span className="icon">
            <i className="ph ph-arrow-elbow-right-down"></i>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Attainments;
