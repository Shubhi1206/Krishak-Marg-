import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, Star, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeedbackForm {
  subject: string;
  message: string;
  rating: string;
  category: string;
}

export default function FeedbackPage() {
  const { t } = useLanguage();
  const { farmer } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FeedbackForm>({
    subject: '',
    message: '',
    rating: '',
    category: '',
  });

  const categories = [
    { id: 'weather', label: 'Weather Updates' },
    { id: 'crop', label: 'Crop Advisory' },
    { id: 'camera', label: 'Camera Feature' },
    { id: 'market', label: 'Market Prices' },
    { id: 'ui', label: 'App Experience' },
    { id: 'other', label: 'Other' },
  ];

  const ratings = [
    { value: '5', label: 'Excellent' },
    { value: '4', label: 'Good' },
    { value: '3', label: 'Average' },
    { value: '2', label: 'Poor' },
    { value: '1', label: 'Very Poor' },
  ];

  const handleSubmit = async () => {
    if (!formData.subject || !formData.message || !formData.rating || !formData.category) {
      toast({
        title: t('error'),
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // TODO: Remove mock functionality - Replace with actual feedback submission API
    setTimeout(() => {
      console.log('Feedback submitted:', {
        ...formData,
        farmerPhone: farmer?.phoneNumber,
        timestamp: new Date().toISOString(),
      });
      
      toast({
        title: t('success'),
        description: "Thank you for your feedback! We'll review it soon.",
      });
      
      // Reset form
      setFormData({
        subject: '',
        message: '',
        rating: '',
        category: '',
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-20 p-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-primary">{t('feedback')}</h1>
        <p className="text-muted-foreground">
          Help us improve KrishakMarg with your valuable feedback
        </p>
      </div>

      <Card className="p-6 space-y-6">
        {/* Category Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Feedback Category *</Label>
          <RadioGroup 
            value={formData.category} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          >
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    data-testid={`category-${category.id}`}
                    value={category.id} 
                    id={category.id} 
                  />
                  <Label htmlFor={category.id} className="text-sm">{category.label}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Overall Rating *</Label>
          <RadioGroup 
            value={formData.rating} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, rating: value }))}
          >
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    data-testid={`rating-${rating.value}`}
                    value={rating.value} 
                    id={rating.value} 
                  />
                  <Label htmlFor={rating.value} className="text-sm flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < parseInt(rating.value) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    {rating.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-base font-medium">Subject *</Label>
          <Input
            data-testid="input-feedback-subject"
            id="subject"
            placeholder="Brief subject for your feedback"
            value={formData.subject}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-base font-medium">Message *</Label>
          <Textarea
            data-testid="textarea-feedback-message"
            id="message"
            placeholder="Please share your detailed feedback, suggestions, or issues..."
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            rows={5}
          />
        </div>

        {/* Submit Button */}
        <Button
          data-testid="button-submit-feedback"
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.subject || !formData.message || !formData.rating || !formData.category}
          className="w-full"
        >
          {isSubmitting ? (
            <>{t('loading')}</>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {t('submit')} {t('feedback')}
            </>
          )}
        </Button>
      </Card>

      <Card className="p-4 bg-muted/50">
        <div className="text-center space-y-2">
          <h4 className="font-medium">Quick Contact</h4>
          <p className="text-sm text-muted-foreground">
            For urgent issues, contact our support team directly
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm">
              Call Support
            </Button>
            <Button variant="outline" size="sm">
              WhatsApp
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}