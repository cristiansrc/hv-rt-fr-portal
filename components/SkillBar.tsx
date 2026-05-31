import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import React, { useEffect, useState } from "react";
// Adjust the import path as needed

interface SkillBarProps {
  skill: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, percentage }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.5, // Adjust as needed
  });
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (isIntersecting) {
      setWidth(percentage);
    }
  }, [isIntersecting, percentage]);

  return (
    <div className="skill" ref={ref}>
      <div className="d-flex justify-content-between align-items-center">
        <span>{skill}</span>
      </div>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${width}%`, transition: "width 1s ease-in-out" }}></div>
      </div>
    </div>
  );
};

export default SkillBar;
