"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const colors = ["255, 219, 103", "255, 145, 251", "253, 187, 46", "238, 232, 170", "0, 255, 255", "0, 254, 156"];
const ColorSwitcher = () => {
  const [opened, setOpened] = useState(false);
  const [grain, setGrain] = useState(false);
  const [currentDir, setCurrentDir] = useState("ltr");
  const handleColorChange = (color: string) => {
    localStorage.setItem("color", color);
    document.documentElement.style.setProperty("--primary", color);
  };
  const changeDirection = (dir: string) => {
    localStorage.setItem("dir", dir);
    document.documentElement.dir = dir;
    setCurrentDir(dir);
  };
  const handleGrain = (e: ChangeEvent<HTMLInputElement>) => {
    setGrain(e.target.checked);
  };
  useEffect(() => {
    const savedDir = localStorage.getItem("dir");
    if (savedDir) {
      document.documentElement.dir = savedDir;
      setCurrentDir(savedDir);
    }
  }, []);
  return (
    <OutsideClickHandler onOutsideClick={() => setOpened(false)}>
      <div id="grain" className={grain ? "grain" : ""}></div>
      <div className={`color-switcher ${opened ? "opened" : ""}`}>
        <button onClick={() => setOpened((p) => !p)} className="color-switcher-btn">
          <i className="ph ph-gear-six"></i>
        </button>
        <div className="pallets d-flex flex-column align-items-center gap-4 justify-content-center">
          <div className="row row-cols-3 g-3">
            {colors.map((color) => (
              <div className="col" key={color}>
                <button onClick={() => handleColorChange(color)} style={{ backgroundColor: `rgb(${color})` }} className="color-btn w-100"></button>
              </div>
            ))}
          </div>
          <div className="d-flex gap-3 justify-content-between">
            <button onClick={() => changeDirection("ltr")} className={`px-3 py-2 ltr border-0 ${currentDir == "ltr" ? "active" : ""}`}>
              LTR
            </button>
            <button onClick={() => changeDirection("rtl")} className={`px-3 py-2 rtl border-0 ${currentDir == "rtl" ? "active" : ""}`}>
              RTL
            </button>
          </div>
          <div className="d-flex align-items-center gap-3">
            <label htmlFor="grained" className="select-none cursor-pointer">
              Grained BG
            </label>
            <input type="checkbox" onChange={handleGrain} id="grained" className="grained-checkbox" />
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default ColorSwitcher;
