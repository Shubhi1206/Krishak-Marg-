import CropAdvisoryCard from '../CropAdvisoryCard';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function CropAdvisoryCardExample() {
  return (
    <LanguageProvider>
      <div className="p-4 max-w-md">
        <CropAdvisoryCard />
      </div>
    </LanguageProvider>
  );
}