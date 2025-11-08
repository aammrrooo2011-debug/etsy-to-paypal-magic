import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "We offer FREE express shipping that takes 4-5 business days. All orders are shipped from Turkey with full tracking information provided via email."
  },
  {
    question: "Is this an authentic handmade product?",
    answer: "Yes! Each Quran gift set is carefully handcrafted with premium velvet, solid wood, and crystal materials. Every piece is made with attention to detail and Islamic tradition."
  },
  {
    question: "How does PayPal payment work?",
    answer: "Simply fill in your shipping details and click the PayPal button. You'll be redirected to PayPal's secure checkout where you can pay with your PayPal balance, credit card, or debit card. Your purchase is protected by PayPal's Buyer Protection program and our 30-day money back guarantee."
  },
  {
    question: "Can I personalize the gift set?",
    answer: "Absolutely! During checkout, you can add a custom message (up to 100 characters) that will be beautifully engraved on your gift set at no extra charge."
  },
  {
    question: "What's your return policy?",
    answer: "We offer a 30-day money back guarantee. If you're not completely satisfied with your purchase, contact us within 30 days for a full refund. We want you to love your handmade gift!"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-soft-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about your handmade gift
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl overflow-hidden hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
                >
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 animate-soft-fade-in">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
