"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import shuffleLetters from "shuffle-letters";

interface ProtectedEmailProps {
  email?: string; // Opcional: si no se pasa, se obtiene de las variables de entorno
  className?: string;
  showIcon?: boolean;
  iconClassName?: string;
  asLink?: boolean;
  fallback?: string;
  onMenuHover?: boolean; // Si está en el menú y se detecta hover
}

/**
 * Componente que protege el correo electrónico de scrapers/bots
 * El correo NO se almacena en el HTML inicial, solo se reconstruye
 * en memoria cuando JavaScript se ejecuta en el cliente.
 * 
 * Si no se pasa email como prop, lo obtiene de las variables de entorno:
 * - NEXT_PUBLIC_EMAIL para español
 * - NEXT_PUBLIC_EMAIL_ENG para inglés
 * Esto evita que aparezca en las props del HTML.
 */
const ProtectedEmail: React.FC<ProtectedEmailProps> = ({
  email: emailProp,
  className = "",
  showIcon = false,
  iconClassName = "",
  asLink = true,
  fallback = "email@example.com",
  onMenuHover = false,
}) => {
  const { language } = useLanguage();
  const [decodedEmail, setDecodedEmail] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const emailRef = useRef<string>("");
  const scrollDetectedRef = useRef(false);
  const lastScrollYRef = useRef(0);

  // Obtener el correo de las variables de entorno según el idioma
  const getEmail = (): string => {
    if (emailProp) return emailProp;
    
    // Obtener el correo según el idioma actual
    const emailFromEnv = language === "es" 
      ? process.env.NEXT_PUBLIC_EMAIL 
      : process.env.NEXT_PUBLIC_EMAIL_ENG;
    
    return emailFromEnv || fallback;
  };

  // Inicializar y almacenar el correo en una ref solo en el cliente
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Delay para evitar que aparezca en el HTML inicial
    const timer = setTimeout(() => {
      setIsMounted(true);
      const emailValue = getEmail();
      emailRef.current = emailValue;
    }, 200);

    return () => clearTimeout(timer);
  }, [emailProp, language, fallback]);

  // Actualizar el correo cuando cambie el idioma
  useEffect(() => {
    if (typeof window === "undefined" || !isMounted) return;
    
    // Actualizar el correo según el idioma actual
    const emailValue = getEmail();
    if (emailValue && emailValue !== fallback) {
      emailRef.current = emailValue;
      
      // Si el correo ya está visible, actualizarlo también
      if (isVisible) {
        setDecodedEmail(emailValue);
      }
    }
  }, [language, emailProp, fallback, isMounted, isVisible]);

  // Detectar scroll del usuario - SOLO mostrar el correo cuando haya scroll real
  useEffect(() => {
    if (typeof window === "undefined" || !isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      
      // Detectar si hay scroll real (movimiento hacia abajo)
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
        scrollDetectedRef.current = true;
        
        // Mostrar el correo solo después de detectar scroll
        if (!isVisible && emailRef.current && emailRef.current !== fallback) {
          const emailValue = emailRef.current;
          
          // Validar formato de email
          if (emailValue.includes("@") && emailValue.split("@").length === 2) {
            const [userPart, domainPart] = emailValue.split("@");
            
            if (userPart && domainPart && userPart.length > 0 && domainPart.length > 0) {
              setDecodedEmail(emailValue);
              setIsVisible(true);
            }
          }
        }
      }
      
      lastScrollYRef.current = currentScrollY;
    };

    // Usar passive para mejor rendimiento
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMounted, isVisible]);

  // Detectar hover en el menú - mostrar el correo cuando se pase el cursor por el menú
  useEffect(() => {
    if (typeof window === "undefined" || !isMounted || isVisible) return;
    
    if (onMenuHover && emailRef.current && emailRef.current !== fallback) {
      const emailValue = emailRef.current;
      
      if (emailValue.includes("@") && emailValue.split("@").length === 2) {
        const [userPart, domainPart] = emailValue.split("@");
        
        if (userPart && domainPart && userPart.length > 0 && domainPart.length > 0) {
          setDecodedEmail(emailValue);
          setIsVisible(true);
        }
      }
    }
  }, [onMenuHover, isMounted, isVisible, fallback]);

  // Detectar interacción alternativa (click, hover) como fallback
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || isVisible) return;

    const element = containerRef.current;
    
    const handleInteraction = () => {
      // Solo mostrar si ya se detectó scroll
      if (scrollDetectedRef.current && emailRef.current && emailRef.current !== fallback) {
        const emailValue = emailRef.current;
        
        if (emailValue.includes("@") && emailValue.split("@").length === 2) {
          const [userPart, domainPart] = emailValue.split("@");
          
          if (userPart && domainPart && userPart.length > 0 && domainPart.length > 0) {
            setDecodedEmail(emailValue);
            setIsVisible(true);
          }
        }
      }
    };

    element.addEventListener("mouseenter", handleInteraction, { once: true });
    element.addEventListener("click", handleInteraction, { once: true });
    element.addEventListener("focus", handleInteraction, { once: true });
    element.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      element.removeEventListener("mouseenter", handleInteraction);
      element.removeEventListener("click", handleInteraction);
      element.removeEventListener("focus", handleInteraction);
      element.removeEventListener("touchstart", handleInteraction);
    };
  }, [isMounted, isVisible]);

  // Actualizar el DOM cuando el correo esté listo y sea visible
  useEffect(() => {
    if (!isMounted || !isVisible || !containerRef.current) return;
    
    // Obtener el correo actualizado
    const currentEmail = emailRef.current || decodedEmail || fallback;
    
    if (!currentEmail || currentEmail === fallback) {
      return;
    }

    // Validar que sea un email válido
    if (!currentEmail.includes("@") || currentEmail.split("@").length !== 2) {
      return;
    }

    const element = containerRef.current;
    const cleanEmail = currentEmail;
    
    // Función para manejar la copia
    const handleCopy = (e: ClipboardEvent) => {
      if (e.clipboardData) {
        e.clipboardData.setData("text/plain", cleanEmail);
        e.preventDefault();
      }
    };
    
    // Función para aplicar animación shuffleLetters
    const applyAnimation = () => {
      // Buscar el elemento de texto (puede estar dentro del link o span)
      let textElement: HTMLElement | null = null;
      
      if (asLink && element instanceof HTMLAnchorElement) {
        // Si hay icono, el texto está después del icono
        if (showIcon) {
          const icon = element.querySelector("i");
          if (icon && icon.nextSibling) {
            // Crear un span para el texto si no existe
            if (!icon.nextElementSibling || icon.nextElementSibling.tagName !== "SPAN") {
              const textSpan = document.createElement("span");
              textSpan.textContent = cleanEmail;
              icon.after(textSpan);
              textElement = textSpan;
            } else {
              textElement = icon.nextElementSibling as HTMLElement;
            }
          } else {
            textElement = element;
          }
        } else {
          textElement = element;
        }
      } else if (!asLink && element instanceof HTMLSpanElement) {
        if (showIcon) {
          const icon = element.querySelector("i");
          if (icon && icon.nextSibling) {
            if (!icon.nextElementSibling || icon.nextElementSibling.tagName !== "SPAN") {
              const textSpan = document.createElement("span");
              textSpan.textContent = cleanEmail;
              icon.after(textSpan);
              textElement = textSpan;
            } else {
              textElement = icon.nextElementSibling as HTMLElement;
            }
          } else {
            textElement = element;
          }
        } else {
          textElement = element;
        }
      }
      
      // Aplicar animación shuffleLetters con iterations: 10
      if (textElement) {
        try {
          shuffleLetters(textElement, { iterations: 10 });
        } catch (error) {
          console.error("Error applying shuffleLetters animation:", error);
        }
      }
    };
    
    if (asLink && element instanceof HTMLAnchorElement) {
      element.href = `mailto:${cleanEmail}`;
      if (showIcon) {
        element.innerHTML = `<i class="${iconClassName}"></i><span>${cleanEmail}</span>`;
      } else {
        element.textContent = cleanEmail;
      }
      
      // Aplicar animación después de un pequeño delay
      setTimeout(() => {
        applyAnimation();
      }, 50);
    } else if (!asLink && element instanceof HTMLSpanElement) {
      if (showIcon) {
        element.innerHTML = `<i class="${iconClassName}"></i><span>${cleanEmail}</span>`;
      } else {
        element.textContent = cleanEmail;
      }
      
      // Aplicar animación después de un pequeño delay
      setTimeout(() => {
        applyAnimation();
      }, 50);
    }
    
    // Agregar listener para copia
    element.addEventListener("copy", handleCopy);
    
    // Cleanup
    return () => {
      element.removeEventListener("copy", handleCopy);
    };
  }, [isMounted, isVisible, decodedEmail, asLink, showIcon, iconClassName, fallback]);

  // En el servidor o antes de montar, mostrar texto que parezca código/encriptado
  if (!isMounted || !isVisible) {
    // Texto que parece un bug de código o encriptado
    const encryptedText = "0x7f8a9b2c@null.undefined";
    // Generar un hash aleatorio que NO contiene información del correo
    const randomId = typeof window !== "undefined" 
      ? Math.random().toString(36).substring(2, 11)
      : "email-placeholder";
    
    if (asLink) {
      return (
        <Link 
          href="#" 
          className={className}
          data-ref={randomId}
          ref={containerRef as any}
          onClick={(e) => {
            e.preventDefault();
            // Solo mostrar si ya hubo scroll o hover
            if ((scrollDetectedRef.current || onMenuHover) && !isVisible && emailRef.current && emailRef.current !== fallback) {
              const emailValue = emailRef.current;
              if (emailValue.includes("@") && emailValue.split("@").length === 2) {
                setDecodedEmail(emailValue);
                setIsVisible(true);
              }
            }
          }}
        >
          {showIcon && <i className={iconClassName}></i>}
          {encryptedText}
        </Link>
      );
    }
    
    return (
      <span 
        className={className}
        data-ref={randomId}
        ref={containerRef}
        onClick={() => {
          // Solo mostrar si ya hubo scroll o hover
          if ((scrollDetectedRef.current || onMenuHover) && !isVisible && emailRef.current && emailRef.current !== fallback) {
            const emailValue = emailRef.current;
            if (emailValue.includes("@") && emailValue.split("@").length === 2) {
              setDecodedEmail(emailValue);
              setIsVisible(true);
            }
          }
        }}
      >
        {showIcon && <i className={iconClassName}></i>}
        {encryptedText}
      </span>
    );
  }

  // En el cliente y cuando sea visible, mostrar el correo real
  const displayEmail = emailRef.current && emailRef.current !== fallback 
    ? emailRef.current 
    : (decodedEmail || fallback);
  
  // Email real para lectores de pantalla (siempre disponible si existe)
  const accessibleEmail = emailRef.current && emailRef.current !== fallback 
    ? emailRef.current 
    : decodedEmail;

  if (asLink) {
    return (
      <Link 
        href={`mailto:${displayEmail}`} 
        className={className}
        ref={containerRef as any}
        aria-label={accessibleEmail ? `Email: ${accessibleEmail}` : "Email contact"}
      >
        {showIcon && <i className={iconClassName} aria-hidden="true"></i>}
        <span aria-hidden={!isVisible || !accessibleEmail}>{displayEmail}</span>
        {accessibleEmail && (isVisible || !isMounted) && (
          <span className="sr-only">{accessibleEmail}</span>
        )}
      </Link>
    );
  }

  return (
    <span className={className} ref={containerRef} aria-label={accessibleEmail ? `Email: ${accessibleEmail}` : "Email contact"}>
      {showIcon && <i className={iconClassName} aria-hidden="true"></i>}
      <span aria-hidden={!isVisible || !accessibleEmail}>{displayEmail}</span>
      {accessibleEmail && (isVisible || !isMounted) && (
        <span className="sr-only">{accessibleEmail}</span>
      )}
    </span>
  );
};

export default ProtectedEmail;
