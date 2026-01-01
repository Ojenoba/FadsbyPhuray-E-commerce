"use client";

import { useState } from "react";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would send this to your backend
      // For now, we'll just show a success message
      console.log("Contact form data:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-[#FF6B35] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="p-2 rounded-lg hover:bg-[#FFF5E6] transition-colors"
            >
              <ArrowLeft size={24} className="text-[#FF6B35]" />
            </a>
            <h1 className="text-2xl font-bold text-[#8B4513] font-sora">
              Contact Us
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
              Send us a Message
            </h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 rounded">
                <p className="text-green-700">
                  Thank you! We'll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="How can we help?"
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us more..."
                  rows="5"
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white rounded-lg font-semibold hover:from-[#E55A24] hover:to-[#FF7542] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
              <h2 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail
                    size={24}
                    className="text-[#FF6B35] flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-bold text-[#8B4513] mb-1">Email</h3>
                    <a
                      href="mailto:fadsbyphuray2001@gmail.com"
                      className="text-[#666] hover:text-[#FF6B35] transition-colors"
                    >
                      fadsbyphuray2001@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone
                    size={24}
                    className="text-[#FF6B35] flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-bold text-[#8B4513] mb-1">Phone</h3>
                    <a
                      href="tel:+2348109443159"
                      className="text-[#666] hover:text-[#FF6B35] transition-colors"
                    >
                      +234 810 944 3159
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin
                    size={24}
                    className="text-[#FF6B35] flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-bold text-[#8B4513] mb-1">Location</h3>
                    <p className="text-[#666]">
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
              <h3 className="text-xl font-bold text-[#8B4513] mb-4 font-sora">
                Business Hours
              </h3>
              <ul className="space-y-2 text-[#666]">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">Closed</span>
                </li>
              </ul>
            </div>

            {/* FAQ */}
            <div className="bg-[#FFF5E6] rounded-lg border-2 border-[#E8D4C4] p-8">
              <h3 className="text-xl font-bold text-[#8B4513] mb-4 font-sora">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-[#FF6B35] hover:text-[#E55A24] font-semibold transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/shipping"
                    className="text-[#FF6B35] hover:text-[#E55A24] font-semibold transition-colors"
                  >
                    Shipping Information
                  </a>
                </li>
                <li>
                  <a
                    href="/return-policy"
                    className="text-[#FF6B35] hover:text-[#E55A24] font-semibold transition-colors"
                  >
                    Return Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-[#FF6B35] hover:text-[#E55A24] font-semibold transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
