import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { CloudRain, Sun, Cloud, Wind, Droplets, Thermometer } from 'lucide-react';

interface WeatherData {
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    rainChance: number;
  }>;
}

// TODO: Remove mock functionality - Replace with actual weather API data
const mockWeatherData: WeatherData = {
  current: {
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    icon: 'partly-cloudy',
  },
  forecast: [
    { day: 'Today', high: 30, low: 22, condition: 'Sunny', icon: 'sunny', rainChance: 10 },
    { day: 'Tomorrow', high: 29, low: 21, condition: 'Cloudy', icon: 'cloudy', rainChance: 30 },
    { day: 'Day 3', high: 26, low: 19, condition: 'Rainy', icon: 'rainy', rainChance: 80 },
  ],
};

function getWeatherIcon(iconType: string) {
  switch (iconType) {
    case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />;
    case 'cloudy': return <Cloud className="w-6 h-6 text-gray-500" />;
    case 'rainy': return <CloudRain className="w-6 h-6 text-blue-500" />;
    case 'partly-cloudy': return <Cloud className="w-6 h-6 text-gray-400" />;
    default: return <Sun className="w-6 h-6 text-yellow-500" />;
  }
}

export default function WeatherCard() {
  const { t } = useLanguage();

  return (
    <Card data-testid="card-weather" className="p-4 space-y-4 hover-elevate">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">{t('currentWeather')}</h3>
        {getWeatherIcon(mockWeatherData.current.icon)}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-red-500" />
            <span className="text-2xl font-bold">{mockWeatherData.current.temperature}°C</span>
          </div>
          <p className="text-sm text-muted-foreground">{mockWeatherData.current.condition}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span>{t('humidity')}: {mockWeatherData.current.humidity}%</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wind className="w-4 h-4 text-gray-500" />
            <span>{t('wind')}: {mockWeatherData.current.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium mb-3">{t('forecast')}</h4>
        <div className="grid grid-cols-3 gap-2">
          {mockWeatherData.forecast.map((day, index) => (
            <div 
              key={index} 
              data-testid={`forecast-day-${index}`}
              className="text-center p-2 rounded-lg bg-muted/50"
            >
              <div className="text-xs font-medium">{day.day}</div>
              <div className="my-2 flex justify-center">
                {getWeatherIcon(day.icon)}
              </div>
              <div className="text-xs">
                <div className="font-semibold">{day.high}°</div>
                <div className="text-muted-foreground">{day.low}°</div>
              </div>
              <div className="text-xs text-blue-600 mt-1">
                {day.rainChance}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}