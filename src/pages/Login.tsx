import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ArrowRight, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useShop } from '@/hooks/useShop';

const categories = [
  { value: 'kirana', label: 'Kirana / Grocery', labelHi: 'किराना / ग्रॉसरी' },
  { value: 'clothing', label: 'Clothing', labelHi: 'कपड़े' },
  { value: 'electronics', label: 'Electronics', labelHi: 'इलेक्ट्रॉनिक्स' },
  { value: 'stationery', label: 'Stationery', labelHi: 'स्टेशनरी' },
  { value: 'pharmacy', label: 'Pharmacy', labelHi: 'फार्मेसी' },
  { value: 'restaurant', label: 'Restaurant / Food', labelHi: 'रेस्टोरेंट / खाना' },
  { value: 'other', label: 'Other', labelHi: 'अन्य' },
];

export default function Login() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const { shop, loading: shopLoading, createShop } = useShop();
  
  const [step, setStep] = useState<'auth' | 'register'>('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    category: '',
    city: '',
    language: 'en',
  });

  useEffect(() => {
    if (!authLoading && !shopLoading) {
      if (user && shop) {
        navigate('/dashboard');
      } else if (user && !shop) {
        setStep('register');
      }
    }
  }, [user, shop, authLoading, shopLoading, navigate]);

  const handleSignIn = async () => {
    if (!email || !password) return;
    setIsSubmitting(true);
    const { error } = await signIn(email, password);
    setIsSubmitting(false);
  };

  const handleSignUp = async () => {
    if (!email || !password) return;
    setIsSubmitting(true);
    const { error } = await signUp(email, password);
    setIsSubmitting(false);
    if (!error) {
      setStep('register');
    }
  };

  const handleRegister = async () => {
    if (!formData.shopName || !formData.ownerName || !formData.category) return;
    setIsSubmitting(true);
    try {
      await createShop({
        name: formData.shopName,
        owner_name: formData.ownerName,
        category: formData.category,
        city: formData.city,
        language: formData.language,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="w-20 h-20 bg-gradient-primary rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-lg">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Bharat Vyapaar AI</h1>
          <p className="text-muted-foreground mt-1">भारत व्यापार AI</p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl shadow-elevated p-6 lg:p-8 animate-fade-up delay-100">
          {step === 'auth' && (
            <Tabs defaultValue="signin" className="space-y-6">
              <TabsList className="grid grid-cols-2 rounded-2xl">
                <TabsTrigger value="signin" className="rounded-xl">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-xl">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-foreground">Welcome Back!</h2>
                  <p className="text-muted-foreground mt-1">Sign in to your account</p>
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-medium">Email</Label>
                  <div className="relative mt-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 rounded-xl"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-base font-medium">Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSignIn()}
                      className="pl-10 h-12 rounded-xl"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <Button
                  onClick={handleSignIn}
                  disabled={!email || !password || isSubmitting}
                  className="w-full h-12 text-lg rounded-xl bg-gradient-primary hover:opacity-90"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-foreground">Create Account</h2>
                  <p className="text-muted-foreground mt-1">Start your free trial today</p>
                </div>

                <div>
                  <Label htmlFor="signup-email" className="text-base font-medium">Email</Label>
                  <div className="relative mt-2">
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 rounded-xl"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-password" className="text-base font-medium">Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 rounded-xl"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <Button
                  onClick={handleSignUp}
                  disabled={!email || !password || isSubmitting}
                  className="w-full h-12 text-lg rounded-xl bg-gradient-primary hover:opacity-90"
                >
                  {isSubmitting ? 'Creating account...' : 'Sign Up'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </TabsContent>
            </Tabs>
          )}

          {step === 'register' && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground">Register Your Shop</h2>
                <p className="text-muted-foreground mt-1">अपनी दुकान रजिस्टर करें</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Shop Name / दुकान का नाम</Label>
                  <Input
                    placeholder="e.g., Sharma General Store"
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    className="h-12 rounded-xl mt-2"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">Owner Name / मालिक का नाम</Label>
                  <Input
                    placeholder="e.g., Ramesh Sharma"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="h-12 rounded-xl mt-2"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">Shop Category / श्रेणी</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label} ({cat.labelHi})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">City / Locality</Label>
                  <Input
                    placeholder="e.g., Lajpat Nagar, Delhi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-12 rounded-xl mt-2"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">Preferred Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">🇬🇧 English</SelectItem>
                      <SelectItem value="hi">🇮🇳 हिंदी</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleRegister}
                  disabled={!formData.shopName || !formData.ownerName || !formData.category || isSubmitting}
                  className="w-full h-14 text-lg rounded-2xl bg-gradient-primary hover:opacity-90 mt-2"
                >
                  {isSubmitting ? 'Creating shop...' : 'Start Using / शुरू करें'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
