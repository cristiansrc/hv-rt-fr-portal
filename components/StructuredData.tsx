"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useResume } from "@/contexts/ResumeContext";

/**
 * StructuredData Component
 * 
 * Componente que genera y agrega datos estructurados (JSON-LD)
 * para mejorar el SEO y permitir rich snippets en los resultados de búsqueda.
 */
export const StructuredData = () => {
  const { language } = useLanguage();
  const { data } = useResume();

  useEffect(() => {
    if (typeof window === "undefined" || !data) return;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

    // Remover datos estructurados anteriores
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Construir nombre completo desde las propiedades disponibles
    const fullName = data.basicData 
      ? `${data.basicData.firstName || ""} ${data.basicData.othersName || ""} ${data.basicData.firstSurName || ""} ${data.basicData.othersSurName || ""}`.trim() || "Cristian SRC"
      : "Cristian SRC";

    // Person Schema (Schema.org)
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: fullName,
      jobTitle: language === "es" 
        ? "Desarrollador Full Stack y Tech Lead"
        : "Full Stack Developer and Tech Lead",
      description: language === "es"
        ? data.basicData?.description || "Full Stack Developer especializado en Java, React, Spring Boot, AWS y Python."
        : data.basicData?.descriptionEng || "Full Stack Developer specialized in Java, React, Spring Boot, AWS and Python.",
      url: siteUrl,
      sameAs: [
        ...(data.basicData?.linkedin ? [data.basicData.linkedin] : []),
        ...(data.basicData?.github ? [data.basicData.github] : []),
      ].filter(Boolean),
      address: {
        "@type": "PostalAddress",
        addressLocality: data.basicData?.located || "Bogotá",
        addressCountry: "CO",
      },
      email: process.env.NEXT_PUBLIC_EMAIL || process.env.NEXT_PUBLIC_EMAIL_ENG || "",
      knowsAbout: [
        "Java",
        "React",
        "Spring Boot",
        "AWS",
        "Python",
        "Full Stack Development",
        "Software Engineering",
        "Tech Leadership",
      ],
    };

    // Website Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Cristian SRC - Portfolio",
      url: siteUrl,
      description: language === "es"
        ? "Portfolio personal de Cristian SRC - Desarrollador Full Stack"
        : "Personal portfolio of Cristian SRC - Full Stack Developer",
      inLanguage: language === "es" ? "es-CO" : "en-US",
      alternateName: "cristiansrc",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };

    // ProfessionalService Schema
    const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Full Stack Development Services",
      provider: {
        "@type": "Person",
        name: fullName,
      },
      areaServed: "Worldwide",
      serviceType: [
        "Web Development",
        "Full Stack Development",
        "Software Engineering",
        "Tech Leadership",
        "Consulting",
      ],
      description: language === "es"
        ? "Servicios de desarrollo Full Stack, consultoría y liderazgo técnico"
        : "Full Stack development services, consulting and technical leadership",
    };

    // Crear y agregar scripts JSON-LD
    const schemas = [personSchema, websiteSchema, professionalServiceSchema];
    
    schemas.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = `structured-data-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup
    return () => {
      schemas.forEach((_, index) => {
        const script = document.getElementById(`structured-data-${index}`);
        if (script) {
          script.remove();
        }
      });
    };
  }, [language, data]);

  return null;
};
