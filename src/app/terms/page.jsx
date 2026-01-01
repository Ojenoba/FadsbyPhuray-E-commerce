import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
              Terms & Conditions
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Terms & Conditions
            </h2>
            <p className="text-[#666]">
              These terms and conditions govern your use of the FADs by PHURAY
              website. By accessing or using this website, you agree to be bound
              by these terms.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              1. User Responsibilities
            </h3>
            <ul className="space-y-2 text-[#666]">
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>
                  You must be at least 18 years old to use this website
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>
                  You agree to provide accurate and complete information
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>
                  You are responsible for maintaining account security
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>You agree not to engage in unlawful activities</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              2. Ordering & Payments
            </h3>
            <p className="text-[#666] mb-4">
              When you place an order, you are making an offer to purchase
              products. We reserve the right to accept or reject any order. All
              prices are in Nigerian Naira (₦) and are subject to change without
              notice. Payment must be received before your order is processed.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              3. Product Information
            </h3>
            <p className="text-[#666]">
              We make every effort to ensure that product descriptions and
              prices are accurate. However, we do not warrant that product
              descriptions, pricing, or other content is error-free. If a
              product is mispriced or misdescribed, we reserve the right to
              cancel the order.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              4. Intellectual Property
            </h3>
            <p className="text-[#666]">
              All content on this website, including text, images, logos, and
              trademarks, is the property of FADs by PHURAY or its content
              suppliers. You may not reproduce, modify, or distribute any
              content without express written permission.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              5. Limitation of Liability
            </h3>
            <p className="text-[#666]">
              To the fullest extent permitted by law, FADs by PHURAY shall not
              be liable for any indirect, incidental, special, or consequential
              damages arising out of or related to your use of this website or
              products purchased.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              6. Referral Program
            </h3>
            <ul className="space-y-2 text-[#666]">
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Users receive a unique referral code</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>
                  Referrals earn ₦500 when referred user completes first
                  purchase
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Referral bonuses are credited to user wallet</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Bonuses can be used for purchases or withdrawn</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              7. Modifications to Terms
            </h3>
            <p className="text-[#666]">
              FADs by PHURAY reserves the right to modify these terms and
              conditions at any time. Your continued use of the website
              constitutes acceptance of any modifications.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              8. Governing Law
            </h3>
            <p className="text-[#666]">
              These terms and conditions are governed by the laws of Nigeria.
              Any disputes shall be resolved in the courts of Lagos, Nigeria.
            </p>
          </div>

          <div className="bg-[#FFF5E6] rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-xl font-bold text-[#8B4513] mb-4 font-sora">
              Questions?
            </h3>
            <p className="text-[#666] mb-4">
              If you have any questions about these terms, please contact us.
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
