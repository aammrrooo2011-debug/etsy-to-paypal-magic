import Footer from "@/components/Footer";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-cream/30">
      <div className="container px-4 md:px-6 py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-foreground uppercase tracking-tight">Shipping & Returns</h1>
        
        <div className="prose prose-stone prose-lg max-w-none text-muted-foreground space-y-12 text-left">
          
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-foreground mb-4">
              <Truck className="w-8 h-8 text-gold" />
              <h2 className="text-2xl font-bold m-0">Shipping Policy</h2>
            </div>
            <p>
              We are proud to offer **Free Express Shipping** to all customers across the United Kingdom.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Processing Time:</strong> Every set is handcrafted. Please allow 1–2 business days for production.</li>
              <li><strong>Delivery Time:</strong> Once shipped, orders typically arrive in **3–5 business days**.</li>
              <li><strong>Tracking:</strong> You will receive a tracking number via email as soon as your order is dispatched.</li>
              <li><strong>Origin:</strong> Our products are shipped directly from our workshop in Turkey to your doorstep in the UK.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-foreground mb-4">
              <RotateCcw className="w-8 h-8 text-gold" />
              <h2 className="text-2xl font-bold m-0">Returns & Refunds</h2>
            </div>
            <p>
              Your satisfaction is our priority. Please review our policy regarding returns:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personalized Items:</strong> Due to the nature of custom-engraved products, we cannot accept returns for personalized items unless they arrive damaged or defective.</li>
              <li><strong>Damaged Goods:</strong> If your item is damaged during transit, please contact us at <a href="mailto:info@quranset.co.uk" className="text-primary underline">info@quranset.co.uk</a> within 48 hours of delivery with photos of the damage. We will send a replacement free of charge.</li>
              <li><strong>Standard Items:</strong> Unpersonalized items can be returned within 14 days of receipt. Items must be unused and in their original packaging.</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-2xl border-2 border-gold/20 shadow-sm">
            <div className="flex items-center gap-3 text-foreground mb-4">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h3 className="text-xl font-bold m-0">Buyer Protection</h3>
            </div>
            <p className="text-sm">
              All direct purchases via Stripe and PayPal are covered by their respective buyer protection programs. You can shop with 100% confidence.
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

export default Shipping;
