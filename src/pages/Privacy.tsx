import React from 'react';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-12 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: May 08, 2026</p>

        <section className="space-y-6 text-foreground/80 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Introduction</h2>
            <p>Welcome to QuranSet (quranset.co.uk). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or interact with our Meta (Facebook/Instagram) messaging services.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Identity Data:</strong> Name, username, or similar identifier.</li>
              <li><strong>Contact Data:</strong> Email address, telephone numbers, and delivery address.</li>
              <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of products you have purchased from us.</li>
              <li><strong>Messaging Data:</strong> Information you provide when interacting with our automated chat services on Meta platforms.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">3. How We Use Your Data</h2>
            <p>We use your data to provide our services, process your orders, and provide automated customer support via our messaging bots. We only use your personal data when the law allows us to.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Data Deletion</h2>
            <p>You have the right to request that we delete your data. To do so, please contact us at aammrrooo2011@hotmail.com and we will process your request within 30 days.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Contact Us</h2>
            <p>If you have any questions about this privacy policy, please contact us at aammrrooo2011@hotmail.com.</p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
