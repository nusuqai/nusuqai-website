'use client';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer dir="ltr" className=" bg-nusuqai-deep-navy text-gray-300" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl text-white">Nusuq AI</span>
            </div>
            <p className="text-sm mb-4">
              AI Integration Experts helping businesses connect their tools and workflows with AI assistants.
            </p>
            <div className="flex gap-3">
              
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">
                  MCP Development
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">
                  AI Automation
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">
                  RAG Systems
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">
                  Custom Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('use-cases')} className="hover:text-white transition-colors">
                  Use Cases
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:hello@nusuqai.com" className="hover:text-white transition-colors">
                  hello@nusuqai.com
                </a>
              </li>
              <li>
                <a href="https://nusuqai.com" className="hover:text-white transition-colors">
                  www.nusuqai.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; 2025 Nusuq AI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
