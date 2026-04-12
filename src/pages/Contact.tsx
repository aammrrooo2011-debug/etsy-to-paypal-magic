import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Jazakallah khair for reaching out! We will get back to you shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-cream/30">
      <div className="container px-4 md:px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground uppercase tracking-tight mb-4">Contact Us</h1>
            <p className="text-muted-foreground text-lg">
              Have a question about a gift set or an existing order? We're here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 text-left">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gold/10">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Email</p>
                      <a href="mailto:info@quranset.co.uk" className="text-muted-foreground hover:text-primary transition-colors">
                        info@quranset.co.uk
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Phone</p>
                      <a href="tel:+17862991452" className="text-muted-foreground hover:text-primary transition-colors">
                        +1 (786) 299-1452
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">WhatsApp</p>
                      <p className="text-muted-foreground">Available for order support</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 italic text-emerald-800 text-sm">
                "Our team typically responds within 2–4 hours during business days. Jazakallah khair for your patience."
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-gold/10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-foreground">Full Name</label>
                  <Input id="name" placeholder="Assalamu Alaikum, your name..." required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-foreground">Email Address</label>
                  <Input id="email" type="email" placeholder="email@example.com" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-bold text-foreground">Subject</label>
                  <Input id="subject" placeholder="Order Status, Wholesale, etc." required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-foreground">Message</label>
                  <Textarea id="message" placeholder="How can we help you today?" className="min-h-[150px]" required />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
