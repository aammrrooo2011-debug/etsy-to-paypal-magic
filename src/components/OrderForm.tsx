import { ShoppingBag, ExternalLink, CreditCard, Shield, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const ETSY_URL = "https://www.etsy.com/shop/seraceislamicgifts/?etsrc=sdt&coupon=AMRO001";

const OrderForm = () => {
  return (
    <section id="order" className="py-20 bg-gradient-to-b from-cream to-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-soft-fade-in">
            Ready to <span className="text-primary">Order?</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Choose your preferred way to purchase
          </p>

          <div className="space-y-4 bg-card border border-border rounded-2xl p-8 shadow-soft animate-soft-fade-in">
            {/* Option 1: Etsy */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-foreground">Buy on Etsy</h3>
              <p className="text-sm text-muted-foreground">
                Purchase through our verified Etsy shop with buyer protection. Use coupon code <strong className="text-primary">AMRO001</strong> for a discount.
              </p>
              <a
                href={ETSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground bg-gradient-to-r from-gold to-gold-dark rounded-xl shadow-lifted hover:scale-[1.02] transition-all gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop on Etsy — Code AMRO001
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Option 2: Direct (Coming Soon) */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-foreground">Pay with Card</h3>
              <p className="text-sm text-muted-foreground">
                Direct secure checkout — coming soon
              </p>
              <Button
                size="lg"
                className="w-full text-lg py-6 rounded-xl"
                disabled
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Card Payment — Coming Soon
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-sm text-foreground font-medium">
                <Shield className="w-5 h-5 text-gold" />
                <span>30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-foreground font-medium">
                <Truck className="w-5 h-5 text-gold" />
                <span>Free Express Shipping — 3-Day Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-foreground font-medium">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <span>5.0 from 34 Verified Etsy Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
