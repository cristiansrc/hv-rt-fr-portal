"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

interface ErrorPopupProps {
  onRedirect: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ onRedirect }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [countdown, setCountdown] = useState<number | null>(null);

  // Obtener configuración de variables de entorno
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/cristiansrc";
  // Asegurar que el delay sea al menos 1 segundo
  const redirectDelay = Math.max(1, parseInt(process.env.NEXT_PUBLIC_REDIRECT_DELAY || "20", 10));

  useEffect(() => {
    // Iniciar countdown
    setCountdown(redirectDelay);

    // Redirigir automáticamente después del delay
    const timer = setTimeout(() => {
      onRedirect();
    }, redirectDelay * 1000);

    // Countdown cada segundo
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [redirectDelay, onRedirect]);

  const handleRedirectClick = () => {
    onRedirect();
  };

  return (
    <div className="error-popup-overlay position-fixed w-100 h-100 d-flex align-items-center justify-content-center" 
         style={{ 
           top: 0, 
           left: 0, 
           zIndex: 10000, 
           backgroundColor: "rgba(0, 0, 0, 0.8)",
           backdropFilter: "blur(5px)"
         }}>
      <div className="error-popup-content position-relative" 
           style={{
             backgroundColor: "rgb(var(--white))",
             borderRadius: "12px",
             padding: "3rem",
             maxWidth: "500px",
             width: "90%",
             boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
             textAlign: "center"
           }}>
        <div className="error-icon mb-4" style={{ fontSize: "4rem" }}>
          <i className="ph ph-warning-circle" style={{ color: "rgb(var(--primary))" }}></i>
        </div>
        
        <h2 className="mb-3" style={{ 
          color: "rgb(var(--black))",
          fontSize: "1.75rem",
          fontWeight: "600"
        }}>
          {t("error.title")}
        </h2>
        
        <p className="mb-4" style={{ 
          color: "rgb(var(--black))",
          fontSize: "1rem",
          lineHeight: "1.6",
          opacity: 0.8
        }}>
          {t("error.message")}
        </p>

        {countdown !== null && countdown > 0 && (
          <p className="mb-4" style={{ 
            color: "rgb(var(--black))",
            fontSize: "0.9rem",
            opacity: 0.7
          }}>
            {t("error.redirecting")} {countdown} {countdown === 1 ? t("error.second") : t("error.seconds")}...
          </p>
        )}

        <button
          onClick={handleRedirectClick}
          className="btn btn-primary text-capitalize"
          style={{
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            fontWeight: "500",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          {t("error.goToLinkedIn")}
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
