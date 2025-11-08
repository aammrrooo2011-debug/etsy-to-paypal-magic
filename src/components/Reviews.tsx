import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sign in with Apple user",
    date: "Oct 20, 2025",
    rating: 5,
    text: "Honestly it was amazing everything was top notch from the customer service to the quality of the product will definitely be shopping with you again and would highly recommend it to people.",
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
    text: "Absolutely beautiful and such good quality a beautiful gift to give.",
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
            Real <span className="text-primary">Etsy Reviews</span>
          </h2>
          <p className="text-xl text-muted-foreground">5.0 ★ from 32 verified buyers</p>
          <p className="text-sm text-muted-foreground mt-2">100% of customers recommend this handmade gift</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <p className="text-foreground leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap gap-3 justify-center">
            {["Would recommend", "Beautiful", "Great quality", "Fast shipping", "As described", "Responsive seller"].map((tag, index) => (
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