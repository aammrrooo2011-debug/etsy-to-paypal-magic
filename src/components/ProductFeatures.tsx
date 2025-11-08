import { Package, Truck, Shield, Heart } from "lucide-react";
import productImage2 from "@/assets/product-2.jpg";
import productImage3 from "@/assets/product-3.jpg";
import productImage4 from "@/assets/product-4.jpg";

const features = [
  {
    icon: Package,
    title: "Complete Gift Set",
    description: "Includes Quran, prayer mat, rosary, digital counter, bookmark, and luxury box"
  },
  {
    icon: Truck,
    title: "Express Free Shipping",
    description: "Arrives in 4-5 days with tracked express delivery"
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Handcrafted with premium velvet, wood, and plexi materials"
  },
  {
    icon: Heart,
    title: "Personalization",
    description: "Custom engraving available for that special touch"
  }
];

const ProductFeatures = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-cream">
      <div className="container px-4 md:px-6">
        {/* What's Included */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What's <span className="text-primary">Included</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a complete Islamic gift experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lifted transition-all hover-lift animate-soft-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all group-hover:scale-110">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Product Gallery */}
        <div className="grid md:grid-cols-3 gap-6">
          {[productImage2, productImage3, productImage4].map((img, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-lifted transition-all hover-lift"
            >
              <img
                src={img}
                alt={`Handmade Quran gift set detail ${index + 1} - Premium velvet and wood craftsmanship`}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Product Details */}
        <div className="mt-16 bg-card border border-border rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-6">Set Contents</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "1 Full-Page Quran (17cm x 25cm)",
              "1 Mini Quran",
              "1 Prayer Scarf",
              "1 Crystal Rosary",
              "1 Digital Tasbih Counter",
              "1 Gold Bookmark with Tassel",
              "1 Luxury Wooden Box with Intricate Designs"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;