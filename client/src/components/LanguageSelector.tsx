import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { Languages, Check } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'pa' as Language, name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (langCode: Language) => {
    console.log('Language changed to:', langCode);
    setLanguage(langCode);
    setShowModal(false);
  };

  return (
    <>
      <Button
        data-testid="button-language-selector"
        variant="outline"
        size="sm"
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2"
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent data-testid="modal-language-selector" className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary" />
              {t('selectLanguage')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                data-testid={`language-option-${lang.code}`}
                variant="outline"
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full justify-between h-auto p-4 ${
                  language === lang.code ? 'border-primary bg-primary/10' : ''
                }`}
              >
                <div className="text-left">
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-sm text-muted-foreground">{lang.name}</div>
                </div>
                {language === lang.code && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}