import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, TrendingDown, Minus, IndianRupee } from 'lucide-react';

interface MarketPrice {
  crop: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

// TODO: Remove mock functionality - Replace with actual market price API data
const mockMarketPrices: MarketPrice[] = [
  { crop: 'Wheat', price: 2050, unit: 'quintal', change: 2.5, trend: 'up' },
  { crop: 'Rice', price: 1875, unit: 'quintal', change: -1.2, trend: 'down' },
  { crop: 'Cotton', price: 5200, unit: 'quintal', change: 0.0, trend: 'stable' },
  { crop: 'Sugarcane', price: 325, unit: 'quintal', change: 1.8, trend: 'up' },
];

function getTrendIcon(trend: MarketPrice['trend']) {
  switch (trend) {
    case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
    case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
    case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
  }
}

function getTrendColor(trend: MarketPrice['trend']) {
  switch (trend) {
    case 'up': return 'text-green-600';
    case 'down': return 'text-red-600';
    case 'stable': return 'text-gray-600';
  }
}

export default function MarketPricesCard() {
  const { t } = useLanguage();

  return (
    <Card data-testid="card-market-prices" className="p-4 space-y-4 hover-elevate">
      <div className="flex items-center gap-2">
        <IndianRupee className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-primary">{t('marketPrices')}</h3>
      </div>
      
      <div className="space-y-3">
        {mockMarketPrices.map((item, index) => (
          <div 
            key={index}
            data-testid={`price-item-${index}`}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div>
              <p className="font-medium text-sm">{item.crop}</p>
              <p className="text-xs text-muted-foreground">per {item.unit}</p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                <span className="font-semibold">{item.price.toLocaleString()}</span>
              </div>
              <div className={`flex items-center gap-1 text-xs ${getTrendColor(item.trend)}`}>
                {getTrendIcon(item.trend)}
                <span>
                  {item.change !== 0 && (item.change > 0 ? '+' : '')}{item.change}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        Last updated: 2 hours ago
      </p>
    </Card>
  );
}