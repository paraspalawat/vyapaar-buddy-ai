import { useState } from 'react';
import { 
  Upload, 
  IndianRupee, 
  TrendingUp, 
  Check,
  ChevronDown,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const priceData = [
  { day: 'Mon', current: 120, recommended: 135, competitor: 130 },
  { day: 'Tue', current: 120, recommended: 132, competitor: 128 },
  { day: 'Wed', current: 120, recommended: 140, competitor: 135 },
  { day: 'Thu', current: 120, recommended: 138, competitor: 133 },
  { day: 'Fri', current: 120, recommended: 145, competitor: 140 },
  { day: 'Sat', current: 120, recommended: 150, competitor: 145 },
  { day: 'Sun', current: 120, recommended: 148, competitor: 142 },
];

const impactData = [
  { name: 'Current', sales: 45, profit: 5400 },
  { name: 'Low Price', sales: 62, profit: 5580 },
  { name: 'Best Price', sales: 52, profit: 7280 },
  { name: 'Premium', sales: 38, profit: 7600 },
];

const products = [
  { 
    id: 1, 
    name: 'Atta (5kg)', 
    currentPrice: 280, 
    lowPrice: 265, 
    bestPrice: 295, 
    premiumPrice: 320,
    competitorPrice: 290,
    margin: '18%',
    recommendation: 'best'
  },
  { 
    id: 2, 
    name: 'Rice Basmati (1kg)', 
    currentPrice: 145, 
    lowPrice: 130, 
    bestPrice: 155, 
    premiumPrice: 175,
    competitorPrice: 150,
    margin: '22%',
    recommendation: 'premium'
  },
  { 
    id: 3, 
    name: 'Cooking Oil (1L)', 
    currentPrice: 180, 
    lowPrice: 165, 
    bestPrice: 185, 
    premiumPrice: 200,
    competitorPrice: 175,
    margin: '15%',
    recommendation: 'low'
  },
  { 
    id: 4, 
    name: 'Sugar (1kg)', 
    currentPrice: 48, 
    lowPrice: 45, 
    bestPrice: 52, 
    premiumPrice: 58,
    competitorPrice: 50,
    margin: '12%',
    recommendation: 'best'
  },
];

export default function Pricing() {
  const { t } = useLanguage();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const toggleProduct = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          {t('pricing.title')} 💰
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-powered pricing recommendations for maximum profit
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up delay-100">
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-primary/10">
              <IndianRupee className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Margin</p>
              <p className="text-xl font-bold">16.7%</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-secondary/10">
              <Target className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Optimized</p>
              <p className="text-xl font-bold">45 Products</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-accent/10">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Potential Gain</p>
              <p className="text-xl font-bold">+₹8,500</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-purple-100">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Competitor Edge</p>
              <p className="text-xl font-bold">+5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="dashboard-card animate-fade-up delay-200">
        <h3 className="font-bold text-lg mb-4">{t('pricing.upload')}</h3>
        <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center">
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Drag & drop your product CSV or click to browse
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" className="rounded-xl">
              <Upload className="w-4 h-4 mr-2" />
              Upload CSV
            </Button>
            <Button variant="outline" className="rounded-xl">
              Add Manually
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="products" className="animate-fade-up delay-300">
        <TabsList className="grid grid-cols-3 w-full max-w-md rounded-2xl">
          <TabsTrigger value="products" className="rounded-xl">Products</TabsTrigger>
          <TabsTrigger value="analysis" className="rounded-xl">Analysis</TabsTrigger>
          <TabsTrigger value="competitors" className="rounded-xl">Competitors</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          <div className="dashboard-card overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">AI Price Recommendations</h3>
              <Button 
                className="bg-gradient-primary text-white rounded-xl"
                disabled={selectedProducts.length === 0}
              >
                <Check className="w-4 h-4 mr-2" />
                {t('pricing.apply')} ({selectedProducts.length})
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-center">Current</TableHead>
                    <TableHead className="text-center text-green-600">{t('pricing.low')}</TableHead>
                    <TableHead className="text-center text-primary">{t('pricing.best')}</TableHead>
                    <TableHead className="text-center text-accent">{t('pricing.premium')}</TableHead>
                    <TableHead className="text-center">Competitor</TableHead>
                    <TableHead className="text-center">Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <input 
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProduct(product.id)}
                          className="w-5 h-5 rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-center">₹{product.currentPrice}</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          product.recommendation === 'low' 
                            ? 'bg-green-100 text-green-700 font-medium' 
                            : ''
                        }`}>
                          ₹{product.lowPrice}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          product.recommendation === 'best' 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : ''
                        }`}>
                          ₹{product.bestPrice}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          product.recommendation === 'premium' 
                            ? 'bg-accent/10 text-accent font-medium' 
                            : ''
                        }`}>
                          ₹{product.premiumPrice}
                        </span>
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        ₹{product.competitorPrice}
                      </TableCell>
                      <TableCell className="text-center font-medium text-green-600">
                        {product.margin}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Price Trend Chart */}
            <div className="dashboard-card">
              <h3 className="font-bold text-lg mb-4">Price Comparison Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Line type="monotone" dataKey="current" stroke="#94a3b8" strokeWidth={2} name="Current" />
                  <Line type="monotone" dataKey="recommended" stroke="#3b82f6" strokeWidth={3} name="AI Recommended" />
                  <Line type="monotone" dataKey="competitor" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" name="Competitor" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Impact Analysis */}
            <div className="dashboard-card">
              <h3 className="font-bold text-lg mb-4">Price Impact Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis yAxisId="left" stroke="#6b7280" />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Units Sold" />
                  <Bar yAxisId="right" dataKey="profit" fill="#22c55e" radius={[8, 8, 0, 0]} name="Profit (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="mt-6">
          <div className="dashboard-card">
            <h3 className="font-bold text-lg mb-4">Competitor Price Comparison</h3>
            <p className="text-muted-foreground mb-6">
              Based on nearby shops and online prices in your locality
            </p>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">Your price: ₹{product.currentPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Competitor: ₹{product.competitorPrice}</p>
                    <p className={`text-sm ${
                      product.currentPrice < product.competitorPrice 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {product.currentPrice < product.competitorPrice 
                        ? `₹${product.competitorPrice - product.currentPrice} cheaper` 
                        : `₹${product.currentPrice - product.competitorPrice} higher`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Profit Calculator */}
      <div className="dashboard-card animate-fade-up delay-400">
        <h3 className="font-bold text-lg mb-4">💹 Profit Margin Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Cost Price (₹)</Label>
            <Input type="number" placeholder="100" className="mt-2 rounded-xl" defaultValue={100} />
          </div>
          <div>
            <Label>Selling Price (₹)</Label>
            <Input type="number" placeholder="120" className="mt-2 rounded-xl" defaultValue={120} />
          </div>
          <div>
            <Label>Quantity</Label>
            <Input type="number" placeholder="50" className="mt-2 rounded-xl" defaultValue={50} />
          </div>
          <div>
            <Label>Total Profit</Label>
            <div className="mt-2 h-10 px-4 bg-green-100 text-green-700 rounded-xl flex items-center font-bold text-lg">
              ₹1,000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
