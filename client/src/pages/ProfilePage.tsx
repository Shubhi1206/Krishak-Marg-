import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  User, 
  MapPin, 
  Phone, 
  Settings, 
  HelpCircle, 
  LogOut,
  Wheat,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { farmer, logout } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: t('success'),
      description: "Logged out successfully",
    });
    console.log('User logged out');
  };

  const menuItems = [
    { icon: Settings, label: t('settings'), action: () => console.log('Settings clicked') },
    { icon: HelpCircle, label: t('aboutUs'), action: () => console.log('About Us clicked') },
    { icon: Users, label: t('contactUs'), action: () => console.log('Contact Us clicked') },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 p-4 space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {farmer?.name?.charAt(0)?.toUpperCase() || 'F'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{farmer?.name}</h2>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Phone className="w-3 h-3" />
              <span>{farmer?.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{farmer?.location}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Farm Details */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Farm Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{t('farmSize')}</p>
            <p className="font-medium">{farmer?.farmSize || 'N/A'} acres</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{t('cropsGrown')}</p>
            <div className="flex flex-wrap gap-1">
              {farmer?.cropsGrown?.length ? (
                farmer.cropsGrown.map((crop, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                  >
                    <Wheat className="w-3 h-3" />
                    {crop}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No crops specified</span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="hover-elevate">
              <Button
                data-testid={`profile-menu-${index}`}
                variant="ghost"
                onClick={item.action}
                className="w-full justify-start h-auto p-4"
              >
                <Icon className="w-5 h-5 mr-3 text-muted-foreground" />
                <span>{item.label}</span>
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Logout Button */}
      <Card className="hover-elevate">
        <Button
          data-testid="button-logout"
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start h-auto p-4 text-destructive hover:text-destructive"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>{t('logout')}</span>
        </Button>
      </Card>
    </div>
  );
}