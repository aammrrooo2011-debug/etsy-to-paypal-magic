import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, RefreshCw } from "lucide-react";

declare global {
  interface Window {
    paypal: any;
  }
}

const OrderForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [paypalOrderId, setPaypalOrderId] = useState<string | null>(null);
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    personalization: "",
  });

  const isFormValid = formData.customerName && formData.customerEmail && 
    formData.address && formData.city && formData.state && 
    formData.zipCode && formData.country;

  useEffect(() => {
    const initializePayPal = async () => {
      if (!isFormValid || !window.paypal || paypalOrderId) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-paypal-order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: 146.50,
              customerName: formData.customerName,
              customerEmail: formData.customerEmail,
              customerPhone: formData.customerPhone,
              shippingAddress: {
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country,
              },
              personalization: formData.personalization,
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to create order");

        const { orderId } = await response.json();
        setPaypalOrderId(orderId);

        if (paypalContainerRef.current) {
          paypalContainerRef.current.innerHTML = '';
        }

        window.paypal
          .Buttons({
            createOrder: () => orderId,
            onApprove: async (data: any) => {
              const captureResponse = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/capture-paypal-order`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ orderId: data.orderID }),
                }
              );

              if (captureResponse.ok) {
                toast({
                  title: "Order Confirmed!",
                  description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
                });
                setFormData({
                  customerName: "",
                  customerEmail: "",
                  customerPhone: "",
                  address: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "",
                  personalization: "",
                });
                setPaypalOrderId(null);
              } else {
                throw new Error("Failed to capture payment");
              }
            },
            onError: (err: any) => {
              console.error("PayPal error:", err);
              toast({
                title: "Payment Failed",
                description: "There was an error processing your payment. Please try again.",
                variant: "destructive",
              });
            },
          })
          .render("#paypal-button-container");
      } catch (error) {
        console.error("Order error:", error);
        toast({
          title: "Error",
          description: "Failed to initialize payment. Please check your information.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      initializePayPal();
    }, 500);

    return () => clearTimeout(timer);
  }, [formData, isFormValid, paypalOrderId]);

  return (
    <section id="order" className="py-20 bg-gradient-to-b from-cream to-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Your <span className="text-primary">Order</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Fill in your details and personalize your gift set
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RefreshCw className="w-5 h-5 text-green-600" />
                <span className="font-semibold">30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#003087">
                  <path d="M20.905 9.5c0-2.802-2.278-5.097-5.047-5.097H9.142c-.354 0-.656.256-.714.607L6.22 18.439c-.042.254.152.491.409.491h2.966l.745-4.758-.023.149c.058-.351.356-.607.714-.607h1.487c2.922 0 5.208-1.196 5.877-4.651.02-.098.035-.195.051-.291.193-1.226.038-2.062-.54-2.791z"/>
                </svg>
                <span className="font-semibold">PayPal Buyer Protection</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 bg-card border border-border rounded-2xl p-8 shadow-soft">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              
              <div>
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="customerEmail">Email Address *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Shipping Address</h3>
              
              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New York"
                  />
                </div>

                <div>
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="NY"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                  <Input
                    id="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="10001"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>

            {/* Personalization */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Personalization (Optional)</h3>
              <div>
                <Label htmlFor="personalization">Custom Message</Label>
                <Textarea
                  id="personalization"
                  value={formData.personalization}
                  onChange={(e) => setFormData({ ...formData, personalization: e.target.value })}
                  placeholder="Enter your personalization text (up to 100 characters)"
                  maxLength={100}
                  rows={3}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.personalization.length}/100 characters
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-muted/50 rounded-xl p-6 space-y-3">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span className="font-semibold">$146.50</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping:</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary">$146.50</span>
                </div>
              </div>
            </div>

            {/* PayPal Payment Section */}
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  {isFormValid ? "Complete your payment with PayPal" : "Fill in all required fields to continue"}
                </p>
              </div>
              
              {/* PayPal Button Container */}
              <div 
                id="paypal-button-container" 
                ref={paypalContainerRef}
                className="min-h-[50px]"
              />
              
              {isLoading && (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
              
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Protected by PayPal's 30-Day Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;