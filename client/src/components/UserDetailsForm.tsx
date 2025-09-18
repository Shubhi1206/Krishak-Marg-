import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { User, MapPin, Wheat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserDetailsFormProps {
  onComplete: () => void;
}

const cropOptions = [
  { id: 'wheat', nameEn: 'Wheat', nameHi: 'गेहूं', namePa: 'ਕਣਕ' },
  { id: 'rice', nameEn: 'Rice', nameHi: 'धान', namePa: 'ਝੋਨਾ' },
  { id: 'cotton', nameEn: 'Cotton', nameHi: 'कपास', namePa: 'ਕਪਾਹ' },
  { id: 'sugarcane', nameEn: 'Sugarcane', nameHi: 'गन्ना', namePa: 'ਗੰਨਾ' },
  { id: 'maize', nameEn: 'Maize', nameHi: 'मक्का', namePa: 'ਮੱਕੀ' },
  { id: 'soybean', nameEn: 'Soybean', nameHi: 'सोयाबीन', namePa: 'ਸੋਇਆਬੀਨ' },
];

export default function UserDetailsForm({ onComplete }: UserDetailsFormProps) {
  const { farmer, setFarmer } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: farmer?.name || '',
    location: farmer?.location || '',
    farmSize: farmer?.farmSize || 0,
    cropsGrown: farmer?.cropsGrown || [],
  });

  const getCropName = (crop: typeof cropOptions[0]) => {
    switch (language) {
      case 'hi': return crop.nameHi;
      case 'pa': return crop.namePa;
      default: return crop.nameEn;
    }
  };

  const handleCropToggle = (cropId: string) => {
    setFormData(prev => ({
      ...prev,
      cropsGrown: prev.cropsGrown.includes(cropId)
        ? prev.cropsGrown.filter(id => id !== cropId)
        : [...prev.cropsGrown, cropId]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.location) {
      toast({
        title: t('error'),
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // TODO: Remove mock functionality - Replace with actual API call
    setTimeout(() => {
      const updatedFarmer = {
        ...farmer!,
        ...formData,
        isVerified: true,
      };
      
      setFarmer(updatedFarmer);
      // Store for demo purposes
      localStorage.setItem(`farmer_${farmer!.phoneNumber}`, JSON.stringify(updatedFarmer));
      
      toast({
        title: t('success'),
        description: "Profile updated successfully!",
      });
      
      console.log('Farmer details saved:', updatedFarmer);
      onComplete();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Help us provide better recommendations
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('name')} *</Label>
            <Input
              data-testid="input-name"
              id="name"
              placeholder={t('enterName')}
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{t('location')} *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                data-testid="input-location"
                id="location"
                placeholder={t('enterLocation')}
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="farmSize">{t('farmSize')}</Label>
            <Input
              data-testid="input-farm-size"
              id="farmSize"
              type="number"
              placeholder="5"
              value={formData.farmSize || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, farmSize: Number(e.target.value) }))}
            />
          </div>

          <div className="space-y-3">
            <Label>{t('cropsGrown')}</Label>
            <div className="grid grid-cols-2 gap-3">
              {cropOptions.map((crop) => (
                <div key={crop.id} className="flex items-center space-x-2">
                  <Checkbox
                    data-testid={`checkbox-crop-${crop.id}`}
                    id={crop.id}
                    checked={formData.cropsGrown.includes(crop.id)}
                    onCheckedChange={() => handleCropToggle(crop.id)}
                  />
                  <Label htmlFor={crop.id} className="text-sm">
                    {getCropName(crop)}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            data-testid="button-save-profile"
            onClick={handleSubmit} 
            disabled={isLoading || !formData.name || !formData.location}
            className="w-full"
          >
            {isLoading ? t('loading') : t('save')}
          </Button>
        </div>
      </Card>
    </div>
  );
}