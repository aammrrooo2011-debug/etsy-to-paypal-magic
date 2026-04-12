import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-cream/30">
      <div className="container px-4 md:px-6 py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-foreground uppercase tracking-tight">Privacy Policy</h1>
        
        <div className="prose prose-stone prose-lg max-w-none text-muted-foreground space-y-6 text-left">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
            <p>
              Welcome to Personalized Quran Gift Sets. We value your privacy and are committed to protecting your personal data in accordance with the UK General Data Protection Regulation (UK GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Data We Collect</h2>
            <p>We may collect and process the following data about you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and shipping address.</li>
              <li><strong>Order Details:</strong> Products purchased, personalization text, and order history.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and usage data via cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Data</h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and deliver your personalized orders.</li>
              <li>Communicate with you regarding your purchase.</li>
              <li>Improve our website and customer experience.</li>
              <li>Comply with legal and tax obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Sharing</h2>
            <p>
              We do not sell your personal data. We share only necessary information with trusted third parties to provide our services, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Payment Processors:</strong> Stripe and PayPal for secure transactions.</li>
              <li><strong>Shipping Partners:</strong> Couriers for UK and Turkey-based fulfillment.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Rights</h2>
            <p>
              Under UK GDPR, you have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at <a href="mailto:info@quranset.co.uk" className="text-primary underline">info@quranset.co.uk</a>.
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

export default Privacy;
