import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { getProductById, Product } from "@/utils/product-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";
import { 
  Star, Shield, Truck, CreditCard, ChevronLeft, ChevronRight, 
  ShoppingBag, ExternalLink, ArrowLeft, CheckCircle2, AlertCircle, Loader2,
  Share2, Copy, Check, MessageCircle
} from "lucide-react";

import { useCurrency } from "@/context/CurrencyContext";
import SEO from "@/components/SEO";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { currency, formatPrice } = useCurrency();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [personalization, setPersonalization] = useState("");
  const [copied, setCopied] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const { startCheckout, loading: stripeLoading, error: stripeError } = useStripeCheckout();

  const productUrl = `https://quranset.co.uk/product/${id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product?.title, url: productUrl });
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Check out this beautiful Islamic gift set: ${product?.title}\n${productUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  useEffect(() => {
    if (id) {
      const p = getProductById(id, currency);
      if (p) {
        setProduct(p);
        const minQty = p.price < 50 ? 5 : 1;
        setQuantity(prev => Math.max(prev, minQty));
      }
    }
    window.scrollTo(0, 0);
  }, [id, currency]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/shop">
          <Button variant="outline">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  const minQuantity = product.price < 50 ? 5 : 1;
  const totalPrice = product.price * quantity;

  const handleCheckout = () => {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: product.title,
        content_ids: [product.id],
        content_type: 'product',
        value: totalPrice,
        currency: currency
      });
    }

    startCheckout({
      variationId: product.id,
      variationName: `${product.title} x${quantity}`,
      amount: totalPrice,
      currency: currency,
      personalization,
      promoCode: promoCode.trim() || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-cream/30">
      <SEO 
        title={`${product.title} | Quran Gift Set`}
        description={product.description.slice(0, 160).replace(/\n+/g, " ")}
        url={`https://quranset.co.uk/product/${product.id}`}
        image={product.images[0]}
        type="product"
        structuredData={{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.title,
          "image": product.images,
          "description": product.description.replace(/\n+/g, " "),
          "sku": (product as any).sku || product.id,
          "offers": {
            "@type": "Offer",
            "url": `https://quranset.co.uk/product/${product.id}`,
            "priceCurrency": currency,
            "price": product.price,
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
          }
        }}
      />
      <div className="container px-4 md:px-6 py-8 md:py-16">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Collection
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-white border-2 border-gold/10">
              <img 
                src={product.images[currentImage]} 
                alt={product.title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              {product.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${currentImage === idx ? 'border-gold shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">Handmade Star Seller</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{product.title}</h1>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
                <span className="text-xl text-muted-foreground line-through">{formatPrice((product as any).originalPrice)}</span>
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">10% OFF</span>
              </div>

              {/* Share & Save Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={handleWhatsAppShare}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366]/10 text-[#25D366] text-xs font-bold hover:bg-[#25D366]/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted text-muted-foreground text-xs font-bold hover:bg-muted/80 transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted text-muted-foreground text-xs font-bold hover:bg-muted/80 transition-all"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <Truck className="w-5 h-5" />
                <span className="text-sm font-bold">Free Express Delivery to UK, US & Europe</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>30-Day Money Back Guarantee</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gold/10 shadow-sm space-y-6">
              {/* Quantity Selector */}
              <div className="space-y-2">
                <Label className="text-sm font-bold">Quantity{minQuantity > 1 ? ` (Min. ${minQuantity})` : ''}</Label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(q => Math.max(minQuantity, q - 1))}
                    className="w-10 h-10 rounded-lg border border-gold/20 flex items-center justify-center text-lg font-bold hover:bg-muted transition-colors"
                  >−</button>
                  <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 rounded-lg border border-gold/20 flex items-center justify-center text-lg font-bold hover:bg-muted transition-colors"
                  >+</button>
                </div>
                {minQuantity > 1 && (
                  <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                    📦 This item has a minimum order of {minQuantity} units
                  </p>
                )}
              </div>

              {/* Total */}
              {quantity > 1 && (
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-xl">
                  <span className="text-sm font-medium text-muted-foreground">{quantity} × {formatPrice(product.price)}</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="personalization" className="text-sm font-bold">Personalization (Optional)</Label>
                <Input 
                  id="personalization"
                  placeholder="E.g. Name to be written on the box/Quran..."
                  className="rounded-xl border-gold/20 focus-visible:ring-gold h-12"
                  value={personalization}
                  onChange={(e) => setPersonalization(e.target.value)}
                />
                <p className="text-[10px] text-muted-foreground">Maximum 25 characters. Hand-engraved for perfection.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="promoCode" className="text-sm font-bold">Discount Code (Optional)</Label>
                <Input 
                  id="promoCode"
                  placeholder="Enter promo code..."
                  className="rounded-xl border-gold/20 focus-visible:ring-gold h-12 uppercase"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                />
                <p className="text-[10px] text-muted-foreground">Have a discount code? Enter it here before checkout.</p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleCheckout}
                  disabled={stripeLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-7 rounded-xl text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {stripeLoading ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                  ) : (
                    <><CreditCard className="w-5 h-5 mr-2" /> Pay {formatPrice(totalPrice)} — Checkout</>
                  )}
                </Button>
                
                {stripeError && (
                  <p className="text-xs text-red-500 text-center bg-red-50 p-2 rounded-lg border border-red-100">
                    {stripeError}
                  </p>
                )}
                
                <p className="text-[11px] text-center text-muted-foreground">
                  🔒 Secure transaction handled by Stripe. No extra fees.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Description</h3>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm md:text-base">
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
