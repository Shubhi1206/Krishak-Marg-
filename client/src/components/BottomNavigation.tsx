import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Home, 
  CreditCard, 
  User, 
  FileText, 
  MessageSquare,
  Leaf
} from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const { t } = useLanguage();

  const tabs = [
    { id: 'subscription', label: t('subscription'), icon: CreditCard },
    { id: 'profile', label: t('profile'), icon: User },
    { id: 'home', label: t('home'), icon: Home, isCenter: true },
    { id: 'schemes', label: t('schemes'), icon: FileText },
    { id: 'feedback', label: t('feedback'), icon: MessageSquare },
  ];

  const handleTabClick = (tabId: string) => {
    console.log(`${tabId} tab clicked`);
    onTabChange(tabId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              data-testid={`nav-${tab.id}`}
              variant="ghost"
              onClick={() => handleTabClick(tab.id)}
              className={`
                h-full rounded-none flex-col gap-1 p-2
                ${isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground'}
                ${tab.isCenter ? 'relative' : ''}
              `}
            >
              {tab.isCenter && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Leaf className="w-6 h-6 text-primary-foreground" />
                </div>
              )}
              
              {!tab.isCenter && (
                <>
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </>
              )}
              
              {tab.isCenter && (
                <span className="text-xs font-medium mt-6">{tab.label}</span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}