import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-white">
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
              Privacy Policy
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Privacy Policy
            </h2>
            <p className="text-[#666]">
              Your privacy is important to us. This Privacy Policy explains how
              FADs by PHURAY collects, uses, and protects your personal
              information.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Information We Collect
            </h3>
            <p className="text-[#666] mb-4">
              We collect the following information when you use our website:
            </p>
            <ul className="space-y-2 text-[#666]">
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>
                  <strong>Contact Information:</strong> Name, email, phone
                  number, and address
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>
                  <strong>Payment Information:</strong> Card details processed
                  securely through Flutterwave
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>
                  <strong>Browsing Information:</strong> IP address, browser
                  type, and pages visited
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>
                  <strong>Order History:</strong> Products purchased and order
                  details
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              How We Use Your Information
            </h3>
            <ul className="space-y-2 text-[#666]">
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>To process orders and payments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>To send order updates and shipment tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>To improve our website and services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>To send promotional emails (if you opt-in)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Data Security & Protection
            </h3>
            <p className="text-[#666] mb-4">
              At FADs by PHURAY, we take your privacy very seriously. Your
              personal information and payment details are protected from third
              parties. We do not store or retain your sensitive information on
              our servers. All payment processing is handled securely through
              Flutterwave, which uses industry-standard encryption and security
              protocols.
            </p>
            <p className="text-[#666]">
              We use industry-standard SSL (Secure Sockets Layer) technology to
              encrypt all data transmitted between your browser and our website.
              Your information is never shared with third parties without your
              explicit consent.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Cookies
            </h3>
            <p className="text-[#666]">
              Our website uses cookies to enhance your browsing experience.
              Cookies help us remember your preferences and improve the
              functionality of our website. You can control cookie settings
              through your browser.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Third-Party Services
            </h3>
            <p className="text-[#666]">
              We use Flutterwave for payment processing. Flutterwave has their
              own privacy policies and security measures. We do not share your
              personal information with any other third parties.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Your Rights
            </h3>
            <p className="text-[#666] mb-4">You have the right to:</p>
            <ul className="space-y-2 text-[#666]">
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Access your personal information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Correct inaccurate information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Request deletion of your data</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#FFF5E6] rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-xl font-bold text-[#8B4513] mb-4 font-sora">
              Contact Us
            </h3>
            <p className="text-[#666] mb-4">
              If you have any questions about our privacy policy, please contact
              us.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
