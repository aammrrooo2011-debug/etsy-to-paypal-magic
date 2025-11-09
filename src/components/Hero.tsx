import { Star, Shield, Truck, CreditCard } from "lucide-react";
import productImage1 from "@/assets/product-1.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-brown-light" />
      
      <div className="container relative z-10 px-4 md:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-1 lg:order-1 relative animate-soft-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-lifted hover-lift">
              <img
                src={productImage1}
                alt="Handmade personalized velvet Quran gift set with prayer mat - Islamic wedding favor"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-2 text-center lg:text-left space-y-6 animate-soft-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Premium Handmade Velvet Quran Gift Set
              <span className="block bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent mt-2">
                with Prayer Mat & Personalization
              </span>
            </h1>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-muted-foreground ml-2">5.0 ★ from 32 reviews</span>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Premium handcrafted Islamic gift set, perfect for weddings and special occasions. Each piece is made with authentic materials and Islamic tradition.
            </p>

            {/* Product Benefits */}
            <div className="space-y-3 text-left max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-foreground"><strong>Premium Materials:</strong> Authentic velvet, solid wood, and crystal craftsmanship</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-foreground"><strong>One-of-a-Kind:</strong> Each piece is handmade with care and Islamic tradition</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-foreground"><strong>Fast Delivery:</strong> Free express shipping in 4-5 days with tracking</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-3 justify-center lg:justify-start">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl md:text-3xl font-medium text-muted-foreground line-through">$170.00</span>
                <span className="text-5xl md:text-6xl font-bold text-primary">$140.00</span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-destructive/10 text-destructive font-semibold text-sm">
                Save $30
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center lg:text-left -mt-2">
              Free Express Shipping • Limited Time Offer
            </p>

            {/* Trust Badges */}
            <div className="bg-gradient-to-r from-gold/10 to-gold-dark/10 border-2 border-gold/30 rounded-xl p-6 space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-foreground">30-Day</div>
                    <div className="text-sm text-muted-foreground">Money Back</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-foreground">Free Express</div>
                    <div className="text-sm text-muted-foreground">4-5 Days</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-foreground">PayPal</div>
                    <div className="text-sm text-muted-foreground">Protected</div>
                  </div>
                </div>
              </div>
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
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground bg-gradient-to-r from-gold to-gold-dark rounded-xl shadow-lifted hover:scale-105 transition-all animate-button-bounce"
            >
              Buy with PayPal — Secure Checkout
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;