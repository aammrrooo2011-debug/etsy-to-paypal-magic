import React from 'react';
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/button"; // Wait, I should use the real UI components if available.
// Actually, let's build a custom one to ensure it looks premium and matches the gold theme.
import { Globe, ChevronDown } from 'lucide-react';

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = React.useState(false);

  const options: { code: CurrencyCode; label: string; symbol: string }[] = [
    { code: 'GBP', label: 'GBP', symbol: '£' },
    { code: 'USD', label: 'USD', symbol: '$' },
    { code: 'EUR', label: 'EUR', symbol: '€' },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
      >
        <Globe className="w-3.5 h-3.5" />
        {currency}
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-32 rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.code}
                  onClick={() => {
                    setCurrency(option.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                    currency === option.code 
                      ? 'bg-gold/10 text-gold' 
                      : 'text-foreground hover:bg-gray-50'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="text-muted-foreground">{option.symbol}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencySelector;
