import { useState } from 'react';
import { 
  Globe, 
  Palette, 
  ShoppingCart, 
  CreditCard, 
  Smartphone,
  Check,
  ChevronRight,
  Image,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const templates = [
  { 
    id: 1, 
    name: 'Classic Store', 
    description: 'Clean and professional',
    color: 'from-blue-500 to-purple-600',
    preview: '🏪'
  },
  { 
    id: 2, 
    name: 'Modern Shop', 
    description: 'Trendy and minimal',
    color: 'from-green-400 to-cyan-500',
    preview: '🛍️'
  },
  { 
    id: 3, 
    name: 'Vibrant Market', 
    description: 'Colorful and lively',
    color: 'from-orange-400 to-pink-500',
    preview: '🌈'
  },
  { 
    id: 4, 
    name: 'Premium Elite', 
    description: 'Luxury feel',
    color: 'from-slate-700 to-slate-900',
    preview: '✨'
  },
];

const themeColors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Teal', value: '#14b8a6' },
];

const sampleProducts = [
  { id: 1, name: 'Atta (5kg)', price: 295, image: '🌾' },
  { id: 2, name: 'Rice Basmati', price: 155, image: '🍚' },
  { id: 3, name: 'Cooking Oil', price: 185, image: '🫒' },
  { id: 4, name: 'Sugar (1kg)', price: 52, image: '🍬' },
  { id: 5, name: 'Maggi Noodles', price: 14, image: '🍜' },
  { id: 6, name: 'Dairy Milk', price: 90, image: '🍫' },
];

export default function Website() {
  const { t, language } = useLanguage();
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [paymentOptions, setPaymentOptions] = useState({
    cod: true,
    upi: true,
    wallet: false,
  });
  const [shopName, setShopName] = useState('Sharma General Store');
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          {t('website.title')} 🌐
        </h1>
        <p className="text-muted-foreground mt-1">
          Create your online shop in minutes
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up delay-100">
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-primary/10">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-lg font-bold text-green-600">Live ✓</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-green-100">
              <Smartphone className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Visitors</p>
              <p className="text-xl font-bold">1,234</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-purple-100">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Orders</p>
              <p className="text-xl font-bold">48</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-accent/10">
              <CreditCard className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-xl font-bold">₹28,450</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Builder */}
        <div className="space-y-6 animate-fade-up delay-200">
          <Tabs defaultValue="template">
            <TabsList className="grid grid-cols-3 rounded-2xl">
              <TabsTrigger value="template" className="rounded-xl">Template</TabsTrigger>
              <TabsTrigger value="products" className="rounded-xl">Products</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="template" className="mt-6">
              <div className="dashboard-card">
                <h3 className="font-bold text-lg mb-4">{t('website.templates')}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`relative rounded-2xl p-4 cursor-pointer transition-all border-2 ${
                        selectedTemplate === template.id
                          ? 'border-primary shadow-lg'
                          : 'border-transparent hover:border-primary/30'
                      }`}
                    >
                      <div className={`aspect-video rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-3`}>
                        <span className="text-4xl">{template.preview}</span>
                      </div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <h4 className="font-medium mb-3">Theme Color</h4>
                <div className="flex gap-3 flex-wrap">
                  {themeColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-10 h-10 rounded-xl transition-all ${
                        selectedColor === color.value 
                          ? 'ring-2 ring-offset-2 ring-primary scale-110' 
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <div className="dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Product Catalogue</h3>
                  <Button variant="outline" className="rounded-xl">
                    <Image className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>

                <div className="space-y-3 mb-4">
                  {sampleProducts.slice(0, 4).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{product.image}</span>
                        <span className="font-medium">{product.name}</span>
                      </div>
                      <span className="font-bold">₹{product.price}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-primary/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium">AI Description Generator</p>
                      <p className="text-sm text-muted-foreground">
                        Auto-generate product descriptions
                      </p>
                    </div>
                    <Button size="sm" className="ml-auto rounded-xl">
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="dashboard-card space-y-6">
                <div>
                  <Label>Shop Name</Label>
                  <Input 
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="mt-2 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">Payment Options</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">💵</span>
                        <span>Cash on Delivery</span>
                      </div>
                      <Switch 
                        checked={paymentOptions.cod}
                        onCheckedChange={(checked) => 
                          setPaymentOptions({ ...paymentOptions, cod: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">📱</span>
                        <span>UPI (Google Pay, PhonePe)</span>
                      </div>
                      <Switch 
                        checked={paymentOptions.upi}
                        onCheckedChange={(checked) => 
                          setPaymentOptions({ ...paymentOptions, upi: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">💳</span>
                        <span>Digital Wallets</span>
                      </div>
                      <Switch 
                        checked={paymentOptions.wallet}
                        onCheckedChange={(checked) => 
                          setPaymentOptions({ ...paymentOptions, wallet: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button className="w-full bg-gradient-primary rounded-xl h-14 text-lg">
            {t('website.publish')}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Preview */}
        <div className="dashboard-card animate-fade-up delay-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">{t('website.preview')}</h3>
            <Button variant="outline" size="sm" className="rounded-xl">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Site
            </Button>
          </div>

          {/* Mobile Preview Frame */}
          <div className="relative mx-auto w-full max-w-[320px]">
            <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-xl">
              <div className="bg-gray-900 rounded-[2rem] overflow-hidden">
                {/* Status bar */}
                <div className="bg-gray-900 px-6 py-2 flex justify-between items-center text-white text-xs">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <span>📶</span>
                    <span>🔋</span>
                  </div>
                </div>

                {/* Website Content */}
                <div className="bg-white overflow-hidden" style={{ height: '500px' }}>
                  {/* Header */}
                  <div 
                    className="p-4 text-white"
                    style={{ backgroundColor: selectedColor }}
                  >
                    <h1 className="font-bold text-lg">{shopName}</h1>
                    <p className="text-xs text-white/80">📍 Lajpat Nagar, Delhi</p>
                  </div>

                  {/* Banner */}
                  <div 
                    className="h-24 flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${selectedColor}20, ${selectedColor}40)` 
                    }}
                  >
                    <p className="font-bold text-sm">🎉 Free Delivery on ₹500+</p>
                  </div>

                  {/* Products Grid */}
                  <div className="p-4">
                    <h2 className="font-bold mb-3">Products</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {sampleProducts.slice(0, 4).map((product) => (
                        <div key={product.id} className="bg-gray-50 rounded-xl p-3 text-center">
                          <span className="text-3xl block mb-2">{product.image}</span>
                          <p className="text-xs font-medium truncate">{product.name}</p>
                          <p className="text-sm font-bold" style={{ color: selectedColor }}>
                            ₹{product.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Cart Button */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)]">
                    <button 
                      className="w-full py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                      style={{ backgroundColor: selectedColor }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      View Cart (3)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
