"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useResume } from "@/contexts/ResumeContext";

/**
 * SEOHead Component
 * 
 * Componente que actualiza dinámicamente los meta tags para SEO
 * basado en el idioma y los datos del usuario.
 */
export const SEOHead = () => {
  const { language } = useLanguage();
  const { data } = useResume();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const siteName = "Cristian SRC - Full Stack Developer";
    
    // Descripción basada en idioma y datos
    const description = language === "es"
      ? data?.basicData?.description || "Full Stack Developer y Tech Lead especializado en Java, React, Spring Boot, AWS y Python. Portfolio personal con experiencia, proyectos y habilidades."
      : data?.basicData?.descriptionEng || "Full Stack Developer and Tech Lead specialized in Java, React, Spring Boot, AWS and Python. Personal portfolio with experience, projects and skills.";

    // Título basado en idioma
    const title = language === "es"
      ? "Cristian SRC - Desarrollador Full Stack | Portfolio"
      : "Cristian SRC - Full Stack Developer | Portfolio";

    // Actualizar título
    document.title = title;

    // Función helper para actualizar o crear meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute("content", content);
    };

    // Meta tags básicos
    updateMetaTag("description", description);
    updateMetaTag("keywords", language === "es"
      ? "Full Stack Developer, Java, React, Spring Boot, AWS, Python, Tech Lead, Desarrollador, Portfolio, Bogotá, Colombia"
      : "Full Stack Developer, Java, React, Spring Boot, AWS, Python, Tech Lead, Portfolio, Bogotá, Colombia"
    );

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:url", `${siteUrl}${window.location.pathname}`, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:site_name", siteName, true);
    updateMetaTag("og:locale", language === "es" ? "es_CO" : "en_US", true);
    updateMetaTag("og:image", `${siteUrl}/images/og-image.png`, true);
    updateMetaTag("og:image:width", "1200", true);
    updateMetaTag("og:image:height", "630", true);
    updateMetaTag("og:image:alt", siteName, true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", `${siteUrl}/images/og-image.png`);
    updateMetaTag("twitter:creator", "@cristiansrc");

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${siteUrl}${window.location.pathname}`);

    // Alternate language links
    const updateAlternateLink = (lang: string, hreflang: string) => {
      let alternate = document.querySelector(`link[rel='alternate'][hreflang='${hreflang}']`);
      if (!alternate) {
        alternate = document.createElement("link");
        alternate.setAttribute("rel", "alternate");
        alternate.setAttribute("hreflang", hreflang);
        document.head.appendChild(alternate);
      }
      alternate.setAttribute("href", `${siteUrl}${window.location.pathname}?lang=${lang}`);
    };

    updateAlternateLink("es", "es-CO");
    updateAlternateLink("en", "en-US");

    // HTML lang attribute
    document.documentElement.lang = language === "es" ? "es" : "en";
  }, [language, data]);

  return null;
};
