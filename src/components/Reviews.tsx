import { Star } from "lucide-react";

const reviews = [
  {
    name: "Fatima R.",
    location: "London, UK 🇬🇧",
    date: "Jan 15, 2026",
    rating: 5,
    text: "Ordered as an Eid gift for my sister — absolutely stunning quality. The velvet box is just gorgeous, and the personalisation was done beautifully. Arrived in 4 days. Will definitely order again! Mashallah.",
  },
  {
    name: "Natalie",
    location: "Birmingham, UK 🇬🇧",
    date: "Nov 11, 2025",
    rating: 5,
    text: "Mashallah this is so beautiful — I ordered it for my daughter's Nikah. It's going to be an amazing, meaningful keepsake. Perfect quality and packaging.",
  },
  {
    name: "Ahmed K.",
    location: "Manchester, UK 🇬🇧",
    date: "Oct 20, 2025",
    rating: 5,
    text: "Honestly it was amazing — everything was top notch from the customer service to the quality. A perfect Islamic wedding gift. Will definitely be shopping again and would highly recommend to the UK Muslim community.",
  },
  {
    name: "Mehdi",
    location: "Leeds, UK 🇬🇧",
    date: "May 29, 2025",
    rating: 5,
    text: "The seller was very responsive to messages, and the item arrived exactly as advertised. Beautiful quality — I would highly recommend it as a very thoughtful Islamic gift.",
  },
  {
    name: "Ali Al-Timimy",
    location: "Bradford, UK 🇬🇧",
    date: "May 29, 2025",
    rating: 5,
    text: "Great item — premium quality, beautiful presentation, and delivered quickly. Would definitely recommend to anyone looking for a meaningful Muslim gift.",
  },
  {
    name: "Saima",
    location: "London, UK 🇬🇧",
    date: "Jan 19, 2025",
    rating: 5,
    text: "Absolutely beautiful and such good quality. The Quran and the wooden box together look so luxurious. A beautiful gift to give — perfect for Ramadan or Eid.",
  },
];

const Reviews = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 animate-soft-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4 animate-float">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Loved by the <span className="text-primary">UK Muslim Community</span>
          </h2>
          <p className="text-xl text-muted-foreground">5.0 ★ from 34 verified buyers</p>
          <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-muted-foreground">
            <span>Item Quality: <strong className="text-foreground">5.0</strong></span>
            <span>Delivery: <strong className="text-foreground">5.0</strong></span>
            <span>Customer Service: <strong className="text-foreground">4.9</strong></span>
            <span>Recommend: <strong className="text-foreground">100%</strong></span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all hover-lift animate-soft-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <p className="text-foreground leading-relaxed text-sm">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap gap-3 justify-center">
            {["UK Delivery", "Eid Gift", "Wedding Favour", "Beautiful", "Fast Shipping", "Halal Gift", "Nikah Present", "Mashallah Quality"].map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
