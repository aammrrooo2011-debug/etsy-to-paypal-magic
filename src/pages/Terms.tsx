import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-cream/30">
      <div className="container px-4 md:px-6 py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-foreground uppercase tracking-tight">Terms of Service</h1>
        
        <div className="prose prose-stone prose-lg max-w-none text-muted-foreground space-y-6 text-left">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website and purchasing our Personalized Quran Gift Sets, you agree to be bound by these Terms of Service. Please read them carefully before completing your purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Personalized Products</h2>
            <p>
              Many of our products are personalized according to your specific instructions (name, date, etc.). 
              <strong> You are responsible for the accuracy of the personalisation text provided.</strong> Once an order is processed, modifications may not be possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Pricing and Payment</h2>
            <p>
              All prices are in GBP (£). We reserve the right to change prices at any time. Payment must be made in full via our secure providers (Stripe or PayPal) before production begins.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Intellectual Property</h2>
            <p>
              All content on this website, including designs, images, and text, is the property of Personalized Quran Gift Sets and is protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Limitation of Liability</h2>
            <p>
              Personalized Quran Gift Sets shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the United Kingdom.
            </p>
          </section>

          <section>
             <p className="text-sm border-t pt-8 mt-12">
               Last updated: April 2026
             </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
