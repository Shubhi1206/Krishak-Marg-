import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import WeatherCard from '@/components/WeatherCard';
import CropAdvisoryCard from '@/components/CropAdvisoryCard';
import CameraCard from '@/components/CameraCard';
import MandiCard from '@/components/MarketPricesCard';
import NewsAlertCard from '@/components/NewsAlertCard';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import { MapPin, User } from 'lucide-react';
import agricultureBg from '@assets/generated_images/Farmer_using_mobile_technology_d61a69cc.png';

export default function HomePage() {
  const { farmer } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="relative">
        <div 
          className="h-32 bg-gradient-to-r from-primary to-primary/80 flex items-end p-4"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${agricultureBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="w-full">
            <div className="flex justify-between items-start mb-4">
              <div className="text-white">
                <h1 className="text-xl font-bold">
                  {t('hello')}, {farmer?.name || t('defaultFarmerName')}!
                </h1>
                <div className="flex items-center gap-1 text-sm opacity-90">
                  <MapPin className="w-3 h-3" />
                  <span>{farmer?.location || t('defaultLocation')}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Weather Updates */}
        <WeatherCard />

        {/* Crop Advisory */}
        <CropAdvisoryCard />

        {/* Camera Feature */}
        <CameraCard />

        {/* Mandi and News Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MandiCard />
          <NewsAlertCard />
        </div>
      </div>
    </div>
  );
}