import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { Camera, FileText, Image as ImageIcon, Scan } from 'lucide-react';

export default function CameraCard() {
  const { t } = useLanguage();
  const [showCameraModal, setShowCameraModal] = useState(false);

  const handleCameraClick = () => {
    console.log('Camera clicked');
    setShowCameraModal(true);
  };

  const handleDocumentScan = () => {
    console.log('Document scan clicked');
    // TODO: Remove mock functionality - Replace with actual document scanner
    setShowCameraModal(false);
  };

  const handleRealImageCapture = () => {
    console.log('Real image capture clicked');
    // TODO: Remove mock functionality - Replace with actual camera capture
    setShowCameraModal(false);
  };

  return (
    <>
      <Card data-testid="card-camera" className="p-4 space-y-4 hover-elevate">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-primary">{t('camera')}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Capture and analyze crop images
        </p>

        <Button
          data-testid="button-camera"
          onClick={handleCameraClick}
          className="w-full flex items-center gap-2"
        >
          <Camera className="w-4 h-4" />
          Open Camera
        </Button>
      </Card>

      {/* Camera Options Modal */}
      <Dialog open={showCameraModal} onOpenChange={setShowCameraModal}>
        <DialogContent data-testid="modal-camera-options" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              {t('camera')} Options
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose capture mode for your needs
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                data-testid="button-document-scan"
                onClick={handleDocumentScan}
                variant="outline"
                className="flex-col h-auto p-4 gap-2"
              >
                <FileText className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium">{t('document')}</span>
                <span className="text-xs text-muted-foreground text-center">
                  {t('scanDocument')}
                </span>
              </Button>

              <Button
                data-testid="button-real-image"
                onClick={handleRealImageCapture}
                variant="outline"
                className="flex-col h-auto p-4 gap-2"
              >
                <ImageIcon className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium">{t('realImage')}</span>
                <span className="text-xs text-muted-foreground text-center">
                  {t('captureImage')}
                </span>
              </Button>
            </div>

            {/* TODO: Remove mock functionality - Replace with actual camera interface */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Scan className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Quick Tips:</span>
              </div>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Good lighting improves analysis</li>
                <li>• Hold camera steady for clear images</li>
                <li>• Focus on affected areas for diseases</li>
              </ul>
            </div>

            <Button 
              onClick={() => setShowCameraModal(false)} 
              variant="outline" 
              className="w-full"
            >
              {t('cancel')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}