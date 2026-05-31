"use client";
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface SuccessPopupProps {
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="success-popup-overlay position-fixed w-100 h-100 d-flex align-items-center justify-content-center" 
         style={{ 
           top: 0, 
           left: 0, 
           zIndex: 10000, 
           backgroundColor: "rgba(0, 0, 0, 0.8)",
           backdropFilter: "blur(5px)"
         }}>
      <div className="success-popup-content position-relative" 
           style={{
             backgroundColor: "rgb(var(--white))",
             borderRadius: "12px",
             padding: "3rem",
             maxWidth: "500px",
             width: "90%",
             boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
             textAlign: "center"
           }}>
        <div className="success-icon mb-4" style={{ fontSize: "4rem" }}>
          <i className="ph ph-check-circle" style={{ color: "#22c55e" }}></i>
        </div>
        
        <h2 className="mb-3" style={{ 
          color: "rgb(var(--black))",
          fontSize: "1.75rem",
          fontWeight: "600"
        }}>
          {t("contact.success.title")}
        </h2>
        
        <p className="mb-4" style={{ 
          color: "rgb(var(--black))",
          fontSize: "1rem",
          lineHeight: "1.6",
          opacity: 0.8
        }}>
          {t("contact.success.message")}
        </p>

        <button
          onClick={onClose}
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
          {t("contact.success.close")}
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
