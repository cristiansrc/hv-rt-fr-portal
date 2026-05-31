import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const BgDotsAnim: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let width: number,
      height: number,
      canvas: HTMLCanvasElement | null,
      ctx: CanvasRenderingContext2D | null,
      points: Point[],
      target: Target,
      animateHeader = true;

    const pointDistance = 45;
    const pointRadius = 2;

    interface Target {
      x: number;
      y: number;
    }

    interface Point {
      x: number;
      y: number;
      originX: number;
      originY: number;
      closest?: Point[];
      circle?: Circle;
      opacity?: number;
    }

    class Circle {
      pos: Point;
      radius: number;
      color: string;
      opacity: number;

      constructor(pos: Point, rad: number, color: string) {
        this.pos = pos;
        this.radius = rad;
        this.color = color;
        this.opacity = 1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      target = { x: width / 2, y: height / 2 };

      canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext("2d");
      initPoints();
    }

    function addListeners() {
      if (!("ontouchstart" in window)) {
        window.addEventListener("mousemove", mouseMove);
      }
      window.addEventListener("resize", resize);
    }

    function initAnimation() {
      gsap.ticker.add(animate);
    }

    function animate() {
      if (animateHeader) {
        drawPoints();
      }
    }

    function mouseMove(e: MouseEvent) {
      target.x = e.clientX || e.pageX;
      target.y = e.clientY || e.pageY;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (!canvas) return;
      canvas.width = width;
      canvas.height = height;

      points.forEach((point) => {
        gsap.killTweensOf(point);
      });

      initPoints();
    }

    function initPoints() {
      points = [];
      for (let x = 0; x <= width / pointDistance; x++) {
        for (let y = 0; y < height / pointDistance; y++) {
          let px = x * pointDistance;
          let py = y * pointDistance;
          let p: Point = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      points.forEach((p1) => {
        p1.closest = points
          .filter((p2) => p1 !== p2)
          .sort((a, b) => getDistance(p1, a) - getDistance(p1, b))
          .slice(0, 5);

        p1.circle = new Circle(p1, pointRadius, "rgba(0, 0, 0, 1)");
        shiftPoint(p1);
      });
    }

    function drawPoints() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      points.forEach((point) => {
        const distance = getDistance(target, point);
        point.opacity = distance < 4000 ? 0.15 : distance < 20000 ? 0.05 : distance < 40000 ? 0.01 : 0;
        point.circle!.opacity = distance < 20000 ? 0.5 : distance < 40000 ? 0.4 : 0.3;

        point.circle!.color = "rgba(0, 0, 0,0.3)";
        drawLines(point);
        point.circle!.draw();
      });
    }

    function shiftPoint(p: Point) {
      gsap.to(p, {
        duration: 1 + Math.random(),
        x: p.originX + Math.random() * (pointDistance / 2),
        y: p.originY + Math.random() * (pointDistance / 2),
        ease: "circ.inOut",
        onComplete: () => shiftPoint(p),
      });
    }

    function drawLines(p: Point) {
      if (!ctx || !p.closest) return;
      p.closest.forEach((closest) => {
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(closest.x, closest.y);
        ctx!.strokeStyle = `rgba(0, 0, 0, ${p.opacity})`;
        ctx!.stroke();
      });
    }

    function getDistance(p1: Target | Point, p2: Point) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(animate);
    };
  }, []);

  return <canvas ref={canvasRef} id="background-canvas"></canvas>;
};

export default BgDotsAnim;
