import React, { useCallback, useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
}

const PolygonBackground: React.FC = () => {
  const svgRef = useRef<HTMLDivElement>(null);
  const refreshTimeoutRef = useRef<number | null>(null);
  const pointsRef = useRef<Point[]>([]);

  const numPointsXRef = useRef<number>(0);
  const numPointsYRef = useRef<number>(0);
  const unitWidthRef = useRef<number>(0);
  const unitHeightRef = useRef<number>(0);

  const refreshDuration = 10000;

  const randomize = useCallback(() => {
    pointsRef.current.forEach((point) => {
      if (point.originX !== 0 && point.originX !== unitWidthRef.current * (numPointsXRef.current - 1)) {
        point.x = point.originX + Math.random() * unitWidthRef.current - unitWidthRef.current / 2;
      }
      if (point.originY !== 0 && point.originY !== unitHeightRef.current * (numPointsYRef.current - 1)) {
        point.y = point.originY + Math.random() * unitHeightRef.current - unitHeightRef.current / 2;
      }
    });
  }, []);

  const refresh = useCallback(() => {
    randomize();
    if (svgRef.current) {
      Array.from(svgRef.current.querySelectorAll("polygon")).forEach((polygon: SVGPolygonElement) => {
        const animate = polygon.querySelector("animate") as SVGAnimateElement;
        if (animate.getAttribute("to")) {
          animate.setAttribute("from", animate.getAttribute("to") || "");
        }
        const point1 = pointsRef.current[(polygon as any).point1];
        const point2 = pointsRef.current[(polygon as any).point2];
        const point3 = pointsRef.current[(polygon as any).point3];
        animate.setAttribute("to", `${point1.x},${point1.y} ${point2.x},${point2.y} ${point3.x},${point3.y}`);
        animate.beginElement();
      });
    }
    refreshTimeoutRef.current = window.setTimeout(refresh, refreshDuration);
  }, [randomize]); // Include any dependencies here

  useEffect(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", window.outerWidth.toString());
    svg.setAttribute("height", window.outerHeight.toString());
    svgRef.current?.appendChild(svg);

    const unitSize = (window.innerWidth + window.innerHeight) / 15;
    numPointsXRef.current = Math.ceil(window.innerWidth / unitSize) + 1;
    numPointsYRef.current = Math.ceil(window.innerHeight / unitSize) + 1;
    unitWidthRef.current = Math.ceil(window.innerWidth / (numPointsXRef.current - 1));
    unitHeightRef.current = Math.ceil(window.innerHeight / (numPointsYRef.current - 1));

    for (let y = 0; y < numPointsYRef.current; y++) {
      for (let x = 0; x < numPointsXRef.current; x++) {
        pointsRef.current.push({
          x: unitWidthRef.current * x,
          y: unitHeightRef.current * y,
          originX: unitWidthRef.current * x,
          originY: unitHeightRef.current * y,
        });
      }
    }

    randomize();

    pointsRef.current.forEach((point, i) => {
      if (point.originX !== unitWidthRef.current * (numPointsXRef.current - 1) && point.originY !== unitHeightRef.current * (numPointsYRef.current - 1)) {
        const topLeftX = point.x;
        const topLeftY = point.y;
        const topRightX = pointsRef.current[i + 1].x;
        const topRightY = pointsRef.current[i + 1].y;
        const bottomLeftX = pointsRef.current[i + numPointsXRef.current].x;
        const bottomLeftY = pointsRef.current[i + numPointsXRef.current].y;
        const bottomRightX = pointsRef.current[i + numPointsXRef.current + 1].x;
        const bottomRightY = pointsRef.current[i + numPointsXRef.current + 1].y;

        const rando = Math.floor(Math.random() * 2);

        for (let n = 0; n < 2; n++) {
          const polygon = document.createElementNS(svg.namespaceURI, "polygon");

          if (rando === 0) {
            if (n === 0) {
              (polygon as any).point1 = i;
              (polygon as any).point2 = i + numPointsXRef.current;
              (polygon as any).point3 = i + numPointsXRef.current + 1;
              polygon.setAttribute("points", `${topLeftX},${topLeftY} ${bottomLeftX},${bottomLeftY} ${bottomRightX},${bottomRightY}`);
            } else if (n === 1) {
              (polygon as any).point1 = i;
              (polygon as any).point2 = i + 1;
              (polygon as any).point3 = i + numPointsXRef.current + 1;
              polygon.setAttribute("points", `${topLeftX},${topLeftY} ${topRightX},${topRightY} ${bottomRightX},${bottomRightY}`);
            }
          } else if (rando === 1) {
            if (n === 0) {
              (polygon as any).point1 = i;
              (polygon as any).point2 = i + numPointsXRef.current;
              (polygon as any).point3 = i + 1;
              polygon.setAttribute("points", `${topLeftX},${topLeftY} ${bottomLeftX},${bottomLeftY} ${topRightX},${topRightY}`);
            } else if (n === 1) {
              (polygon as any).point1 = i + numPointsXRef.current;
              (polygon as any).point2 = i + 1;
              (polygon as any).point3 = i + numPointsXRef.current + 1;
              polygon.setAttribute("points", `${bottomLeftX},${bottomLeftY} ${topRightX},${topRightY} ${bottomRightX},${bottomRightY}`);
            }
          }
          polygon.setAttribute("fill", `rgba(0,0,0,${Math.random() / 3})`);
          const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
          animate.setAttribute("fill", "freeze");
          animate.setAttribute("attributeName", "points");
          animate.setAttribute("dur", `${refreshDuration}ms`);
          animate.setAttribute("calcMode", "linear");
          polygon.appendChild(animate);
          svg.appendChild(polygon);
        }
      }
    });

    refresh();

    return () => {
      if (refreshTimeoutRef.current !== null) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [refresh, randomize]);

  return <div id="bg" className="bg-traingle" ref={svgRef}></div>;
};

export default PolygonBackground;
