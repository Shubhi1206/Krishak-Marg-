import CameraCard from '../CameraCard';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function CameraCardExample() {
  return (
    <LanguageProvider>
      <div className="p-4 max-w-md">
        <CameraCard />
      </div>
    </LanguageProvider>
  );
}