'use client';
import { useState } from 'react';
import { ArrowRight, Mail, Building, User, MessageSquare } from 'lucide-react';

export default function CTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/xzzwlwae', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Schedule a free consultation with us. We'll assess your 
              needs and show you how AI can work seamlessly with your existing infrastructure.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <a href="mailto:hello@nusuqai.com" className="text-gray-600 hover:underline">
                    hello@nusuqai.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building size={20} className="text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone Number</h3>
                  <p className="text-gray-600">+01234567890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight size={32} className="text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-green-900 mb-2">Form Submitted Successfully!</h4>
                <p className="text-green-700">You will hear from us back shortly.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Tell us about your needs
                  </label>
                  <div className="relative">
                    <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="What AI integration challenges are you looking to solve?"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  className="w-full bg-nusuqai-navy hover:bg-cyan-950 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center group"
                >
                  Book a Meeting
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our privacy policy.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}