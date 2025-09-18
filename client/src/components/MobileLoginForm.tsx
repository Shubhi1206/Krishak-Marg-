import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Smartphone, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MobileLoginFormProps {
  onLoginSuccess: () => void;
}

export default function MobileLoginForm({ onLoginSuccess }: MobileLoginFormProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const { setFarmer } = useAuth();
  const { toast } = useToast();

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: t('error'),
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // TODO: Remove mock functionality - Replace with actual OTP API call
    setTimeout(() => {
      console.log('OTP sent to:', phoneNumber);
      toast({
        title: t('success'),
        description: "OTP sent successfully! Use 123456 for demo.",
      });
      setStep('otp');
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: t('error'),
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // TODO: Remove mock functionality - Replace with actual OTP verification
    setTimeout(() => {
      if (otp === '123456') {
        // Check if user exists, if not redirect to user details
        const existingUser = localStorage.getItem(`farmer_${phoneNumber}`);
        if (existingUser) {
          const farmer = JSON.parse(existingUser);
          setFarmer(farmer);
          onLoginSuccess();
        } else {
          // New user - will be handled by UserDetailsForm
          setFarmer({ phoneNumber, name: '', location: '', language: 'hi' });
          onLoginSuccess();
        }
        console.log('OTP verified for:', phoneNumber);
      } else {
        toast({
          title: t('error'),
          description: "Invalid OTP. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    setStep('phone');
    setOtp('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            {step === 'phone' ? (
              <Smartphone className="w-8 h-8 text-primary" />
            ) : (
              <Shield className="w-8 h-8 text-primary" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-primary">KrishakMarg</h1>
          <p className="text-muted-foreground">
            {step === 'phone' ? t('enterPhone') : t('verifyOtp')}
          </p>
        </div>

        {step === 'phone' ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('phoneNumber')}</label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 py-2 border rounded-md bg-muted text-sm">
                  +91
                </div>
                <Input
                  data-testid="input-phone"
                  type="tel"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={10}
                  className="flex-1"
                />
              </div>
            </div>
            <Button 
              data-testid="button-send-otp"
              onClick={handleSendOtp} 
              disabled={isLoading || !phoneNumber}
              className="w-full"
            >
              {isLoading ? t('loading') : t('sendOtp')}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('enterOtp')}</label>
              <Input
                data-testid="input-otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-muted-foreground text-center">
                Demo OTP: 123456
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                data-testid="button-back"
                variant="outline" 
                onClick={handleBack}
                className="flex-1"
              >
                {t('back')}
              </Button>
              <Button 
                data-testid="button-verify-otp"
                onClick={handleVerifyOtp} 
                disabled={isLoading || !otp}
                className="flex-1"
              >
                {isLoading ? t('loading') : t('verifyOtp')}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}