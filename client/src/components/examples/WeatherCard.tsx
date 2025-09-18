import WeatherCard from '../WeatherCard';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function WeatherCardExample() {
  return (
    <LanguageProvider>
      <div className="p-4 max-w-md">
        <WeatherCard />
      </div>
    </LanguageProvider>
  );
}