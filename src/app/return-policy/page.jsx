import { ArrowLeft } from "lucide-react";

export default function ReturnPolicyPage() {
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
              Return Policy
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Our Return Policy
            </h2>
            <p className="text-[#666]">
              We want you to be completely satisfied with your purchase. If
              you're not happy with your order, we're here to help.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Return Window
            </h3>
            <p className="text-[#666] mb-4">
              You have <strong>5 days from the date of delivery</strong> to
              return any item. If the item is returned in undamaged condition
              with all original tags attached, you will receive{" "}
              <strong>70% refund</strong> of your purchase price.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Return Conditions
            </h3>
            <p className="text-[#666] mb-4">
              Items are eligible for the 70% return policy if they:
            </p>
            <ul className="space-y-2 text-[#666]">
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Are returned within 5 days of delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Are unused and in undamaged condition</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Have all original tags attached</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Include original packaging</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Non-Returnable Items
            </h3>
            <p className="text-[#666] mb-4">
              The following items cannot be returned:
            </p>
            <ul className="space-y-2 text-[#666]">
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Worn or damaged items</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Items without original tags</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Clearance or final sale items</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>Custom or personalized items</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              How to Return
            </h3>
            <ol className="space-y-4 text-[#666]">
              <li className="flex gap-4">
                <span className="text-[#FF6B35] font-bold flex-shrink-0">
                  1.
                </span>
                <span>Contact us within 7 days of delivery</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#FF6B35] font-bold flex-shrink-0">
                  2.
                </span>
                <span>Provide your order number and reason for return</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#FF6B35] font-bold flex-shrink-0">
                  3.
                </span>
                <span>Receive return shipping instructions</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#FF6B35] font-bold flex-shrink-0">
                  4.
                </span>
                <span>Ship the item back to us in original packaging</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#FF6B35] font-bold flex-shrink-0">
                  5.
                </span>
                <span>Receive refund within 5-7 business days</span>
              </li>
            </ol>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Refunds
            </h3>
            <p className="text-[#666] mb-4">
              Once we receive and inspect your return, we'll process your refund
              within 5-7 business days. Refunds will be credited to your
              original payment method.
            </p>
          </div>

          <div className="bg-[#FFF5E6] rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-xl font-bold text-[#8B4513] mb-4 font-sora">
              Questions?
            </h3>
            <p className="text-[#666] mb-4">
              If you have any questions about our return policy, please contact
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
