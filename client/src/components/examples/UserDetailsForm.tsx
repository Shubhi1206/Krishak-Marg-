import UserDetailsForm from '../UserDetailsForm';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function UserDetailsFormExample() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <UserDetailsForm 
          onComplete={() => console.log('Profile completed!')}
        />
      </AuthProvider>
    </LanguageProvider>
  );
}