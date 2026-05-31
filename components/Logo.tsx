"use client";

import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className = "", showText = true }: LogoProps) => {
  // Use the static SVG file we created
  return (
    <div className={`d-flex align-items-center gap-1 logo-container ${className}`} style={{ fontFamily: "monospace", position: "relative", zIndex: 1 }}>
      <style jsx>{`
        .logo-container {
          flex-wrap: nowrap;
        }
        
        @media (max-width: 576px) {
          .logo-container {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 0.25rem !important;
          }
          
          .logo-container span {
            margin-left: 0 !important;
          }
        }
      `}</style>
      <object
        data="/images/logo.svg"
        type="image/svg+xml"
        style={{ 
          flexShrink: 0, 
          width: "auto",
          height: "auto",
          maxHeight: "80px",
          maxWidth: "500px",
          display: "inline-block",
          color: "inherit",
          verticalAlign: "middle",
          pointerEvents: "none",
          margin: 0,
          padding: 0
        }}
        aria-label="logo"
      />
      {showText && (
        <span style={{ fontSize: "20px", fontWeight: 600, color: "inherit", whiteSpace: "nowrap", lineHeight: 1, marginLeft: "-20px" }}>
          cristiansrc
        </span>
      )}
    </div>
  );
};

export default Logo;
