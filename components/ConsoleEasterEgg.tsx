"use client";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Extender la interfaz Window para incluir las funciones del easter egg
declare global {
  interface Window {
    unlock?: () => string;
  }
}

/**
 * ConsoleEasterEgg Component
 * 
 * Un huevo de pascua interactivo que se muestra en la consola del navegador.
 * Los visitantes pueden descubrir información adicional escribiendo unlock() en la consola.
 * 
 * @component
 */
const ConsoleEasterEgg = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;

    // 🎨 DEFINICIÓN DE ESTILOS (Inspirado en los colores de la página)
    const titleStyle = [
      "font-size: 50px",
      "font-weight: bold",
      "font-family: monospace",
      "color: #000",
      "background: #FFDB67",
      "padding: 10px 20px",
      "text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2)",
    ].join(";");

    const systemStyle = [
      "color: #FFDB67",
      "font-family: monospace",
      "font-size: 14px",
      "font-weight: bold",
    ].join(";");

    const warningStyle = [
      "background: #000",
      "color: #ff0055", // Rojo neón - mantener estilo de error
      "padding: 5px 10px",
      "font-family: monospace",
      "border: 1px solid #ff0055",
    ].join(";");

    // 🖥️ SECUENCIA DE INICIO (Lo que se ve al abrir F12)
    console.clear(); // Limpiamos basura del navegador
    console.log("%cCristianSRC", titleStyle);
    console.log(
      `%c[SYSTEM] 🟢 Sandevistan OS... ${language === "es" ? "EN LÍNEA" : "ONLINE"}`,
      systemStyle
    );
    console.log(
      `%c[SYSTEM] 🔍 ${language === "es" ? "Escaneando habilidades del visitante... ACEPTADO" : "Scanning visitor skills... ACCEPTED"}`,
      systemStyle
    );
    console.log(
      `%c[SECURE] 🔒 ${language === "es" ? "Información de contacto ENCRIPTADA." : "Contact info is ENCRYPTED."}`,
      systemStyle
    );

    // El gancho para el usuario
    console.log(
      language === "es"
        ? "\n%c⚠️ PARA DESENCRIPTAR: Escribe %cunlock()%c en la consola y presiona Enter."
        : "\n%c⚠️ TO DECRYPT: Type %cunlock()%c in the console and press Enter.",
      warningStyle,
      "color: #FFDB67; font-weight: bold; font-size: 16px; background: #000; padding: 2px 6px;",
      warningStyle,
    );

    // Mensaje fatalista sobre los 3 clics
    console.log(
      language === "es"
        ? "\n%c🚨 ADVERTENCIA CRÍTICA: ¡NO hagas clic 3 veces en la imagen de perfil!"
        : "\n%c🚨 CRITICAL WARNING: DO NOT click the profile image 3 times!",
      "background: #ff0055; color: #000; font-size: 14px; font-weight: bold; padding: 8px; font-family: monospace; border: 2px solid #ff0055;"
    );
    console.log(
      language === "es"
        ? "%c⚠️ Inestabilidad del sistema detectada. La página puede experimentar fallas catastróficas.\n%c   Riesgo de fuga de memoria: ALTO\n%c   Probabilidad de crash: 87.3%\n%c   Has sido advertido. Continúa bajo tu propio riesgo."
        : "%c⚠️ System instability detected. Page may experience catastrophic failure.\n%c   Memory leak risk: HIGH\n%c   Crash probability: 87.3%\n%c   You have been warned. Proceed at your own risk.",
      "color: #ff0055; font-family: monospace; font-size: 12px;",
      "color: #ff0055; font-family: monospace; font-size: 12px;",
      "color: #ff0055; font-family: monospace; font-size: 12px;",
      "color: #ff0055; font-family: monospace; font-size: 12px; font-weight: bold;"
    );

    // 🔓 LA FUNCIÓN OCULTA (Global)
    window.unlock = () => {
      console.clear();

      // Animación simulada en consola
      console.log(
        language === "es" ? "%c🔓 ACCESO CONCEDIDO" : "%c🔓 ACCESS GRANTED",
        "font-size: 30px; color: #0f0; font-family: monospace;"
      );
      console.log("%c----------------------------------------", "color: #666");

      // Presentación de datos técnica
      console.group(language === "es" ? "📦 PAQUETE DESENCRIPTADO: Perfil_Usuario" : "📦 DECRYPTED PACKAGE: User_Profile");
      console.log("User:     Cristian SRC {c/src}");
      console.log(
        language === "es"
          ? "Role:     Desarrollador Full Stack - Ingeniero de Software, líder técnico (Java/React)"
          : "Role:     Full Stack Developer - Software Engineer, tech lead (Java/React)"
      );
      console.log(language === "es" ? "Loc:      Bogotá, Colombia" : "Loc:      Bogotá, Colombia");
      console.log("Stack:    [Spring Boot, React, AWS, Python, Liferay, SQL]");
      console.log(language === "es" ? "Status:   Listo para Codear 🚀" : "Status:   Ready to Code 🚀");
      console.groupEnd();

      // Información del proyecto actual
      console.group(language === "es" ? "🛠️ PROYECTO ACTUAL: Portfolio" : "🛠️ CURRENT PROJECT: Portfolio");
      console.log("Framework: Next.js 14 (React 18)");
      console.log(language === "es" ? "Animaciones: GSAP + ScrollTrigger" : "Animations: GSAP + ScrollTrigger");
      console.log(language === "es" ? "Estilos:   SCSS + Bootstrap 5" : "Styling:   SCSS + Bootstrap 5");
      console.log(language === "es" ? "Iconos:     Phosphor Icons" : "Icons:     Phosphor Icons");
      console.log(language === "es" ? "Tipo:      TypeScript" : "Type:      TypeScript");
      console.groupEnd();

      // El correo final resaltado
      console.log(
        language === "es"
          ? "\n%c📬 ENVIAR MENSAJE A: \n\n%c contact@cristiansrc.com "
          : "\n%c📬 SEND PAYLOAD TO: \n\n%c contact@cristiansrc.com ",
        "font-family: monospace; font-size: 14px; color: #fff;",
        "background: #000; color: #0f0; font-size: 18px; padding: 10px; border: 2px dashed #0f0;",
      );

      return language === "es" ? "Protocolo 'Contrátame' iniciado." : "Protocol 'Hire_Me' initiated."; // Esto sale como valor de retorno (la flechita <)
    };

    // Cleanup (Buena práctica de React para no dejar basura si el componente se desmonta)
    return () => {
      if (window.unlock) {
        delete window.unlock;
      }
    };
  }, [language]); // Agregar language como dependencia

  // Este componente no renderiza nada en el DOM
  return null;
};

export default ConsoleEasterEgg;
