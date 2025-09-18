import MarketPricesCard from '../MarketPricesCard';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function MarketPricesCardExample() {
  return (
    <LanguageProvider>
      <div className="p-4 max-w-md">
        <MarketPricesCard />
      </div>
    </LanguageProvider>
  );
}