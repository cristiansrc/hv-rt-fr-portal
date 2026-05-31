"use client";
import React, { useEffect, useRef, useState } from "react";

interface BinaryRainGameProps {
  isOpen: boolean;
  onClose: () => void;
  language: "en" | "es";
}

const BinaryRainGame: React.FC<BinaryRainGameProps> = ({ isOpen, onClose, language }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const gameStateRef = useRef({
    particles: [] as Array<{ x: number; y: number; char: string; speed: number; type: 'one' | 'zero' | 'bug' }>,
    basketX: 0,
    score: 0,
    animationId: 0,
  });

  const texts = {
    en: {
      title: "BINARY RAIN CATCHER",
      score: "SCORE",
      instructions: "INSTRUCTIONS:",
      inst1: "Move your mouse to control the basket",
      inst2: "Catch GREEN 1s to earn +10 points",
      inst3: "Ignore YELLOW 0s (they're harmless)",
      inst4: "Avoid RED 🐞 BUGS or lose -20 points!",
      note: "🎉 If you found this game, let me know when you contact me!",
      start: "START GAME",
      restart: "RESTART",
      close: "CLOSE",
    },
    es: {
      title: "RECOLECTOR DE LLUVIA BINARIA",
      score: "PUNTUACIÓN",
      instructions: "INSTRUCCIONES:",
      inst1: "Mueve el mouse para controlar la canasta",
      inst2: "Atrapa 1s VERDES para ganar +10 puntos",
      inst3: "Ignora 0s AMARILLOS (son inofensivos)",
      inst4: "¡Evita 🐞 BUGS ROJOS o pierde -20 puntos!",
      note: "🎉 Si encontraste este juego, ¡házmelo saber cuando te comuniques conmigo!",
      start: "INICIAR JUEGO",
      restart: "REINICIAR",
      close: "CERRAR",
    },
  };

  const t = texts[language];

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size - optimizado para pantallas 1080p y laptops
    canvas.width = 550;
    canvas.height = 350;

    const gameState = gameStateRef.current;
    gameState.basketX = canvas.width / 2;

    // Preview animation cuando no ha empezado el juego
    if (!gameStarted) {
      const previewLoop = () => {
        // Clear canvas with fade effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Spawn preview particles
        if (Math.random() < 0.03) {
          const rand = Math.random();
          let char = rand < 0.5 ? '1' : '0';
          let type: 'one' | 'zero' = rand < 0.5 ? 'one' : 'zero';
          
          gameState.particles.push({
            x: Math.random() * (canvas.width - 40) + 20,
            y: -20,
            char,
            speed: Math.random() * 1.5 + 1.5,
            type,
          });
        }

        // Draw preview particles
        gameState.particles.forEach((particle, index) => {
          particle.y += particle.speed;

          ctx.font = "bold 28px monospace";
          
          if (particle.type === 'one') {
            ctx.shadowBlur = 12;
            ctx.shadowColor = "#0f0";
            ctx.fillStyle = "#0f0";
            ctx.fillText(particle.char, particle.x, particle.y);
            ctx.shadowBlur = 0;
          } else {
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#FFDB67";
            ctx.fillStyle = "#FFDB67";
            ctx.fillText(particle.char, particle.x, particle.y);
            ctx.shadowBlur = 0;
          }

          // Remove if out of bounds
          if (particle.y > canvas.height) {
            gameState.particles.splice(index, 1);
          }
        });

        if (!gameStarted) {
          gameState.animationId = requestAnimationFrame(previewLoop);
        }
      };

      previewLoop();
      return;
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      gameState.basketX = Math.max(30, Math.min(canvas.width - 30, e.clientX - rect.left));
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    // Spawn particles
    const spawnParticle = () => {
      const rand = Math.random();
      let type: 'one' | 'zero' | 'bug';
      let char: string;
      
      if (rand < 0.4) {
        type = 'one';
        char = '1';
      } else if (rand < 0.75) {
        type = 'zero';
        char = '0';
      } else {
        type = 'bug';
        char = '🐞';
      }

      gameState.particles.push({
        x: Math.random() * (canvas.width - 20) + 10,
        y: -20,
        char,
        speed: Math.random() * 2 + 2,
        type,
      });
    };

    // Game loop
    const gameLoop = () => {
      // Clear canvas with Matrix-style fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles
      if (Math.random() < 0.05) {
        spawnParticle();
      }

      // Update and draw particles
      gameState.particles.forEach((particle, index) => {
        particle.y += particle.speed;

        // Draw particle
        if (particle.type === 'bug') {
          ctx.font = "28px monospace";
          ctx.fillStyle = "#ff0055";
          ctx.fillText(particle.char, particle.x, particle.y);
          // Glow effect for bugs
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#ff0055";
          ctx.fillText(particle.char, particle.x, particle.y);
          ctx.shadowBlur = 0;
        } else {
          // Hacer los números más grandes y brillantes
          ctx.font = "bold 32px monospace";
          
          if (particle.type === 'one') {
            // 1s en verde brillante con sombra
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#0f0";
            ctx.fillStyle = "#0f0";
            ctx.fillText(particle.char, particle.x, particle.y);
            ctx.shadowBlur = 0;
            
            // Trail effect más visible
            ctx.font = "bold 28px monospace";
            ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
            ctx.fillText(particle.char, particle.x, particle.y - 25);
          } else {
            // 0s en amarillo para diferenciarlos
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#FFDB67";
            ctx.fillStyle = "#FFDB67";
            ctx.fillText(particle.char, particle.x, particle.y);
            ctx.shadowBlur = 0;
            
            // Trail effect
            ctx.font = "bold 28px monospace";
            ctx.fillStyle = "rgba(255, 219, 103, 0.2)";
            ctx.fillText(particle.char, particle.x, particle.y - 25);
          }
        }

        // Check collision with basket
        const basketY = canvas.height - 40;
        if (
          particle.y >= basketY &&
          particle.y <= basketY + 20 &&
          particle.x >= gameState.basketX - 30 &&
          particle.x <= gameState.basketX + 30
        ) {
          if (particle.type === 'one') {
            gameState.score += 10;
            setScore(gameState.score);
          } else if (particle.type === 'bug') {
            gameState.score = Math.max(0, gameState.score - 20);
            setScore(gameState.score);
          }
          gameState.particles.splice(index, 1);
        }

        // Remove if out of bounds
        if (particle.y > canvas.height) {
          gameState.particles.splice(index, 1);
        }
      });

      // Draw basket
      const basketY = canvas.height - 40;
      ctx.fillStyle = "#FFDB67";
      ctx.fillRect(gameState.basketX - 30, basketY, 60, 10);
      ctx.fillStyle = "#000";
      ctx.fillRect(gameState.basketX - 28, basketY + 2, 56, 6);

      gameState.animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (gameState.animationId) {
        cancelAnimationFrame(gameState.animationId);
      }
    };
  }, [isOpen, gameStarted]);

  const handleStart = () => {
    setGameStarted(true);
    setScore(0);
    gameStateRef.current.score = 0;
    gameStateRef.current.particles = [];
  };

  const handleClose = () => {
    setGameStarted(false);
    setScore(0);
    gameStateRef.current.particles = [];
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2147483647,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: "#000",
          border: "3px solid #0f0",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "650px",
          width: "90%",
          boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
          fontFamily: "monospace",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <h2 style={{ color: "#0f0", margin: 0, fontSize: "20px", textShadow: "0 0 10px #0f0" }}>
            🎮 {t.title}
          </h2>
          <div style={{ color: "#FFDB67", fontSize: "18px", marginTop: "8px", fontWeight: "bold" }}>
            {t.score}: {score}
          </div>
        </div>

        {/* Instructions */}
        {!gameStarted && (
          <div style={{ color: "#0f0", marginBottom: "15px", lineHeight: "1.5" }}>
            <p style={{ margin: "5px 0", color: "#0f0" }}>📋 <strong>{t.instructions}</strong></p>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#0f0" }}>• {t.inst1}</p>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#0f0" }}>• {t.inst2}</p>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#0f0" }}>• {t.inst3}</p>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#0f0" }}>• {t.inst4}</p>
            <p style={{ margin: "15px 0 5px 0", fontSize: "14px", color: "#FFDB67", fontWeight: "bold", textAlign: "center" }}>
              {t.note}
            </p>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            backgroundColor: "#000",
            border: "2px solid #0f0",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
        />

        {/* Buttons */}
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          {!gameStarted ? (
            <button
              onClick={handleStart}
              style={{
                backgroundColor: "#0f0",
                color: "#000",
                border: "none",
                padding: "12px 30px",
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: "monospace",
                boxShadow: "0 0 10px #0f0",
              }}
            >
              {t.start}
            </button>
          ) : (
            <button
              onClick={handleStart}
              style={{
                backgroundColor: "#FFDB67",
                color: "#000",
                border: "none",
                padding: "12px 30px",
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: "monospace",
              }}
            >
              {t.restart}
            </button>
          )}
          <button
            onClick={handleClose}
            style={{
              backgroundColor: "#ff0055",
              color: "#fff",
              border: "none",
              padding: "12px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "5px",
              cursor: "pointer",
              fontFamily: "monospace",
            }}
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BinaryRainGame;
