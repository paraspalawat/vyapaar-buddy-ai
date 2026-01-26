import { 
  User, 
  CreditCard, 
  Receipt, 
  Key, 
  Globe,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Check
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const plans = [
  { 
    id: 'free', 
    name: 'Free', 
    price: '₹0', 
    features: ['Basic Dashboard', '50 Products', 'WhatsApp (50/month)'] 
  },
  { 
    id: 'pro', 
    name: 'Pro', 
    price: '₹499/month', 
    features: ['All Features', 'Unlimited Products', 'AI Assistant', 'Priority Support'],
    popular: true 
  },
  { 
    id: 'business', 
    name: 'Business', 
    price: '₹999/month', 
    features: ['Everything in Pro', 'Multi-store', 'API Access', 'Dedicated Manager'] 
  },
];

const billingHistory = [
  { date: '15 Jan 2024', amount: '₹499', status: 'Paid', plan: 'Pro' },
  { date: '15 Dec 2023', amount: '₹499', status: 'Paid', plan: 'Pro' },
  { date: '15 Nov 2023', amount: '₹499', status: 'Paid', plan: 'Pro' },
];

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          {t('settings.title')} ⚙️
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="animate-fade-up delay-100">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 rounded-2xl">
          <TabsTrigger value="profile" className="rounded-xl">{t('settings.profile')}</TabsTrigger>
          <TabsTrigger value="subscription" className="rounded-xl">{t('settings.subscription')}</TabsTrigger>
          <TabsTrigger value="billing" className="rounded-xl">{t('settings.billing')}</TabsTrigger>
          <TabsTrigger value="api" className="rounded-xl">{t('settings.api')}</TabsTrigger>
          <TabsTrigger value="language" className="rounded-xl">{t('settings.language')}</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="mt-6">
          <div className="dashboard-card">
            <h3 className="font-bold text-lg mb-6">Shop Profile</h3>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                SS
              </div>
              <div>
                <h4 className="text-xl font-bold">Sharma General Store</h4>
                <p className="text-muted-foreground">Kirana / Grocery • Lajpat Nagar, Delhi</p>
                <Button variant="outline" size="sm" className="mt-2 rounded-xl">
                  Change Photo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Shop Name / दुकान का नाम</Label>
                <Input defaultValue="Sharma General Store" className="mt-2 rounded-xl" />
              </div>
              <div>
                <Label>Owner Name / मालिक का नाम</Label>
                <Input defaultValue="Ramesh Sharma" className="mt-2 rounded-xl" />
              </div>
              <div>
                <Label>Mobile Number</Label>
                <Input defaultValue="+91 98765 43210" className="mt-2 rounded-xl" disabled />
              </div>
              <div>
                <Label>Shop Category</Label>
                <Input defaultValue="Kirana / Grocery" className="mt-2 rounded-xl" />
              </div>
              <div className="md:col-span-2">
                <Label>Address</Label>
                <Input defaultValue="Shop No. 12, Lajpat Nagar Market, New Delhi - 110024" className="mt-2 rounded-xl" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button className="bg-gradient-primary rounded-xl">
                Save Changes
              </Button>
            </div>
          </div>

          {/* Notifications */}
          <div className="dashboard-card mt-6">
            <h3 className="font-bold text-lg mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span>Low Stock Alerts</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span>Daily Sales Summary</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span>WhatsApp Campaign Reports</span>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Subscription */}
        <TabsContent value="subscription" className="mt-6">
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg">Current Plan</h3>
                <p className="text-muted-foreground">You're on the Pro plan</p>
              </div>
              <Badge className="bg-gradient-primary text-white rounded-full px-4 py-1">
                Pro Plan
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    plan.id === 'pro' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  {plan.popular && (
                    <Badge className="bg-accent text-white mb-3 rounded-full">
                      Current Plan
                    </Badge>
                  )}
                  <h4 className="text-xl font-bold">{plan.name}</h4>
                  <p className="text-2xl font-bold text-primary mt-2">{plan.price}</p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={plan.id === 'pro' ? 'outline' : 'default'}
                    className="w-full mt-4 rounded-xl"
                    disabled={plan.id === 'pro'}
                  >
                    {plan.id === 'pro' ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="mt-6">
          <div className="dashboard-card">
            <h3 className="font-bold text-lg mb-6">{t('settings.billing')}</h3>
            
            <div className="space-y-4">
              {billingHistory.map((bill, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{bill.plan} Plan</p>
                      <p className="text-sm text-muted-foreground">{bill.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{bill.amount}</p>
                    <Badge variant="secondary" className="rounded-full text-green-600">
                      {bill.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4 rounded-xl">
              Download All Invoices
            </Button>
          </div>
        </TabsContent>

        {/* API */}
        <TabsContent value="api" className="mt-6">
          <div className="dashboard-card">
            <h3 className="font-bold text-lg mb-2">{t('settings.api')}</h3>
            <p className="text-muted-foreground mb-6">
              Use these keys to integrate with your POS system
            </p>

            <div className="space-y-4">
              <div>
                <Label>API Key</Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    type="password" 
                    defaultValue="bv_live_xxxxxxxxxxxxxxxxxxxx" 
                    className="rounded-xl font-mono"
                    readOnly
                  />
                  <Button variant="outline" className="rounded-xl">
                    Copy
                  </Button>
                </div>
              </div>

              <div>
                <Label>Webhook URL</Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    defaultValue="https://api.bharatvyapaar.ai/webhook/xxx" 
                    className="rounded-xl font-mono"
                    readOnly
                  />
                  <Button variant="outline" className="rounded-xl">
                    Copy
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-sm text-yellow-800">
                  ⚠️ Keep your API keys secure. Never share them publicly.
                </p>
              </div>

              <Button className="rounded-xl">
                <Key className="w-4 h-4 mr-2" />
                Regenerate API Key
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Language */}
        <TabsContent value="language" className="mt-6">
          <div className="dashboard-card">
            <h3 className="font-bold text-lg mb-6">{t('settings.language')}</h3>
            
            <div className="space-y-4">
              <div 
                onClick={() => setLanguage('en')}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition-all ${
                  language === 'en' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🇬🇧</span>
                  <div>
                    <p className="font-medium">English</p>
                    <p className="text-sm text-muted-foreground">Default language</p>
                  </div>
                </div>
                {language === 'en' && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div 
                onClick={() => setLanguage('hi')}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition-all ${
                  language === 'hi' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🇮🇳</span>
                  <div>
                    <p className="font-medium">हिंदी</p>
                    <p className="text-sm text-muted-foreground">Hindi language</p>
                  </div>
                </div>
                {language === 'hi' && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Help & Logout */}
          <div className="dashboard-card mt-6">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-between rounded-xl h-12">
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5" />
                  Help & Support
                </span>
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="w-full justify-between rounded-xl h-12">
                <span className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  Privacy Policy
                </span>
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="w-full justify-between rounded-xl h-12 text-red-600 hover:text-red-700 hover:bg-red-50">
                <span className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  Logout
                </span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
