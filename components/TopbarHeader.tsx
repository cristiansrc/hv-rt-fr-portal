import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import ProtectedEmail from "@/components/ProtectedEmail";
import { useResume } from "@/contexts/ResumeContext";

const TopbarHeader = ({ setNavOpen, navOpen, classes }: { setNavOpen: Dispatch<SetStateAction<boolean>>; navOpen: boolean; classes?: string }) => {
  const { data } = useResume();
  
  return (
    <header className="header-topbar">
      <div className="container d-flex align-items-center justify-content-between">
        <Link href="/">
          <Logo showText={true} />
        </Link>

        <div className="d-flex gap-2 gap-sm-3 align-items-center">
          <ProtectedEmail 
            fallback="email@example.com"
            asLink={true}
            className="d-flex gap-2 align-items-center"
            showIcon={true}
            iconClassName="ph ph-envelope"
          />
          <button onClick={() => setNavOpen((p) => !p)} className="bg-transparent border-0">
            <div className={`nav-icon ${navOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
      <nav className={`navigation-topbar ${navOpen ? "opened" : ""}`} id="navigation">
        <ul>
          <li className="nav-link" onClick={() => setNavOpen(false)}>
            <Link href="#top" className="active">
              <span className="text">top</span>
            </Link>
          </li>
          <li className="nav-link" onClick={() => setNavOpen(false)}>
            <Link href="#about_me">
              <span className="text">about me</span>
            </Link>
          </li>
          <li className="nav-link" onClick={() => setNavOpen(false)}>
            <Link href="#services">
              <span className="text">my services</span>
            </Link>
          </li>
          <li className="nav-link" onClick={() => setNavOpen(false)}>
            <Link href="#attainments">
              <span className="text">skills</span>
            </Link>
          </li>
          <li className="nav-link" onClick={() => setNavOpen(false)}>
            <Link href="#fun_facts">
              <span className="text">facts</span>
            </Link>
          </li>
          <li className="nav-link" onClick={() => setNavOpen(false)}>
            <Link href="#experience">
              <span className="text">experiences</span>
            </Link>
          </li>
          <li className="nav-link" onClick={() => setNavOpen(false)}>
            <Link href="#projects">
              <span className="text">projects</span>
            </Link>
          </li>
          <li className="nav-link" onClick={() => setNavOpen(false)}>
            <Link href="#how_i_work">
              <span className="text">how i work</span>
            </Link>
          </li>
          <li className="nav-link" onClick={() => setNavOpen(false)}>
            <Link href="#testimonials">
              <span className="text">testimonials</span>
            </Link>
          </li>
          <li className="nav-link" onClick={() => setNavOpen(false)}>
            <Link href="#contact">
              <span className="text">contact</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div onClick={() => setNavOpen(false)} className="nav-overlay"></div>
    </header>
  );
};

export default TopbarHeader;
