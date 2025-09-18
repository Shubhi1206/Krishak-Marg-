import { useState } from 'react';
import BottomNavigation from '../BottomNavigation';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function BottomNavigationExample() {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <LanguageProvider>
      <div className="relative h-64 bg-background">
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
      </div>
    </LanguageProvider>
  );
}