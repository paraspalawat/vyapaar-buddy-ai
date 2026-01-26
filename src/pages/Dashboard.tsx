import { 
  TrendingUp, 
  IndianRupee, 
  Package, 
  ShoppingCart,
  MessageCircle,
  Gift,
  Mic,
  ChevronRight,
  AlertTriangle,
  Star
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MetricCard } from '@/components/ui/metric-card';
import { ActionCard } from '@/components/ui/action-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 pb-6">
      {/* Welcome Section */}
      <div className="animate-fade-up">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          {t('dashboard.title')} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your shop today
        </p>
      </div>

      {/* AI Ask Box */}
      <div className="bg-gradient-primary rounded-3xl p-5 text-white animate-fade-up delay-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold">AI Business Assistant</h3>
            <p className="text-sm text-white/80">Ask anything about your business</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Input 
            placeholder={t('dashboard.askAI')}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl"
          />
          <Button className="bg-white text-primary hover:bg-white/90 rounded-xl px-4">
            <Mic className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
            "Aaj kitni bikri hogi?" 📈
          </span>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
            "Best selling product?" 🛒
          </span>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
            "Stock alert?" 📦
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up delay-200">
        <MetricCard
          title={t('dashboard.todaySales')}
          value="₹12,450"
          subtitle="Prediction"
          icon={TrendingUp}
          trend="up"
          trendValue="8% vs yesterday"
          variant="primary"
        />
        <MetricCard
          title={t('dashboard.profit')}
          value="18.5%"
          subtitle="This month"
          icon={IndianRupee}
          trend="up"
          trendValue="2.3%"
          variant="success"
        />
        <MetricCard
          title={t('dashboard.bestSelling')}
          value="Atta 5kg"
          subtitle="32 units today"
          icon={Star}
          variant="accent"
        />
        <MetricCard
          title={t('dashboard.inventory')}
          value="5 Items"
          subtitle="Low stock"
          icon={AlertTriangle}
          variant="warning"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up delay-300">
          <ActionCard
            title={t('dashboard.offers')}
            description="Create festival offers"
            icon={Gift}
            to="/whatsapp"
            variant="accent"
          />
          <ActionCard
            title={t('dashboard.whatsapp')}
            description="Send promotions"
            icon={MessageCircle}
            to="/whatsapp"
            variant="success"
          />
          <ActionCard
            title="Check Inventory"
            description="5 items low stock"
            icon={Package}
            to="/inventory"
            variant="primary"
          />
        </div>
      </div>

      {/* Today's Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="dashboard-card animate-fade-up delay-400">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Top Products Today</h3>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Atta (5kg)', sales: '₹3,200', units: 32, trend: '+12%' },
              { name: 'Rice Basmati', sales: '₹2,100', units: 21, trend: '+8%' },
              { name: 'Cooking Oil', sales: '₹1,800', units: 18, trend: '+5%' },
              { name: 'Sugar (1kg)', sales: '₹1,200', units: 24, trend: '+3%' },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.units} units</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{product.sales}</p>
                  <p className="text-xs text-green-600">{product.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="dashboard-card animate-fade-up delay-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Stock Alerts</h3>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Maggi Noodles', stock: 5, status: 'critical', action: 'Order Now' },
              { name: 'Parle-G Biscuit', stock: 12, status: 'low', action: 'Order Soon' },
              { name: 'Detergent Surf', stock: 8, status: 'low', action: 'Order Soon' },
              { name: 'Dairy Milk Silk', stock: 3, status: 'critical', action: 'Order Now' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.status === 'critical' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    <Package className={`w-5 h-5 ${
                      item.status === 'critical' ? 'text-red-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.stock} units left</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant={item.status === 'critical' ? 'destructive' : 'outline'}
                  className="rounded-xl"
                >
                  {item.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Offers */}
      <div className="dashboard-card bg-gradient-accent text-white animate-fade-up delay-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xl mb-1">🎉 Republic Day Sale</h3>
            <p className="text-white/80">AI suggests running a sale on top products</p>
            <p className="text-sm text-white/60 mt-2">
              Expected sales boost: +25% • Best time: 10 AM - 2 PM
            </p>
          </div>
          <Button className="bg-white text-accent hover:bg-white/90 rounded-xl">
            Create Offer
          </Button>
        </div>
      </div>
    </div>
  );
}
