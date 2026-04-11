import { Star } from "lucide-react";

const reviews = [
  {
    name: "Ahmed",
    date: "Jan 15, 2026",
    rating: 5,
    text: "The item is just as described, great quality, the seller is very kind, responds quickly and provided an additional gift (which I'm very thankful for). Overall great product, would definitely recommend it!!",
  },
  {
    name: "Natalie",
    date: "Nov 11, 2025",
    rating: 5,
    text: "Mashallah this is so beautiful and I ordered it for my daughter's wedding. It's going to be an amazing gift to keep.",
  },
  {
    name: "Etsy Buyer",
    date: "Oct 20, 2025",
    rating: 5,
    text: "Honestly it was amazing everything was top notch from the customer service to the quality of the product. Will definitely be shopping with you again and would highly recommend it to people.",
  },
  {
    name: "Mehdi",
    date: "May 29, 2025",
    rating: 5,
    text: "The seller was very responsive to messages, and the item arrived as advertised. I would highly recommend it as a very nice gift.",
  },
  {
    name: "Ali Al-Timimy",
    date: "May 29, 2025",
    rating: 5,
    text: "Great item, would definitely recommend.",
  },
  {
    name: "Saima",
    date: "Jan 19, 2025",
    rating: 5,
    text: "Absolutely beautiful and such good quality. A beautiful gift to give.",
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
            Verified <span className="text-primary">Etsy Reviews</span>
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
                  <p className="text-sm text-muted-foreground">{review.date}</p>
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
            {["Would recommend", "Beautiful", "Fast delivery", "Great quality", "As described", "Responsive seller", "Love it"].map((tag, index) => (
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
