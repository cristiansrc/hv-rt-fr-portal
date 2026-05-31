"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Bootstrap = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    import("bootstrap");
    
    // Configurar GSAP y ScrollTrigger para optimizar animaciones y evitar warnings de Firefox
    if (typeof window !== "undefined") {
      // Registrar ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);
      
      // Configurar ScrollTrigger globalmente para mejor rendimiento y evitar warnings de Firefox
      ScrollTrigger.config({
        // Usar requestAnimationFrame para mejor rendimiento
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });
      
      // Normalizar el scroll para Firefox - esto elimina el warning de "scroll-linked effects"
      // Fuerza que el scroll se maneje en el hilo de JavaScript, manteniendo las actualizaciones
      // visuales sincronizadas con la posición del scroll
      ScrollTrigger.normalizeScroll(true);
      
      // Configurar GSAP para usar requestAnimationFrame de manera más eficiente
      gsap.config({
        nullTargetWarn: false, // Silenciar warnings de targets null
      });
      
      // Silenciar warnings de GSAP cuando los targets no se encuentran
      const originalWarn = console.warn;
      console.warn = (...args: any[]) => {
        // Filtrar warnings de GSAP sobre targets no encontrados
        if (args[0] && typeof args[0] === "string" && args[0].includes("GSAP target") && args[0].includes("not found")) {
          return; // Silenciar este warning
        }
        originalWarn.apply(console, args);
      };
      
      // Restaurar console.warn al desmontar
      return () => {
        console.warn = originalWarn;
        // Limpiar ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);
  return <>{children}</>;
};

export default Bootstrap;
