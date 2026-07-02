'use client';
import { useEffect } from 'react';
import { Mail, Building } from 'lucide-react';
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("CTA");

  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existing = document.querySelector('script[src*="calendly"]');
      if (existing) existing.remove();
    };
  }, []);

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column: info */}
          <div className="lg:sticky lg:top-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("title")}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t("description")}
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#00D4C2]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-[#00D4C2]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("emailLabel")}</h3>
                  <a href="mailto:hello@nusuqai.com" className="text-gray-600 hover:text-[#00D4C2] hover:underline transition-colors">
                    hello@nusuqai.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#00D4C2]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building size={20} className="text-[#00D4C2]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("phoneLabel")}</h3>
                  <p className="text-gray-600">+01234567890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Calendly embed */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex-1 w-full max-w-full">
            <div
              className="calendly-inline-widget w-full"
              data-url={process.env.NEXT_PUBLIC_CALENDLY_URL}
              style={{ minWidth: '320px', height: '660px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}