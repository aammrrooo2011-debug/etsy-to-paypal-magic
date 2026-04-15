import { MessageSquare } from "lucide-react";

const WhatsAppWidget = () => {
  const phoneNumber = "17862991452";
  const message = "Hello! I'm interested in the Personalized Quran Gift Set. Could you help me?";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-soft-bounce md:bottom-8">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] text-white p-3 md:px-5 md:py-3 rounded-full shadow-2xl hover:scale-105 transition-all group border-2 border-white/20"
        aria-label="Contact us on WhatsApp"
        id="whatsapp-widget-link"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
        </div>
        <span className="font-bold text-sm hidden md:block">Chat with us</span>
      </a>
      
      {/* Tooltip for desktop */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-foreground text-xs font-bold py-2 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border hidden md:block">
        Need help? WhatsApp us!
      </div>
    </div>
  );
};

export default WhatsAppWidget;
