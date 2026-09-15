import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Product } from "@/utils/product-utils";

interface ProductCardProps {
  product: Product;
}

import { useCurrency } from "@/context/CurrencyContext";

import { useStripeCheckout } from "@/hooks/use-stripe-checkout";
import { Loader2 } from "lucide-react";

const ProductCard = ({ product }: ProductCardProps) => {
  const { formatPrice, currency } = useCurrency();
  const { startCheckout, loading } = useStripeCheckout();

  const isBulkItem = product.price < 50;

  const handleBuyNow = () => {
    if (isBulkItem) return; // handled by Link below
    startCheckout({
      variationId: product.id,
      variationName: product.title,
      amount: product.price,
      currency: currency,
    });
  };
  
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gold/10 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          -10% OFF
        </div>
        {isBulkItem && (
          <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Min. 5
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-foreground line-clamp-2 mb-2 min-h-[3.5rem]">
          {product.title}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">{formatPrice((product as any).originalPrice)}</span>
            {isBulkItem && <span className="text-xs text-amber-600 font-bold">each</span>}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link to={`/product/${product.id}`} className="w-full">
              <Button variant="outline" className="w-full border-gold/20 text-gold hover:bg-gold/5 font-bold text-xs uppercase tracking-tight">
                Details
              </Button>
            </Link>
            {isBulkItem ? (
              <Link to={`/product/${product.id}`} className="w-full">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-tight">
                  Order (Min. 5)
                </Button>
              </Link>
            ) : (
              <Button 
                onClick={handleBuyNow}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-tight"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Buy Now"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
