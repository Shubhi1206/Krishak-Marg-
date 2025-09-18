import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Store, Wheat, Sprout, Wrench, ChevronRight } from 'lucide-react';

interface MandiCategory {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function MandiCard() {
  const { t } = useLanguage();

  const categories: MandiCategory[] = [
    { id: 'seeds', icon: Wheat, color: 'text-amber-600' },
    { id: 'fertilizers', icon: Sprout, color: 'text-green-600' },
    { id: 'tools', icon: Wrench, color: 'text-blue-600' },
  ];

  const handleCategoryClick = (categoryId: string) => {
    console.log(`${categoryId} category clicked`);
    // TODO: Navigate to category-specific page or show category details
  };

  return (
    <Card data-testid="card-mandi" className="p-4 space-y-4 hover-elevate">
      <div className="flex items-center gap-2">
        <Store className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-primary">{t('mandi')}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground">
        {t('browseProductsAndPrices')}
      </p>

      <div className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              data-testid={`mandi-category-${category.id}`}
              onClick={() => handleCategoryClick(category.id)}
              variant="outline"
              className="w-full justify-between h-auto p-4 hover-elevate"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-muted rounded-lg ${category.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{t(category.id)}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>
          );
        })}
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        {t('updatedPricesInfo')}
      </p>
    </Card>
  );
}