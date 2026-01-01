"use client";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FaqPage() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click on the 'Sign Up' button in the header and fill in your email and password. You'll receive a confirmation email to verify your account. Once verified, you can start shopping!",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods including credit cards (Visa, Mastercard), debit cards, and mobile money transfers through our secure payment partner Flutterwave.",
    },
    {
      question: "What are your shipping rates?",
      answer:
        "We offer flexible shipping options to suit your needs. Express Delivery (Same Day or Next Day): ₦15,000. Nigeria Standard Delivery (5-7 Working Days): ₦8,000. Free Shipping is available on orders above ₦50,000.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Our products are delivered based on your chosen shipping method. Express delivery arrives same day or next day, while Standard delivery takes 5-7 working days. Shipping times exclude weekends and public holidays.",
    },
    {
      question: "What is your return policy?",
      answer:
        "You have 5 days from the date of delivery to return any item. If the item is returned in undamaged condition with all original tags attached, you will receive a 70% refund of your purchase price.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes! We offer free shipping on orders above ₦50,000. For orders below this amount, shipping charges apply based on your location (Lagos Express: ₦1,500, Nigeria Standard: ₦2,500).",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive an email with a tracking number. You can use this number to monitor your package in real-time on our website or with our shipping partner. You can also check your order status in your account dashboard.",
    },
    {
      question: "What is the referral program?",
      answer:
        "Share your unique referral code with friends. When they sign up using your code and complete their first purchase, you earn ₦500 bonus in your wallet. There's no limit to how many friends you can refer!",
    },
    {
      question: "How do I withdraw money from my wallet?",
      answer:
        "Go to your dashboard and click on 'Withdrawal Requests'. Enter your bank details, the amount you wish to withdraw, and submit. We process withdrawals within 5-7 business days.",
    },
    {
      question: "Are my payment details secure?",
      answer:
        "Yes, absolutely! Your payment information and personal data are protected from third parties. We use industry-standard SSL encryption and do not store sensitive payment information. All transactions are processed securely through Flutterwave.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer:
        "Orders can only be modified or cancelled within 1 hour of placement. Please contact our support team immediately if you need to make changes to your order.",
    },
    {
      question: "What if an item arrives damaged?",
      answer:
        "If your item arrives damaged, contact us within 24 hours with photos as proof. We'll arrange a replacement or full refund immediately. Your satisfaction is our priority!",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach us through our contact page, email us at fadsbyphuray2001@gmail.com, or call +234 810 944 3159. We're available Monday-Saturday, 9 AM - 6 PM.",
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
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
              Frequently Asked Questions
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Got Questions? We've Got Answers!
            </h2>
            <p className="text-[#666]">
              Here are the answers to our most commonly asked questions. If you
              can't find what you're looking for, feel free to{" "}
              <a
                href="/contact"
                className="text-[#FF6B35] font-semibold hover:underline"
              >
                contact our support team
              </a>
              .
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border-2 border-[#E8D4C4] overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-[#FFF5E6] transition-colors text-left"
                >
                  <h3 className="text-lg font-bold text-[#8B4513] font-sora">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={24}
                    className={`text-[#FF6B35] flex-shrink-0 transition-transform ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedIndex === index && (
                  <div className="px-8 py-6 border-t-2 border-[#E8D4C4] bg-[#FFF5E6]">
                    <p className="text-[#666] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className="bg-[#FFF5E6] rounded-lg border-2 border-[#E8D4C4] p-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-sora">
              Still Need Help?
            </h3>
            <p className="text-[#666] mb-6">
              Can't find the answer you're looking for? Our support team is here
              to help!
            </p>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-[#8B4513] mb-1">Email:</p>
                <a
                  href="mailto:fadsbyphuray2001@gmail.com"
                  className="text-[#FF6B35] hover:underline"
                >
                  fadsbyphuray2001@gmail.com
                </a>
              </div>
              <div>
                <p className="font-semibold text-[#8B4513] mb-1">Phone:</p>
                <a
                  href="tel:+2348109443159"
                  className="text-[#FF6B35] hover:underline"
                >
                  +234 810 944 3159
                </a>
              </div>
              <div>
                <p className="font-semibold text-[#8B4513] mb-1">
                  Business Hours:
                </p>
                <p className="text-[#666]">
                  Monday - Saturday: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-block mt-6 px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
