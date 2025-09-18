import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bot, Users, Sprout, MessageCircle } from 'lucide-react';

export default function CropAdvisoryCard() {
  const { t } = useLanguage();
  const [showAIModal, setShowAIModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);

  const handleAIAdvisory = () => {
    console.log('AI Advisory clicked');
    setShowAIModal(true);
  };

  const handleAgriExpert = () => {
    console.log('AgriExpert clicked');
    setShowExpertModal(true);
  };

  return (
    <>
      <Card data-testid="card-crop-advisory" className="p-4 space-y-4 hover-elevate">
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-primary">{t('cropAdvisory')}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Get expert guidance for your crops
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Button
            data-testid="button-ai-advisory"
            onClick={handleAIAdvisory}
            variant="outline"
            className="flex-col h-auto p-4 gap-2"
          >
            <Bot className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">{t('aiAdvisory')}</span>
          </Button>

          <Button
            data-testid="button-agri-expert"
            onClick={handleAgriExpert}
            variant="outline" 
            className="flex-col h-auto p-4 gap-2"
          >
            <Users className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">{t('agriExpert')}</span>
          </Button>
        </div>
      </Card>

      {/* AI Advisory Modal */}
      <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
        <DialogContent data-testid="modal-ai-advisory" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              {t('aiAdvisory')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('getAdvice')}
            </p>
            {/* TODO: Remove mock functionality - Replace with actual AI chat interface */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Bot className="w-6 h-6 text-primary mt-1" />
                <div>
                  <p className="text-sm">
                    Based on current weather conditions and your location, I recommend:
                  </p>
                  <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                    <li>Apply fertilizer before the expected rain</li>
                    <li>Check for pest activity in wheat crops</li>
                    <li>Prepare for irrigation if rain is delayed</li>
                  </ul>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowAIModal(false)} className="w-full">
              {t('close')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AgriExpert Modal */}
      <Dialog open={showExpertModal} onOpenChange={setShowExpertModal}>
        <DialogContent data-testid="modal-agri-expert" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              {t('agriExpert')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('consultExpert')}
            </p>
            {/* TODO: Remove mock functionality - Replace with actual expert consultation system */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg hover-elevate">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Dr. Rajesh Sharma</p>
                  <p className="text-xs text-muted-foreground">Crop Specialist</p>
                </div>
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg hover-elevate">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Dr. Priya Patel</p>
                  <p className="text-xs text-muted-foreground">Soil Health Expert</p>
                </div>
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <Button onClick={() => setShowExpertModal(false)} className="w-full">
              {t('close')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}