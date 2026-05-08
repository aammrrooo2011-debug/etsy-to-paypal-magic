import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Product } from "@/utils/product-utils";

interface ProductCardProps {
  product: Product;
}

import { useCurrency } from "@/context/CurrencyContext";

const ProductCard = ({ product }: ProductCardProps) => {
  const { formatPrice } = useCurrency();
  
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
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link to={`/product/${product.id}`} className="w-full">
              <Button variant="outline" className="w-full border-gold/20 text-gold hover:bg-gold/5 font-bold text-xs uppercase tracking-tight">
                Details
              </Button>
            </Link>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-tight">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
