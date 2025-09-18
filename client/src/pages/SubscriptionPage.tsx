import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, Crown, Star, Zap } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
  isCurrentPlan?: boolean;
}

// TODO: Remove mock functionality - Replace with actual subscription plans
const mockPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    duration: 'month',
    features: [
      'Weather updates',
      'Basic crop information',
      'Market prices',
      'Limited AI consultations (5/month)',
    ],
    isCurrentPlan: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 299,
    duration: 'month',
    features: [
      'All Basic features',
      'Unlimited AI consultations',
      'Expert consultations (2/month)',
      'Detailed soil analysis',
      'Premium weather forecasts',
      'Disease detection',
    ],
    isPopular: true,
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 599,
    duration: 'month',
    features: [
      'All Premium features',
      'Unlimited expert consultations',
      'Custom farming plans',
      'Priority support',
      'Advanced analytics',
      'Yield prediction',
    ],
  },
];

export default function SubscriptionPage() {
  const { t } = useLanguage();

  const handleSubscribe = (planId: string) => {
    console.log('Subscribe to plan:', planId);
    // TODO: Remove mock functionality - Replace with actual subscription logic
  };

  return (
    <div className="min-h-screen bg-background pb-20 p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-primary">Choose Your Plan</h1>
        <p className="text-muted-foreground">
          Get more features to boost your farming productivity
        </p>
      </div>

      <div className="space-y-4">
        {mockPlans.map((plan) => (
          <Card 
            key={plan.id}
            data-testid={`subscription-plan-${plan.id}`}
            className={`p-6 relative ${plan.isPopular ? 'border-primary' : ''} hover-elevate`}
          >
            {plan.isPopular && (
              <Badge className="absolute -top-2 left-4 bg-primary">
                <Star className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            )}
            
            {plan.isCurrentPlan && (
              <Badge variant="secondary" className="absolute -top-2 right-4">
                Current Plan
              </Badge>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    {plan.id === 'pro' && <Crown className="w-5 h-5 text-yellow-500" />}
                    {plan.id === 'premium' && <Zap className="w-5 h-5 text-primary" />}
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold">₹{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.duration}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Features included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                data-testid={`button-subscribe-${plan.id}`}
                onClick={() => handleSubscribe(plan.id)}
                disabled={plan.isCurrentPlan}
                className="w-full"
                variant={plan.isPopular ? 'default' : 'outline'}
              >
                {plan.isCurrentPlan ? 'Current Plan' : plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-muted/50">
        <div className="text-center space-y-2">
          <h4 className="font-medium">Need help choosing?</h4>
          <p className="text-sm text-muted-foreground">
            Contact our support team for personalized recommendations
          </p>
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
        </div>
      </Card>
    </div>
  );
}