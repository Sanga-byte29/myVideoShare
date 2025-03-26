import React, { ReactNode } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black p-4 text-white border-b border-black">
        <div className="flex justify-end items-center gap-3 md:gap-5 lg:gap-7 capitalize pr-4">
           <Link to={"/"}>Home</Link>
           <Link to={"/all-videos"}>All Videos</Link>
           <Link to={"/sign-in"}>Login</Link>

        </div>
      </nav>

      {/* Main Content Area with Padding to Avoid Navbar Overlap */}
      <main className="flex-1 flex flex-col items-center w-full mt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-center py-6 border-t-[1px] border-t-black z-50">
        <div className="flex justify-center gap-6 mb-4 text-white">
          <a
            href="https://github.com/Sanga-byte29"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>

          <a
            href="https://www.linkedin.com/in/sangram-subudhi29/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className="text-sm text-gray-300 mb-2">
          Sharing the joy of videos with the world.
        </p>
        <p className="text-sm text-gray-300">
          Copyright © 2025 My Video Hub. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
