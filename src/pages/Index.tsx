import Hero from "@/components/Hero";
import ProductFeatures from "@/components/ProductFeatures";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import OrderForm from "@/components/OrderForm";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductFeatures />
      <Reviews />
      <FAQ />
      <OrderForm />
      
      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-8">
        <div className="container px-4 md:px-6 text-center">
          <p className="text-muted-foreground">
            © 2025 Personalized Quran Gift Sets. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Ships from Turkey • Express Free Shipping 4-5 Days
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
