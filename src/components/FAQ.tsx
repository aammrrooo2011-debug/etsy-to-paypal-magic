import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How long does shipping take to the UK?",
    answer: "We offer FREE express shipping to the UK with 3–5 working day delivery. All orders ship from Turkey with full tracking. You'll receive tracking information via email as soon as your order dispatches."
  },
  {
    question: "Is this an authentic handmade product?",
    answer: "Yes! Each Quran gift set is carefully handcrafted in Turkey by our production partner Mehmet in Kayseri, using premium velvet, solid wood, plexi, and paper materials. We are a Star Seller on Etsy with 34 five-star reviews from verified buyers, including many UK Muslim customers."
  },
  {
    question: "How can I pay?",
    answer: "The cheapest option is PayPal — our direct price is 10% less than Etsy. Simply click 'Pay with PayPal', complete the payment, then send us your order details and personalisation via email or Etsy message. Alternatively, you can buy through our Etsy shop using code AMRO001 for a discount. Etsy accepts credit/debit cards, PayPal, Apple Pay, Google Pay, and more."
  },
  {
    question: "What are the two product options?",
    answer: "We offer two variations: 'Box & Quran' (£108) which includes the luxury wooden box, full-page Quran, mini Quran, and bookmark. The 'Complete Gift Set' (£126) includes everything: the box, Quran, prayer mat, crystal rosary, digital tasbih counter, gold bookmark with tassel, and prayer scarf. Both are £12–14 cheaper than our Etsy listing."
  },
  {
    question: "Can I personalise the gift set?",
    answer: "Absolutely! You can add a custom message of up to 100 characters — a name, dua, wedding date, or anything meaningful — beautifully crafted onto your gift set at no extra charge. Simply enter your personalisation text when ordering."
  },
  {
    question: "Is this gift suitable for Eid, weddings, or Ramadan?",
    answer: "Yes — our gift sets are designed for exactly these occasions. They're popular among UK Muslim families for Eid gifts, Islamic wedding favours, Nikah gifts, Ramadan presents, newborn gifts (aqiqah), and graduations. A truly meaningful, halal gift."
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
              Everything UK buyers need to know about our handmade Islamic gift sets
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
                  aria-expanded={openIndex === index}
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
