import { ArrowLeft } from "lucide-react";

export default function ShippingPage() {
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
              Shipping Information
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Fast & Reliable Shipping
            </h2>
            <p className="text-[#666] mb-4">
              We offer fast and reliable shipping across Nigeria. Your orders
              are carefully packed and shipped to ensure they arrive in perfect
              condition.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
              Shipping Rates & Timeline
            </h3>
            <div className="space-y-4">
              <div className="border-b border-[#E8D4C4] pb-4">
                <h4 className="font-bold text-[#8B4513] mb-2">
                  Lagos Express Delivery
                </h4>
                <p className="text-[#666] text-sm mb-2">1-2 Working Days</p>
                <p className="text-[#FF6B35] font-bold">₦8,000</p>
              </div>
              <div className="border-b border-[#E8D4C4] pb-4">
                <h4 className="font-bold text-[#8B4513] mb-2">
                  Within Lagos Delivery
                </h4>
                <p className="text-[#666] text-sm mb-2">3-5 Working Days</p>
                <p className="text-[#FF6B35] font-bold">₦6,500</p>
              </div>
              <div className="border-b border-[#E8D4C4] pb-4">
                <h4 className="font-bold text-[#8B4513] mb-2">
                  Interstate Delivery (Bus Garages Pick-up)
                </h4>
                <p className="text-[#666] text-sm mb-2">4-7 Working Days</p>
                <p className="text-[#FF6B35] font-bold">₦5,500</p>
              </div>
              <div className="border-b border-[#E8D4C4] pb-4">
                <h4 className="font-bold text-[#8B4513] mb-2">
                  Interstate Delivery (Doorstep Delivery)
                </h4>
                <p className="text-[#666] text-sm mb-2">4-7 Working Days</p>
                <p className="text-[#FF6B35] font-bold">₦9,000</p>
              </div>
              <div>
                <h4 className="font-bold text-[#8B4513] mb-2">Free Shipping</h4>
                <p className="text-[#666] text-sm mb-2">
                  On orders above ₦50,000
                </p>
                <p className="text-green-600 font-bold">FREE</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Shipping Process
            </h3>
            <ol className="space-y-4 text-[#666]">
              <li className="flex gap-4">
                <span className="text-[#FF6B35] font-bold flex-shrink-0">
                  1.
                </span>
                <span>Place your order and proceed to checkout</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#FF6B35] font-bold flex-shrink-0">
                  2.
                </span>
                <span>
                  Receive confirmation email with tracking information
                </span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#FF6B35] font-bold flex-shrink-0">
                  3.
                </span>
                <span>Order is prepared and packed with care</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#FF6B35] font-bold flex-shrink-0">
                  4.
                </span>
                <span>Package is dispatched and tracking updated</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#FF6B35] font-bold flex-shrink-0">
                  5.
                </span>
                <span>Package delivered to your address</span>
              </li>
            </ol>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Tracking Your Order
            </h3>
            <p className="text-[#666] mb-4">
              Once your order ships, you'll receive an email with a tracking
              number. You can use this number to monitor your package in
              real-time on our website or with our shipping partner.
            </p>
            <p className="text-[#666]">
              You can also check your order status anytime by logging into your
              account and visiting the Order History section.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Shipping Policy
            </h3>
            <ul className="space-y-3 text-[#666]">
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>
                  Orders are processed within 24 hours of payment confirmation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>We do not ship on weekends or public holidays</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>
                  Delivery times are estimates and may vary due to unforeseen
                  circumstances
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>
                  Customers are responsible for providing accurate delivery
                  address
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">•</span>
                <span>All packages are insured during transit</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#FFF5E6] rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-xl font-bold text-[#8B4513] mb-4 font-sora">
              Need Help?
            </h3>
            <p className="text-[#666] mb-4">
              If you have any questions about shipping or need to track your
              order, please don't hesitate to contact us.
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
