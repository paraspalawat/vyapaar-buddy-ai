import { useState } from 'react';
import { 
  MapPin, 
  Megaphone, 
  IndianRupee, 
  Eye, 
  Users,
  Zap,
  ChevronRight,
  Check
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

const promotionTypes = [
  { 
    id: 'highlight', 
    name: 'Product Highlight', 
    nameHi: 'उत्पाद हाइलाइट',
    description: 'Feature your best products',
    icon: '⭐'
  },
  { 
    id: 'discount', 
    name: 'Discount Offer', 
    nameHi: 'डिस्काउंट ऑफ़र',
    description: 'Promote special discounts',
    icon: '💰'
  },
  { 
    id: 'new', 
    name: 'New Arrival', 
    nameHi: 'नया आगमन',
    description: 'Announce new products',
    icon: '✨'
  },
];

const budgetOptions = [
  { value: 50, label: '₹50/day', reach: '500-800 people' },
  { value: 299, label: '₹299/week', reach: '3,000-5,000 people', popular: true },
  { value: 999, label: '₹999/month', reach: '15,000-25,000 people' },
];

export default function Ads() {
  const { t, language } = useLanguage();
  const [radius, setRadius] = useState([3]);
  const [promotionType, setPromotionType] = useState('highlight');
  const [budget, setBudget] = useState(299);
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          {t('ads.title')} 📢
        </h1>
        <p className="text-muted-foreground mt-1">
          Run hyperlocal ads in your neighborhood
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up delay-100">
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-primary/10">
              <Megaphone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Ads</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-green-100">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold">4,892</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-purple-100">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reached</p>
              <p className="text-2xl font-bold">1,245</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-accent/10">
              <IndianRupee className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Spent</p>
              <p className="text-2xl font-bold">₹598</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Ad Section */}
      <div className="dashboard-card animate-fade-up delay-200">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s 
                  ? 'bg-primary text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 4 && (
                <div className={`w-12 h-1 mx-2 rounded ${
                  step > s ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Radius */}
        {step === 1 && (
          <div className="max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-2">
              {t('ads.radius')} 📍
            </h3>
            <p className="text-muted-foreground text-center mb-8">
              How far should your ad reach?
            </p>

            <div className="bg-muted/50 rounded-3xl p-8 mb-6">
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-primary">{radius[0]}</span>
                <span className="text-2xl text-muted-foreground ml-2">km</span>
              </div>
              
              <Slider
                value={radius}
                onValueChange={setRadius}
                max={10}
                min={1}
                step={1}
                className="mb-4"
              />
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1 km</span>
                <span>5 km</span>
                <span>10 km</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[1, 3, 5].map((r) => (
                <Button
                  key={r}
                  variant={radius[0] === r ? 'default' : 'outline'}
                  onClick={() => setRadius([r])}
                  className="rounded-xl h-12"
                >
                  {r} km
                </Button>
              ))}
            </div>

            <p className="text-center text-muted-foreground mb-6">
              <MapPin className="w-4 h-4 inline-block mr-1" />
              Estimated reach: <strong className="text-foreground">{radius[0] * 1500}-{radius[0] * 2500} people</strong>
            </p>

            <Button 
              onClick={() => setStep(2)}
              className="w-full bg-gradient-primary rounded-xl h-12"
            >
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Promotion Type */}
        {step === 2 && (
          <div className="max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-2">
              {t('ads.type')} 🎯
            </h3>
            <p className="text-muted-foreground text-center mb-8">
              What do you want to promote?
            </p>

            <RadioGroup value={promotionType} onValueChange={setPromotionType} className="space-y-4 mb-6">
              {promotionTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    promotionType === type.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => setPromotionType(type.id)}
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value={type.id} id={type.id} />
                    <span className="text-3xl">{type.icon}</span>
                    <div>
                      <Label htmlFor={type.id} className="text-lg font-medium cursor-pointer">
                        {language === 'hi' ? type.nameHi : type.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-3">
              <Button 
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 rounded-xl h-12"
              >
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)}
                className="flex-1 bg-gradient-primary rounded-xl h-12"
              >
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div className="max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-2">
              {t('ads.budget')} 💰
            </h3>
            <p className="text-muted-foreground text-center mb-8">
              Choose your advertising budget
            </p>

            <div className="space-y-4 mb-6">
              {budgetOptions.map((option) => (
                <div 
                  key={option.value}
                  onClick={() => setBudget(option.value)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative ${
                    budget === option.value 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  {option.popular && (
                    <div className="absolute -top-3 left-4 bg-accent text-white text-xs px-3 py-1 rounded-full font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.reach}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      budget === option.value 
                        ? 'border-primary bg-primary' 
                        : 'border-muted-foreground'
                    }`}>
                      {budget === option.value && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1 rounded-xl h-12"
              >
                Back
              </Button>
              <Button 
                onClick={() => setStep(4)}
                className="flex-1 bg-gradient-primary rounded-xl h-12"
              >
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Preview & Launch */}
        {step === 4 && (
          <div className="max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-2">
              Preview Your Ad 👀
            </h3>
            <p className="text-muted-foreground text-center mb-8">
              Review and launch your campaign
            </p>

            {/* Ad Preview */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-6 text-white mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  {promotionTypes.find(t => t.id === promotionType)?.icon}
                </div>
                <div>
                  <p className="font-bold">Sharma General Store</p>
                  <p className="text-sm text-white/80">Lajpat Nagar, Delhi</p>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">
                {promotionType === 'highlight' && 'Premium Products Available!'}
                {promotionType === 'discount' && '🎉 Special 20% OFF Today!'}
                {promotionType === 'new' && '✨ New Arrivals in Store!'}
              </h4>
              <p className="text-white/80 mb-4">
                Visit our shop for the best quality products at affordable prices. 
                Fresh stocks available daily!
              </p>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Within {radius[0]} km radius</span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-muted/50 rounded-2xl p-4 mb-6">
              <h4 className="font-medium mb-3">Campaign Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Radius</span>
                  <span className="font-medium">{radius[0]} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">
                    {promotionTypes.find(t => t.id === promotionType)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">
                    {budgetOptions.find(b => b.value === budget)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Est. Reach</span>
                  <span className="font-medium">
                    {budgetOptions.find(b => b.value === budget)?.reach}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => setStep(3)}
                variant="outline"
                className="flex-1 rounded-xl h-12"
              >
                Back
              </Button>
              <Button 
                onClick={() => setStep(1)}
                className="flex-1 bg-gradient-accent rounded-xl h-12"
              >
                <Zap className="w-4 h-4 mr-2" />
                {t('ads.startAd')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
