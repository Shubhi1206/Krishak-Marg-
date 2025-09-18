import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Calendar, IndianRupee, FileText, Users } from 'lucide-react';

interface GovernmentScheme {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  status: 'active' | 'upcoming' | 'ended';
  category: string;
}

// TODO: Remove mock functionality - Replace with actual government schemes API
const mockSchemes: GovernmentScheme[] = [
  {
    id: '1',
    title: 'PM-KISAN Samman Nidhi',
    description: 'Direct income support of ₹6,000 per year to small and marginal farmers',
    amount: '₹6,000/year',
    deadline: '31st March 2024',
    eligibility: ['Small and marginal farmers', 'Land holding up to 2 hectares'],
    status: 'active',
    category: 'Income Support',
  },
  {
    id: '2',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme providing financial support against crop loss',
    amount: 'Up to ₹2 lakh',
    deadline: '30th June 2024',
    eligibility: ['All farmers', 'Registered land owners', 'Tenant farmers with agreement'],
    status: 'active',
    category: 'Insurance',
  },
  {
    id: '3',
    title: 'Soil Health Card Scheme',
    description: 'Free soil testing and recommendations for nutrient management',
    amount: 'Free service',
    deadline: 'Ongoing',
    eligibility: ['All farmers', 'No minimum land requirement'],
    status: 'active',
    category: 'Soil Health',
  },
  {
    id: '4',
    title: 'Kisan Credit Card',
    description: 'Easy access to credit facilities for agriculture and allied activities',
    amount: 'Up to ₹3 lakh',
    deadline: 'Ongoing',
    eligibility: ['All farmers', 'Tenant farmers', 'Self Help Group members'],
    status: 'active',
    category: 'Credit',
  },
];

function getStatusColor(status: GovernmentScheme['status']) {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'upcoming': return 'bg-blue-100 text-blue-800';
    case 'ended': return 'bg-gray-100 text-gray-800';
  }
}

export default function SchemesPage() {
  const { t } = useLanguage();

  const handleApply = (schemeId: string) => {
    console.log('Apply for scheme:', schemeId);
    // TODO: Remove mock functionality - Replace with actual application process
  };

  const handleLearnMore = (schemeId: string) => {
    console.log('Learn more about scheme:', schemeId);
    // TODO: Remove mock functionality - Replace with actual scheme details
  };

  return (
    <div className="min-h-screen bg-background pb-20 p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-primary">Government Schemes</h1>
        <p className="text-muted-foreground">
          Explore and apply for agricultural support schemes
        </p>
      </div>

      <div className="space-y-4">
        {mockSchemes.map((scheme) => (
          <Card 
            key={scheme.id}
            data-testid={`scheme-card-${scheme.id}`}
            className="p-6 space-y-4 hover-elevate"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold">{scheme.title}</h3>
                  <Badge className={getStatusColor(scheme.status)}>
                    {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{scheme.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-green-600" />
                <span><strong>Amount:</strong> {scheme.amount}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span><strong>Deadline:</strong> {scheme.deadline}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Eligibility:</span>
              </div>
              <ul className="text-sm text-muted-foreground ml-6 space-y-1">
                {scheme.eligibility.map((criteria, index) => (
                  <li key={index} className="list-disc">{criteria}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2">
              <Button
                data-testid={`button-apply-${scheme.id}`}
                onClick={() => handleApply(scheme.id)}
                disabled={scheme.status === 'ended'}
                className="flex-1"
              >
                <FileText className="w-4 h-4 mr-2" />
                {scheme.status === 'ended' ? 'Application Closed' : 'Apply Now'}
              </Button>
              <Button
                data-testid={`button-learn-more-${scheme.id}`}
                onClick={() => handleLearnMore(scheme.id)}
                variant="outline"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-muted/50">
        <div className="text-center space-y-2">
          <h4 className="font-medium">Need Application Help?</h4>
          <p className="text-sm text-muted-foreground">
            Our team can help you with application processes and documentation
          </p>
          <Button variant="outline" size="sm">
            Get Application Support
          </Button>
        </div>
      </Card>
    </div>
  );
}