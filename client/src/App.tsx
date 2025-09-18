import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useState } from "react";

// Components
import MobileLoginForm from "@/components/MobileLoginForm";
import UserDetailsForm from "@/components/UserDetailsForm";
import BottomNavigation from "@/components/BottomNavigation";

// Pages
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import SubscriptionPage from "@/pages/SubscriptionPage";
import SchemesPage from "@/pages/SchemesPage";
import FeedbackPage from "@/pages/FeedbackPage";
import NotFound from "@/pages/not-found";

function AuthenticatedApp() {
  const { farmer, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showUserDetails, setShowUserDetails] = useState(false);

  // Show user details form if farmer exists but profile is incomplete
  const needsProfileCompletion = farmer && (!farmer.name || !farmer.location);

  const handleLoginSuccess = () => {
    if (needsProfileCompletion) {
      setShowUserDetails(true);
    }
  };

  const handleProfileComplete = () => {
    setShowUserDetails(false);
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <MobileLoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  // Show user details form if profile is incomplete
  if (showUserDetails || needsProfileCompletion) {
    return <UserDetailsForm onComplete={handleProfileComplete} />;
  }

  // Show main app
  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        <Switch>
          <Route path="/" component={() => <HomePage />} />
          <Route path="/home" component={() => <HomePage />} />
          <Route path="/profile" component={() => <ProfilePage />} />
          <Route path="/subscription" component={() => <SubscriptionPage />} />
          <Route path="/schemes" component={() => <SchemesPage />} />
          <Route path="/feedback" component={() => <FeedbackPage />} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          // Navigate to corresponding route
          const routes = {
            home: '/',
            profile: '/profile',
            subscription: '/subscription',
            schemes: '/schemes',
            feedback: '/feedback',
          };
          if (routes[tab as keyof typeof routes]) {
            window.history.pushState(null, '', routes[tab as keyof typeof routes]);
          }
        }} 
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <AuthenticatedApp />
          </AuthProvider>
        </LanguageProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;