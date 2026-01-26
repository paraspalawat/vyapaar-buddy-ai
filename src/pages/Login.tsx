import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Phone, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Step = 'phone' | 'otp' | 'register';

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
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    category: '',
    city: '',
    language: 'en',
  });

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setStep('register');
    }
  };

  const handleRegister = () => {
    navigate('/dashboard');
  };

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
          {step === 'phone' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground">Welcome! स्वागत है!</h2>
                <p className="text-muted-foreground mt-1">Enter your mobile number</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone" className="text-base font-medium">
                    Mobile Number / मोबाइल नंबर
                  </Label>
                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                      +91
                    </span>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="pl-14 h-14 text-lg rounded-2xl"
                    />
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <Button
                  onClick={handleSendOtp}
                  disabled={phone.length !== 10}
                  className="w-full h-14 text-lg rounded-2xl bg-gradient-primary hover:opacity-90"
                >
                  Send OTP / OTP भेजें
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground">Verify OTP</h2>
                <p className="text-muted-foreground mt-1">
                  OTP sent to +91 {phone}
                </p>
              </div>

              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot 
                        key={i} 
                        index={i} 
                        className="w-12 h-14 text-xl rounded-xl border-2"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
                className="w-full h-14 text-lg rounded-2xl bg-gradient-primary hover:opacity-90"
              >
                Verify / सत्यापित करें
                <Check className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Didn't receive? <button className="text-primary font-medium">Resend OTP</button>
              </p>
            </div>
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
                  className="w-full h-14 text-lg rounded-2xl bg-gradient-primary hover:opacity-90 mt-2"
                >
                  Start Using / शुरू करें
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
