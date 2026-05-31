import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
const Header = ({ setNavOpen, navOpen, classes }: { setNavOpen: Dispatch<SetStateAction<boolean>>; navOpen: boolean; classes?: string }) => {
  return (
    <header className="header">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link href="/" className={classes}>
          <Logo showText={true} />
        </Link>

        <button onClick={() => setNavOpen((p) => !p)} className="bg-transparent border-0 d-xl-none">
          <div className={`nav-icon ${navOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
