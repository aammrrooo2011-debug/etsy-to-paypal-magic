import { Star } from "lucide-react";
import productImage1 from "@/assets/product-1.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-brown-light" />
      
      <div className="container relative z-10 px-4 md:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lifted">
              <img
                src={productImage1}
                alt="Personalized Velvet Quran Gift Set"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left space-y-6">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-muted-foreground ml-2">(32 reviews)</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Personalized Velvet
              <span className="block bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
                Quran Gift Set
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Luxury Islamic wedding favors and prayer set. A complete gift set featuring 
              a beautifully crafted Quran, prayer mat, rosary, and more in an elegant wooden box.
            </p>

            <div className="flex items-baseline gap-3 justify-center lg:justify-start">
              <span className="text-5xl font-bold text-primary">$146.50</span>
              <span className="text-muted-foreground">Free Express Shipping</span>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>5 views in last 24 hours</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Ships from Turkey</span>
              </div>
            </div>

            <a
              href="#order"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground bg-gradient-to-r from-gold to-gold-dark rounded-xl shadow-lifted hover:scale-105 transition-all"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;