import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-border py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
          {/* Brand & Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Personalized Quran Gift Sets</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Handcrafted in Turkey. Luxury Islamic gifts for your most special occasions.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <a href="mailto:info@quranset.co.uk" className="hover:text-primary transition-colors">info@quranset.co.uk</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <a href="tel:+17862991452" className="hover:text-primary transition-colors">+1 (786) 299-1452</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/#faq" className="hover:text-primary transition-colors">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Personalized Quran Gift Sets. All rights reserved.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1">🇹🇷 Handcrafted in Turkey</span>
            <span className="flex items-center gap-1">🇬🇧 3–5 Day UK Delivery</span>
            <span className="flex items-center gap-1">☪️ Halal Gift</span>
            <span className="flex items-center gap-1">🏷️ 10% Cheaper than Etsy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
