import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell, ExternalLink, Clock, AlertTriangle } from 'lucide-react';

interface NewsAlert {
  id: string;
  title: string;
  summary: string;
  category: 'weather' | 'government' | 'market' | 'emergency';
  timestamp: string;
  isUrgent: boolean;
}

// TODO: Remove mock functionality - Replace with actual news API data
// Mock news alerts with translation keys
function getMockNewsAlerts(t: (key: string) => string): NewsAlert[] {
  return [
    {
      id: '1',
      title: t('weatherAlertTitle'),
      summary: t('weatherAlertSummary'),
      category: 'weather',
      timestamp: '2|hoursAgo',
      isUrgent: true,
    },
    {
      id: '2',
      title: t('governmentAlertTitle'),
      summary: t('governmentAlertSummary'),
      category: 'government',
      timestamp: '5|hoursAgo',
      isUrgent: false,
    },
    {
      id: '3',
      title: t('marketAlertTitle'),
      summary: t('marketAlertSummary'),
      category: 'market',
      timestamp: '1|dayAgo',
      isUrgent: false,
    },
  ];
}

function getCategoryColor(category: NewsAlert['category']) {
  switch (category) {
    case 'weather': return 'bg-blue-100 text-blue-800';
    case 'government': return 'bg-green-100 text-green-800';
    case 'market': return 'bg-purple-100 text-purple-800';
    case 'emergency': return 'bg-red-100 text-red-800';
  }
}

function getCategoryIcon(category: NewsAlert['category'], t: (key: string) => string) {
  switch (category) {
    case 'weather': return t('weather');
    case 'government': return t('government');
    case 'market': return t('market');
    case 'emergency': return t('emergency');
  }
}

function formatTimestamp(timestamp: string, t: (key: string) => string) {
  const [number, timeKey] = timestamp.split('|');
  return `${number} ${t(timeKey)}`;
}

export default function NewsAlertCard() {
  const { t } = useLanguage();
  const mockNewsAlerts = getMockNewsAlerts(t);

  const handleNewsClick = (newsId: string) => {
    console.log('News alert clicked:', newsId);
    // TODO: Navigate to full news article or show detailed view
  };

  const handleViewAll = () => {
    console.log('View all news clicked');
    // TODO: Navigate to full news page
  };

  return (
    <Card data-testid="card-news-alerts" className="p-4 space-y-4 hover-elevate">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-primary">{t('news')}</h3>
        </div>
        <Button 
          data-testid="button-view-all-news"
          variant="ghost" 
          size="sm"
          onClick={handleViewAll}
          className="text-primary"
        >
          {t('viewAll')}
        </Button>
      </div>
      
      <div className="space-y-3">
        {mockNewsAlerts.slice(0, 2).map((alert) => (
          <div 
            key={alert.id}
            data-testid={`news-alert-${alert.id}`}
            onClick={() => handleNewsClick(alert.id)}
            className="p-3 border rounded-lg cursor-pointer hover-elevate space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {alert.isUrgent && (
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <h4 className="font-medium text-sm line-clamp-1">{alert.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{alert.summary}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </div>
            
            <div className="flex items-center justify-between">
              <Badge className={getCategoryColor(alert.category)}>
                {getCategoryIcon(alert.category, t)}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{formatTimestamp(alert.timestamp, t)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        {t('stayUpdatedNews')}
      </p>
    </Card>
  );
}