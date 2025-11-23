'use client';

import { ReactNode, SetStateAction, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="max-w-7xl mx-auto">
    {children}
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [showLangMenu, setShowLangMenu] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLanguage = (lang: SetStateAction<string>) => {
    setLanguage(lang);
    setShowLangMenu(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 relative w-[140px] sm:w-[180px] lg:w-[200px]">
            <Link href="/" className="block w-full h-full">
              <Image
                src="/logo.png"
                alt="NUSUQAI Logo"
                width={1074}
                height={313}
                priority
                className="object-contain" 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  maxWidth: '100%' 
                }}
                sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
              />
            </Link>
          </div>
          {/* --- DESKTOP NAVIGATION LINKS --- */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="#services" className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors">
              Services
            </Link>
            <Link href="#portfolio" className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors">
              Our Work
            </Link>
            <Link href="#usecases" className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors">
              Use Cases
            </Link>
            <Link href="#about" className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors">
              About us
            </Link>
            <Link href="#contact" className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors">
              Contact
            </Link>
          </div>

          {/* --- DESKTOP LANGUAGE SELECTOR --- */}
          <div className="hidden lg:block relative group">
            <div className="flex items-center gap-2 text-[#0F1E3D] cursor-pointer font-semibold transition-colors group-hover:text-[#00D4C2]">
              <span className="text-sm">{language}</span>
            </div>

            <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[120px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => toggleLanguage("EN")}
                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                  language === "EN" 
                    ? "text-[#00D4C2] font-semibold bg-gray-50" 
                    : "text-[#0F1E3D] hover:bg-gray-50"
                }`}
              >
                <span className="font-semibold">EN</span>
                <span className="font-normal">English</span>
              </button>
              <button
                onClick={() => toggleLanguage("AR")}
                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                  language === "AR" 
                    ? "text-[#00D4C2] font-semibold bg-gray-50" 
                    : "text-[#0F1E3D] hover:bg-gray-50"
                }`}
              >
                <span className="font-semibold">AR</span>
                <span className="font-normal">العربية</span>
              </button>
            </div>
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-[#0F1E3D] hover:text-[#00D4C2] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* --- MOBILE MENU CONTENT --- */}
        {isOpen && (
          <div className="lg:hidden py-4 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <Link 
                href="#services" 
                className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors py-2"
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link 
                href="#portfolio" 
                className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors py-2"
                onClick={toggleMenu}
              >
                Our Work
              </Link>
              <Link 
                href="#usecases" 
                className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors py-2"
                onClick={toggleMenu}
              >
                Use Cases
              </Link>
              <Link 
                href="#about" 
                className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors py-2"
                onClick={toggleMenu}
              >
                About us
              </Link>
              <Link 
                href="#contact" 
                className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors py-2"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center gap-2 text-[#0F1E3D] mb-3">
                  <span className="font-semibold">Language: {language === "EN" ? "English" : "العربية"}</span>
                </div>
                <div className="flex flex-col gap-2 pl-2">
                  <button
                    onClick={() => {
                      toggleLanguage("EN");
                      toggleMenu();
                    }}
                    className={`text-left py-1 px-3 rounded transition-colors ${
                      language === "EN" 
                        ? "text-[#00D4C2] font-semibold bg-gray-50" 
                        : "text-[#0F1E3D] hover:bg-gray-50"
                    }`}
                  >
                    EN - English
                  </button>
                  <button
                    onClick={() => {
                      toggleLanguage("AR");
                      toggleMenu();
                    }}
                    className={`text-left py-1 px-3 rounded transition-colors ${
                      language === "AR" 
                        ? "text-[#00D4C2] font-semibold bg-gray-50" 
                        : "text-[#0F1E3D] hover:bg-gray-50"
                    }`}
                  >
                    AR - العربية
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}