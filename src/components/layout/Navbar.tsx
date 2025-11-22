import { Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="relative inline-block">
              <span className="text-xl font-bold text-[#0F1E3D] tracking-tight" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800 }}>
                NUSUQAI
              </span>
              <span className="absolute bottom-0.5 font-bold text-[#0F1E3D]" style={{ fontSize:'0.6rem', fontFamily: 'Raleway, sans-serif' }}>
                .COM
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#services" className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors">
              Services
            </a>
            <a href="#portfolio" className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors">
              Our Work
            </a>
            <a href="#usecases" className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors">
              Use Cases
            </a>
            <a href="#about" className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors">
              About us
            </a>
            <a href="#contact" className="text-[#0F1E3D] hover:text-[#00D4C2] transition-colors">
              Contact
            </a>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 text-[#0F1E3D] cursor-pointer hover:text-[#00D4C2] transition-colors">
            <Globe className="w-5 h-5" />
            <span>English</span>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
