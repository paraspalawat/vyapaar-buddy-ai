import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Package,
  AlertTriangle,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const weeklyData = [
  { day: 'Mon', sales: 12500, prediction: 13200 },
  { day: 'Tue', sales: 11800, prediction: 12400 },
  { day: 'Wed', sales: 14200, prediction: 14800 },
  { day: 'Thu', sales: 13500, prediction: 14100 },
  { day: 'Fri', sales: 16800, prediction: 17500 },
  { day: 'Sat', sales: 22500, prediction: 24000 },
  { day: 'Sun', sales: 18200, prediction: 19500 },
];

const monthlyData = [
  { week: 'Week 1', actual: 85000, forecast: 88000 },
  { week: 'Week 2', actual: 92000, forecast: 95000 },
  { week: 'Week 3', actual: 78000, forecast: 82000 },
  { week: 'Week 4', actual: null, forecast: 98000 },
];

const productForecasts = [
  { name: 'Atta (5kg)', currentStock: 45, weeklyDemand: 62, status: 'high', trend: '+15%' },
  { name: 'Rice Basmati', currentStock: 38, weeklyDemand: 28, status: 'normal', trend: '+5%' },
  { name: 'Cooking Oil', currentStock: 22, weeklyDemand: 35, status: 'high', trend: '+22%' },
  { name: 'Sugar (1kg)', currentStock: 80, weeklyDemand: 45, status: 'normal', trend: '-3%' },
  { name: 'Maggi Noodles', currentStock: 15, weeklyDemand: 48, status: 'critical', trend: '+30%' },
  { name: 'Dairy Milk', currentStock: 12, weeklyDemand: 25, status: 'low', trend: '+18%' },
];

const slowMovingProducts = [
  { name: 'Premium Coffee', stock: 25, lastSold: '5 days ago', action: 'Run Discount' },
  { name: 'Organic Honey', stock: 18, lastSold: '7 days ago', action: 'Create Bundle' },
  { name: 'Imported Cheese', stock: 12, lastSold: '10 days ago', action: 'Price Drop' },
];

export default function Forecasting() {
  const { t } = useLanguage();
  const [period, setPeriod] = useState<'7days' | '30days'>('7days');

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          {t('forecast.title')} 📈
        </h1>
        <p className="text-muted-foreground mt-1">
          AI predicts your future sales and demand patterns
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up delay-100">
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-gradient-primary">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-xl font-bold">₹1,15,500</p>
              <p className="text-xs text-green-600">+12% vs last week</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-gradient-success">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-xl font-bold">₹3,63,000</p>
              <p className="text-xs text-green-600">+8% forecast</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-gradient-accent">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Peak Day</p>
              <p className="text-xl font-bold">Saturday</p>
              <p className="text-xs text-muted-foreground">₹24,000 expected</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-yellow-100">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Stock Alert</p>
              <p className="text-xl font-bold">5 Items</p>
              <p className="text-xs text-red-600">Need reorder</p>
            </div>
          </div>
        </div>
      </div>

      {/* Period Toggle */}
      <div className="flex gap-2 animate-fade-up delay-200">
        <Button 
          variant={period === '7days' ? 'default' : 'outline'}
          onClick={() => setPeriod('7days')}
          className="rounded-xl"
        >
          {t('forecast.7days')}
        </Button>
        <Button 
          variant={period === '30days' ? 'default' : 'outline'}
          onClick={() => setPeriod('30days')}
          className="rounded-xl"
        >
          {t('forecast.30days')}
        </Button>
      </div>

      {/* Sales Forecast Chart */}
      <div className="dashboard-card animate-fade-up delay-300">
        <h3 className="font-bold text-lg mb-4">Sales Forecast</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={period === '7days' ? weeklyData : monthlyData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={period === '7days' ? 'day' : 'week'} stroke="#6b7280" />
            <YAxis stroke="#6b7280" tickFormatter={(value) => `₹${value/1000}k`} />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
            />
            <Area 
              type="monotone" 
              dataKey={period === '7days' ? 'sales' : 'actual'} 
              stroke="#3b82f6" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorSales)" 
              name="Actual"
            />
            <Area 
              type="monotone" 
              dataKey={period === '7days' ? 'prediction' : 'forecast'} 
              stroke="#22c55e" 
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={1} 
              fill="url(#colorPrediction)" 
              name="Forecast"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Product-wise Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Demand Products */}
        <div className="dashboard-card animate-fade-up delay-400">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">{t('forecast.highDemand')} 🔥</h3>
            <Badge variant="destructive" className="rounded-full">
              {productForecasts.filter(p => p.status === 'high' || p.status === 'critical').length} items
            </Badge>
          </div>
          <div className="space-y-3">
            {productForecasts.map((product, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    product.status === 'critical' ? 'bg-red-500' :
                    product.status === 'high' ? 'bg-orange-500' :
                    product.status === 'low' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Stock: {product.currentStock} | Demand: {product.weeklyDemand}/week
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={product.trend.startsWith('+') ? 'default' : 'secondary'}
                    className="rounded-full"
                  >
                    {product.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slow Moving Products */}
        <div className="dashboard-card animate-fade-up delay-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">{t('forecast.slowMoving')} 🐌</h3>
            <Badge variant="secondary" className="rounded-full">
              {slowMovingProducts.length} items
            </Badge>
          </div>
          <div className="space-y-3">
            {slowMovingProducts.map((product, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.stock} units • Last sold {product.lastSold}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-xl">
                  {product.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="dashboard-card bg-gradient-primary text-white animate-fade-up delay-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xl mb-1">🎯 {t('forecast.prepareInventory')}</h3>
            <p className="text-white/80">
              AI will automatically create an optimized inventory plan
            </p>
          </div>
          <Button className="bg-white text-primary hover:bg-white/90 rounded-xl">
            Generate Plan
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
