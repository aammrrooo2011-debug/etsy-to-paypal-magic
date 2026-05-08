import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, Product } from "@/utils/product-utils";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setProducts(getProducts());
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-cream/30">
      <div className="container px-4 md:px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground uppercase tracking-tight mb-4">
              Islamic Gift Collection
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our complete collection of personalized Quran sets, prayer mats, and Islamic favors. Hand-crafted with love in Turkey.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 h-12 rounded-xl border-gold/20 focus-visible:ring-gold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Showing {filteredProducts.length} products</span>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gold/20">
              <p className="text-muted-foreground">No products found matching your search.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
