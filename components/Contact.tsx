import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import SectionTitle from "./SectionTitle";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/hooks/useTranslation";
import { useResume } from "@/contexts/ResumeContext";
import { useLoading } from "@/contexts/LoadingContext";
import { sendContactMessage } from "@/api";
import { solveChallenge } from "altcha-lib";
import SuccessPopup from "./SuccessPopup";
import ProtectedEmail from "./ProtectedEmail";
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useTranslation();
  const { data, loading: resumeLoading } = useResume();
  const { setLoading } = useLoading();
  const [submitBtnState, setSubmitBtnState] = React.useState<"submit" | "sending" | "success">("submit");
  const [showSuccessPopup, setShowSuccessPopup] = React.useState(false);
  
  // Obtener el texto del botón basado en el estado actual y el idioma
  const getSubmitBtnText = () => {
    if (submitBtnState === "sending") {
      return t("contact.form.sending");
    } else if (submitBtnState === "success") {
      return t("contact.form.success");
    }
    return t("contact.form.submit");
  };
  
  useGSAP(() => {
    // Solo ejecutar animaciones cuando el loading inicial haya terminado
    if (resumeLoading || !data) return;

    // Verificar que los elementos existan antes de animarlos
    const contactSection = document.querySelector(".contact");
    const overlayText = contactSection?.querySelector(".section-title-overlay-text") as HTMLElement;
    const submitBtn = document.querySelector(".submit-btn");
    const contactItem = document.querySelector(".contact-item");
    const contactInput = document.querySelector(".contact-input");
    const contactItems = document.querySelector(".contact-items");

    if (overlayText && contactSection) {
      gsap.fromTo(
        overlayText,
        { y: "50%", force3D: true },
        {
          y: "-50%",
          force3D: true,
          scrollTrigger: {
            trigger: ".contact",
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Usar scrub suave para mejor rendimiento
            invalidateOnRefresh: true,
            anticipatePin: 1, // Optimizar para scroll asíncrono
            refreshPriority: -1, // Prioridad baja para mejor rendimiento
            fastScrollEnd: true, // Optimizar fin de scroll para Firefox
            // Aplicar will-change solo cuando la animación esté activa
            onEnter: () => {
              overlayText.style.willChange = "transform";
            },
            onLeave: () => {
              overlayText.style.willChange = "auto";
            },
            onEnterBack: () => {
              overlayText.style.willChange = "transform";
            },
            onLeaveBack: () => {
              overlayText.style.willChange = "auto";
            },
          },
        },
      );
    }

    if (submitBtn) {
      gsap.from(".submit-btn", {
        scale: 0,
        duration: 3.5,
        ease: "elastic",
        delay: 0.2,
        force3D: true,
        scrollTrigger: {
          trigger: ".submit-btn",
          invalidateOnRefresh: true,
        },
      });
    }

    if (contactItem && contactItems) {
      gsap.from(".contact-item", {
        scale: 0,
        duration: 0.8,
        ease: "back",
        force3D: true,
        scrollTrigger: {
          trigger: ".contact-items",
          invalidateOnRefresh: true,
        },
      });
    }

    if (contactInput) {
      gsap.from(".contact-input", {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        force3D: true,
        scrollTrigger: {
          trigger: ".contact-input",
          invalidateOnRefresh: true,
        },
      });
    }
  }, { dependencies: [resumeLoading, data] });
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!form.current) {
      return;
    }

    // Get form data
    const formData = new FormData(form.current);
    const name = formData.get("user_name") as string;
    const email = formData.get("user_email") as string;
    const message = formData.get("message") as string;

    // Validate form data
    if (!name || !email || !message) {
      alert(t("contact.form.validationError") || "Por favor, completa todos los campos.");
      return;
    }

    // Validate that altchaChallenge is available
    if (!data?.altchaChallenge) {
      alert(t("contact.form.altchaError") || "Error: No se pudo obtener el challenge de seguridad. Por favor, recarga la página.");
      return;
    }
    
    // Show overlay immediately before starting any async operations
    setLoading(true);
    setSubmitBtnState("sending");
    
    try {
      // Resolve Altcha challenge
      let { challenge, salt, algorithm, signature } = data.altchaChallenge;
      
      // Clean challenge if it has "challenge" suffix (backend bug workaround)
      // The challenge should be a hex hash, not a string with "challenge" at the end
      if (challenge && challenge.endsWith("challenge")) {
        challenge = challenge.replace(/challenge$/i, "");
      }
      
      // Validate challenge format (should be hex string)
      if (!challenge || !/^[0-9a-f]+$/i.test(challenge)) {
        throw new Error("Formato de challenge inválido recibido del servidor.");
      }
      
      // Validate salt format
      if (!salt || !/^[0-9a-f]+$/i.test(salt)) {
        throw new Error("Formato de salt inválido recibido del servidor.");
      }
      
      // Start with smaller maxNumber for faster resolution
      // Most challenges are solvable within 100k-500k range
      const maxNumbers = [100_000, 500_000, 1_000_000, 5_000_000, 10_000_000];
      
      let solution = null;
      let lastError = null;
      
      // Try solving with increasing maxNumber values
      for (let i = 0; i < maxNumbers.length; i++) {
        const maxNumber = maxNumbers[i];
        // Add timeout to prevent hanging (30 seconds per attempt for smaller ranges, 60 for larger)
        // Aumentado porque la resolución puede tomar tiempo
        const timeout = maxNumber <= 1_000_000 ? 30000 : 60000;
        
        try {
          const { controller, promise } = solveChallenge(
            challenge,
            salt,
            algorithm || "SHA-256", // Default to SHA-256 if not specified
            maxNumber,
            0 // start from 0
          );
          
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
              controller.abort(); // Abort the challenge solving
              reject(new Error("Timeout solving challenge"));
            }, timeout);
          });
          
          try {
            solution = await Promise.race([promise, timeoutPromise]) as any;
          } catch (raceError: any) {
            // If it's a timeout, continue to next attempt
            if (raceError.message === "Timeout solving challenge") {
              throw raceError;
            }
            throw raceError;
          }
          
          if (solution && solution.number !== undefined && solution.number !== null) {
            break;
          }
        } catch (error: any) {
          lastError = error;
          // Continue to next maxNumber
        }
      }
      
      if (!solution || solution.number === undefined || solution.number === null) {
        throw new Error("No se pudo resolver el challenge de Altcha. Por favor, intenta de nuevo.");
      }

      // Create the altcha payload string (JSON stringified)
      // Use original challenge from server (not cleaned) for the payload
      const originalChallenge = data.altchaChallenge.challenge;
      const altchaPayloadJson = JSON.stringify({
        algorithm: algorithm || "SHA-256",
        challenge: originalChallenge, // Send original challenge back to server
        number: solution.number,
        salt: salt,
        signature: signature,
      });
      
      // Encode to Base64 as the backend expects Base64-encoded JSON
      const altchaPayload = btoa(altchaPayloadJson);

      // Map form data to API format
      const contactData = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        altcha: altchaPayload,
      };

      // Send contact message to API
      await sendContactMessage(contactData);
      
      // Reset form and show success popup
      form.current.reset();
      setSubmitBtnState("submit");
      setShowSuccessPopup(true);
    } catch (error) {
      setSubmitBtnState("submit");
      alert(t("contact.form.submitError") || "Error al enviar el mensaje. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <section id="contact" className="contact section position-relative">
      {showSuccessPopup && <SuccessPopup onClose={handleCloseSuccessPopup} />}
      <span className="section-title-overlay-text">{t("contact.overlayText")}</span>
      <SectionTitle subtitle={t("contact.subtitle")} title={t("contact.title")} />

      <div className="row pb-120 contact-items">
        <div className="row g-4">
          <div className="col-sm-6 col-xl-4 col-xxl-3">
            <div className="contact-item">
              <div className="icon-box">
                <i className="ph ph-envelope-open"></i>
              </div>
              <p>
                <ProtectedEmail 
                  fallback="email@example.com"
                  asLink={false}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <form ref={form} onSubmit={handleSubmit} id="contact-form" className="contact-form">
        <h4>{t("contact.leaveMessage")}</h4>
        <div className="row g-4 g-xl-5">
          <div className="col-sm-6 contact-input">
            <label htmlFor="name">{t("contact.form.name")}</label>
            <input type="text" id="user_name" name="user_name" placeholder={t("contact.form.namePlaceholder")} required />
          </div>
          <div className="col-sm-6 contact-input">
            <label htmlFor="email">{t("contact.form.email")}</label>
            <input type="email" id="user_email" name="user_email" placeholder={t("contact.form.emailPlaceholder")} required />
          </div>
          <div className="col-12 contact-input">
            <label htmlFor="message">{t("contact.form.message")}</label>
            <textarea id="message" name="message" placeholder={t("contact.form.messagePlaceholder")}></textarea>
          </div>
          <div className="col-12">
            <button type="submit" id="submit-btn" className="submit-btn position-relative">
              <div className="waves-top-md">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              {getSubmitBtnText()}
              <div className="waves-bottom-md">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </form>
      <div className="col mt-5 pt-5 next-chapter">
        <span className="page">05/5</span>
      </div>
    </section>
  );
};

export default Contact;
