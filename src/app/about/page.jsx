import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
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
              About Us
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#8B4513] text-white rounded-lg p-8 mb-8">
            <h2 className="text-4xl font-bold mb-2 font-sora">
              FADs by PHURAY
            </h2>
            <p className="text-lg italic font-serif text-[#FFE8CC]">
              fascinating & trendy
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="space-y-8">
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Our Story
            </h3>
            <p className="text-[#666] leading-relaxed mb-4">
              FADs by PHURAY is a premier fashion brand dedicated to bringing
              you affordable yet elegant apparel that doesn't compromise on
              style or quality. We believe that looking fabulous shouldn't break
              the bank. Our carefully curated collections showcase sleek,
              sophisticated designs that make you feel confident and beautiful.
            </p>
            <p className="text-[#666] leading-relaxed mb-4">
              We also specialize in sleek, affordable jewelry that perfectly
              complements our fashion lines. From statement pieces to timeless
              classics, our jewelry collection is designed to elevate any outfit
              with elegance and style—all at prices that work for your budget.
            </p>
            <p className="text-[#666] leading-relaxed">
              Founded with a passion for quality and design, we curate
              collections that blend traditional elegance with contemporary
              trends, making fashion and luxury accessible to everyone who wants
              to look and feel their best.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Our Mission
            </h3>
            <p className="text-[#666] leading-relaxed">
              We are committed to providing our customers with premium quality,
              elegant apparel and jewelry at affordable prices. Our mission is
              to empower individuals through fashion by offering diverse,
              trendy, and high-quality collections that suit every style,
              occasion, and budget.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Why Choose Us?
            </h3>
            <ul className="space-y-3 text-[#666]">
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">✓</span>
                <span>
                  <strong>Affordable & Elegant Apparel:</strong> Premium designs
                  at prices you can afford
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">✓</span>
                <span>
                  <strong>Sleek & Affordable Jewelry:</strong> Beautiful, trendy
                  pieces that won't break the bank
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">✓</span>
                <span>
                  <strong>Fast Shipping:</strong> Quick delivery across Nigeria
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">✓</span>
                <span>
                  <strong>Customer Support:</strong> Friendly and responsive
                  customer service
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] font-bold">✓</span>
                <span>
                  <strong>Referral Rewards:</strong> Earn bonuses by referring
                  friends
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Our Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-[#8B4513] mb-2">Quality</h4>
                <p className="text-[#666] text-sm">
                  We believe in delivering products that exceed expectations
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#8B4513] mb-2">Integrity</h4>
                <p className="text-[#666] text-sm">
                  Honest dealings and transparent business practices
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#8B4513] mb-2">
                  Customer First
                </h4>
                <p className="text-[#666] text-sm">
                  Your satisfaction is our top priority
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#8B4513] mb-2">Innovation</h4>
                <p className="text-[#666] text-sm">
                  Continuously bringing new and exciting collections
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <a
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white font-bold rounded-lg hover:from-[#E55A24] hover:to-[#FF7542] transition-all"
          >
            Start Shopping
          </a>
        </section>
      </div>
    </div>
  );
}
