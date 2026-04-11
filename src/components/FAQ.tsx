import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "We offer FREE express shipping with 3-day delivery. All orders ship from Turkey with full tracking. You'll receive tracking information via email as soon as your order dispatches."
  },
  {
    question: "Is this an authentic handmade product?",
    answer: "Yes! Each Quran gift set is carefully handcrafted in Turkey by our production partner Mehmet in Kayseri with premium velvet, solid wood, plexi, and paper materials. We are a Star Seller on Etsy with 34 five-star reviews."
  },
  {
    question: "How can I pay?",
    answer: "You can buy directly through our Etsy shop using the coupon code AMRO001 for a discount. Etsy accepts credit cards, debit cards, PayPal, Apple Pay, Google Pay, and more. Direct card payments on this website are coming soon."
  },
  {
    question: "What are the two product options?",
    answer: "We offer two variations: 'Box & Quran' which includes the luxury wooden box, full-page Quran, mini Quran, and bookmark. The 'Complete Gift Set' includes everything: the box, Quran, prayer mat, crystal rosary, digital tasbih counter, gold bookmark with tassel, and prayer scarf."
  },
  {
    question: "Can I personalize the gift set?",
    answer: "Absolutely! You can add a custom message of up to 100 characters that will be beautifully crafted onto your gift set at no extra charge. Simply enter your personalization text when ordering."
  },
  {
    question: "What's your return policy?",
    answer: "We offer a 30-day money back guarantee. Returns and exchanges are accepted. If you're not completely satisfied with your purchase, contact us within 30 days. Buyers are responsible for return shipping costs."
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
