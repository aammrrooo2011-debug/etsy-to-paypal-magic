import Hero from "@/components/Hero";
import ProductFeatures from "@/components/ProductFeatures";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";
import { ShoppingBag } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductFeatures />
      <Reviews />
      <FAQ />
      <OrderForm />
      
      <Footer />

      {/* Sticky bottom CTA bar — visible on mobile */}

      {/* Sticky bottom CTA bar — visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-border shadow-2xl px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground truncate">Complete Gift Set</p>
          <p className="font-bold text-primary text-lg leading-none">£126 <span className="text-xs font-normal text-muted-foreground line-through">£140</span></p>
        </div>
        <a
          href="#order"
          id="sticky-order-btn"
          className="flex items-center gap-2 bg-gradient-to-r from-[#003087] to-[#009cde] text-white font-bold py-3 px-5 rounded-xl text-sm hover:scale-[1.02] transition-all flex-shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          Order Now
        </a>
      </div>

      {/* Spacer so footer isn't hidden behind sticky bar on mobile */}
      <div className="h-20 md:hidden" />
    </main>
  );
};

export default Index;
