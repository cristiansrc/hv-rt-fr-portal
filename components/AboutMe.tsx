import Link from "next/link";
import React from "react";
import SectionTitle from "./SectionTitle";
import SectionOverlayText from "./SectionOverlayText";
import { useTranslation } from "@/hooks/useTranslation";
import { useResume } from "@/contexts/ResumeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/utils/dateFormatter";
import ProtectedEmail from "./ProtectedEmail";

const AboutMe = () => {
  const { t } = useTranslation();
  const { data } = useResume();
  const { language } = useLanguage();
  return (
    <section id="about_me" className="about section">
      <SectionOverlayText text={t("aboutMe.overlayText")} />
      <SectionTitle subtitle={t("aboutMe.subtitle")} title={t("aboutMe.title")} />
      <div className="row mb-4 mb-lg-5 align-items-center">
        <div className="col-lg-7 col-xl-8 about-desc">
          <h2>
            {data?.basicData?.greeting ? (language === "es" ? data.basicData.greeting : data.basicData.greetingEng) : "I'm Emily Davis, a Web Developer"}
          </h2>
          <div 
            className="desc" 
            dangerouslySetInnerHTML={{ 
              __html: data?.basicData?.description 
                ? (language === "es" ? data.basicData.description : data.basicData.descriptionEng) 
                : "I'm a designer & developer with a passion for web design. I enjoy developing simple, clean and slick websites that provide real value to the end user. Thousands of clients have procured exceptional results while working with me. Delivering work within time and budget which meets client's requirements is our moto."
            }}
          />
          <div className="row about-contact">
            <div className="col-sm-4 about-contact-item">
              <p>Email:</p>
              <ProtectedEmail 
                fallback="email@example.com"
                asLink={true}
              />
            </div>
            <div className="col-sm-4 about-contact-item">
              <p>{t("aboutMe.dateOfBirth")}</p>
              <span>
                {data?.basicData?.dateBirth ? formatDate(data.basicData.dateBirth, language) : "11 November, 1987"}
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-xl-4">
          <div className="experience-card">
            <div className="card-inner"></div>
            <div>
              <div className="numbers">
                <span className="number-outline-one">15</span>
                <span className="number-outline-two">15</span>
                <span className="number-main">15</span>
              </div>
              <p>{t("aboutMe.yearsOfExperience") || "Years of experience"}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <Link href="#attainments" className="d-flex gap-4 align-items-center next-chapter">
          <span className="page">02/5</span>
          <span className="next">{t("hero.nextChapter")}</span>
          <span className="icon">
            <i className="ph ph-arrow-elbow-right-down"></i>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default AboutMe;
