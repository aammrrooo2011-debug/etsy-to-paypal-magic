import React from 'react';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-12 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-6">Last updated: May 08, 2026</p>

        <section className="space-y-6 text-foreground/80 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Terms</h2>
            <p>By accessing the website at quranset.co.uk, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Personalization</h2>
            <p>Our products are hand-personalized. Please ensure all spelling and details are correct before placing your order. We cannot offer refunds on personalized items unless they arrive damaged.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Shipping</h2>
            <p>We offer Free Express Shipping to the UK, US, and Europe. Delivery typically takes 3-5 business days from the date of dispatch.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Minimum Order Quantity</h2>
            <p>Certain low-cost items (e.g., mini Quran sets) have a minimum order requirement of 5 units to maintain shipping viability. This will be clearly marked on the product page.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Disclaimer</h2>
            <p>The materials on QuranSet's website are provided on an 'as is' basis. QuranSet makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
