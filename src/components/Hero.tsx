import { useState, useEffect } from "react";
import { Star, Shield, Truck, CreditCard, ChevronLeft, ChevronRight, ShoppingBag, ExternalLink, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";
import productImage1 from "@/assets/product-1.jpg";
import productImage2 from "@/assets/product-2.jpg";
import productImage3 from "@/assets/product-3.jpg";
import productImage4 from "@/assets/product-4.jpg";

const images = [productImage1, productImage2, productImage3, productImage4];

// Etsy prices: Box & Quran = £120, Complete Set = £140
// Our price = 10% less than Etsy
const variations = [
  {
    id: "box-quran",
    name: "Box & Quran",
    description: "Luxury wooden box + Full-page Quran + Mini Quran + Bookmark",
    price: 108,       // £120 × 0.90
    etsyPrice: 120,   // original Etsy price
    originalPrice: 150,
  },
  {
    id: "all-set",
    name: "Complete Gift Set",
    description: "Everything included: Box, Quran, Prayer Mat, Rosary, Digital Tasbih, Bookmark & Scarf",
    price: 126,       // £140 × 0.90
    etsyPrice: 140,   // original Etsy price
    originalPrice: 170,
  },
];

const ETSY_URL = "https://www.etsy.com/shop/seraceislamicgifts/?etsrc=sdt&coupon=AMRO001";

// Countdown timer: rolling 24h urgency
function useCountdown() {
  const [time, setTime] = useState({ h: 3, m: 47, s: 12 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 3; m = 47; s = 12; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState(1);
  const [personalization, setPersonalization] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"success" | "cancelled" | null>(null);
  const countdown = useCountdown();
  const { startCheckout, loading: stripeLoading, error: stripeError } = useStripeCheckout();

  const selected = variations[selectedVariation];
  const savings = selected.etsyPrice - selected.price;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  // Detect Stripe redirect result from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      setPaymentStatus("success");
      window.history.replaceState({}, "", "/");
    } else if (params.get("payment") === "cancelled") {
      setPaymentStatus("cancelled");
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const handleStripeCheckout = () => {
    startCheckout({
      variationId: selected.id,
      variationName: selected.name,
      amountGBP: selected.price,
      personalization,
    });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Payment result banner */}
      {paymentStatus === "success" && (
        <div className="absolute top-0 left-0 right-0 z-30 bg-emerald-600 text-white py-3 px-4 text-center text-sm font-semibold flex items-center justify-center gap-2">
          <CheckCircle className="w-5 h-5" />
          🎉 Payment successful! We'll confirm your order details by email shortly. Jazakallah khair!
        </div>
      )}
      {paymentStatus === "cancelled" && (
        <div className="absolute top-0 left-0 right-0 z-30 bg-amber-500 text-white py-3 px-4 text-center text-sm font-semibold flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Payment was cancelled — no charge was made. Choose your option below whenever you're ready.
        </div>
      )}

      {/* Urgency top banner */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 text-white py-2 px-4 text-center text-sm font-semibold flex items-center justify-center gap-2 flex-wrap">
        <Clock className="w-4 h-4 animate-pulse" />
        <span>🇬🇧 UK Flash Sale — 10% OFF Etsy Price ends in</span>
        <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-white font-bold">
          {String(countdown.h).padStart(2, "0")}:{String(countdown.m).padStart(2, "0")}:{String(countdown.s).padStart(2, "0")}
        </span>
        <span className="hidden sm:inline">| Free Express Delivery to UK 🚀</span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-brown-light" />

      <div className="container relative z-10 px-4 md:px-6 pt-20 pb-12 md:pt-24 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="order-1 lg:order-1 animate-soft-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-lifted group">
              <img
                src={images[currentImage]}
                alt="Personalized Velvet Quran Gift Set - Luxury handmade Islamic gift"
                className="w-full h-auto object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

              {/* Sale badge */}
              <div className="absolute top-4 left-4 bg-emerald-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                10% CHEAPER THAN ETSY
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium text-foreground">
                {currentImage + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 mt-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative rounded-lg overflow-hidden flex-1 aspect-square border-2 transition-all ${
                    currentImage === index
                      ? "border-primary shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-2 text-center lg:text-left space-y-6 animate-soft-fade-in">
            <div>
              <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                ☪️ Halal-Certified Gift • ⭐ Star Seller on Etsy • 34 Reviews
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Personalized Velvet Quran Gift Set
                <span className="block bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent mt-2 text-2xl md:text-3xl lg:text-4xl">
                  Luxury Islamic Gift — UK Exclusive Price
                </span>
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
              <span className="text-muted-foreground ml-1">5.0 from 34 verified buyers</span>
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              Beautifully handcrafted in Turkey — the perfect gift for <strong>Eid, Weddings, Ramadan, or any special Islamic occasion.</strong> Loved by the UK Muslim community. 🤲
            </p>

            {/* Variation Selector */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Choose Your Option</Label>
              <div className="grid gap-3">
                {variations.map((v, index) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariation(index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedVariation === index
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-foreground">{v.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">{v.description}</div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <div className="text-xs text-muted-foreground line-through">Etsy: £{v.etsyPrice}</div>
                        <div className="text-2xl font-bold text-primary">£{v.price}</div>
                        <div className="text-xs font-semibold text-emerald-600">Save £{v.etsyPrice - v.price} vs Etsy</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Personalization */}
            <div className="space-y-2">
              <Label htmlFor="personalization" className="text-base font-semibold">
                Add Personalisation (Free)
              </Label>
              <Input
                id="personalization"
                value={personalization}
                onChange={(e) => setPersonalization(e.target.value.slice(0, 100))}
                placeholder="e.g. Bismillah, a name, a wedding date..."
                className="text-base"
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">{personalization.length}/100 characters</p>
            </div>

            {/* Price Summary */}
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-3 justify-center lg:justify-start">
              <div className="flex items-baseline gap-3">
                <span className="text-base font-medium text-muted-foreground">
                  Etsy price: <span className="line-through">£{selected.etsyPrice}.00</span>
                </span>
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  £{selected.price}.00
                </span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm border border-emerald-200">
                Save £{savings} vs Etsy 🎉
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center lg:text-left -mt-2">
              Free Express Shipping to UK • 3–5 Day Delivery
            </p>

            {/* Dual CTA Buttons */}
            <div className="space-y-3">
              {stripeError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {stripeError}
                </div>
              )}

              <Button
                size="lg"
                id="stripe-buy-btn"
                onClick={handleStripeCheckout}
                disabled={stripeLoading}
                className="w-full text-lg py-6 bg-gradient-to-r from-[#635BFF] to-[#4B44E8] text-white rounded-xl shadow-lifted hover:scale-[1.02] transition-all font-semibold disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
              >
                {stripeLoading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Redirecting to Checkout...</>
                ) : (
                  <><CreditCard className="w-5 h-5 mr-2" /> Pay with Card — £{selected.price} (Stripe)</>
                )}
              </Button>

              <a
                href={ETSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="etsy-buy-link"
                className="w-full inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl border-2 border-primary text-foreground hover:bg-primary/5 transition-all gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Or Buy on Etsy (Use Code AMRO001)
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-xs text-center text-muted-foreground">
                🔒 Stripe checkout — secure card payment. 10% cheaper than Etsy. Buyer Protection included.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="bg-gradient-to-r from-gold/10 to-gold-dark/10 border-2 border-gold/30 rounded-xl p-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">30-Day</div>
                    <div className="text-xs text-muted-foreground">Money Back</div>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">Free Express</div>
                    <div className="text-xs text-muted-foreground">UK Delivery</div>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">PayPal</div>
                    <div className="text-xs text-muted-foreground">Buyer Protection</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
              <span>🟢 12 UK buyers this week</span>
              <span>🇹🇷 Handmade in Turkey</span>
              <span>☪️ Halal Gift</span>
              <span>✨ Star Seller</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
