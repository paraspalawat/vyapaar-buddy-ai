import { useState } from 'react';
import { 
  Package, 
  AlertTriangle, 
  Check, 
  ShoppingCart,
  TrendingDown,
  Truck,
  BarChart3,
  Search
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const inventoryItems = [
  { 
    id: 1, 
    name: 'Atta (5kg)', 
    stock: 45, 
    minStock: 20, 
    maxStock: 100,
    status: 'good',
    reorderQty: 50,
    supplier: 'Aashirvaad Distributor',
    cost: 240,
    lastOrder: '3 days ago'
  },
  { 
    id: 2, 
    name: 'Rice Basmati (1kg)', 
    stock: 38, 
    minStock: 25, 
    maxStock: 80,
    status: 'good',
    reorderQty: 40,
    supplier: 'India Gate Supplier',
    cost: 95,
    lastOrder: '5 days ago'
  },
  { 
    id: 3, 
    name: 'Maggi Noodles', 
    stock: 5, 
    minStock: 30, 
    maxStock: 100,
    status: 'critical',
    reorderQty: 80,
    supplier: 'Nestle Distributor',
    cost: 12,
    lastOrder: '2 weeks ago'
  },
  { 
    id: 4, 
    name: 'Cooking Oil (1L)', 
    stock: 12, 
    minStock: 15, 
    maxStock: 50,
    status: 'low',
    reorderQty: 30,
    supplier: 'Fortune Oils',
    cost: 145,
    lastOrder: '1 week ago'
  },
  { 
    id: 5, 
    name: 'Dairy Milk Silk', 
    stock: 3, 
    minStock: 20, 
    maxStock: 60,
    status: 'critical',
    reorderQty: 50,
    supplier: 'Cadbury Dist.',
    cost: 80,
    lastOrder: '1 week ago'
  },
  { 
    id: 6, 
    name: 'Parle-G Biscuit', 
    stock: 18, 
    minStock: 20, 
    maxStock: 80,
    status: 'low',
    reorderQty: 60,
    supplier: 'Parle Products',
    cost: 10,
    lastOrder: '4 days ago'
  },
];

const deadStock = [
  { name: 'Imported Cheese', stock: 12, value: '₹3,600', daysUnsold: 45, action: 'Discount 30%' },
  { name: 'Premium Olive Oil', stock: 8, value: '₹4,800', daysUnsold: 60, action: 'Bundle Deal' },
  { name: 'Organic Honey', stock: 15, value: '₹2,250', daysUnsold: 38, action: 'Free Gift Offer' },
];

const suppliers = [
  { name: 'Aashirvaad Distributor', contact: '98765XXXXX', items: 12, rating: 4.5 },
  { name: 'Nestle Distributor', contact: '98123XXXXX', items: 8, rating: 4.8 },
  { name: 'Fortune Oils', contact: '99887XXXXX', items: 5, rating: 4.2 },
];

export default function Inventory() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-700 border-green-200';
      case 'low': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'low': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const toggleItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          {t('inventory.title')} 📦
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-powered inventory management and reorder suggestions
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up delay-100">
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('inventory.good')}</p>
              <p className="text-2xl font-bold text-green-600">42</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('inventory.low')}</p>
              <p className="text-2xl font-bold text-yellow-600">8</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('inventory.critical')}</p>
              <p className="text-2xl font-bold text-red-600">5</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('inventory.deadStock')}</p>
              <p className="text-2xl font-bold text-gray-600">3</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="stock" className="animate-fade-up delay-200">
        <TabsList className="grid grid-cols-3 w-full max-w-md rounded-2xl">
          <TabsTrigger value="stock" className="rounded-xl">Stock Status</TabsTrigger>
          <TabsTrigger value="dead" className="rounded-xl">Dead Stock</TabsTrigger>
          <TabsTrigger value="suppliers" className="rounded-xl">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="mt-6">
          <div className="dashboard-card">
            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
              <Button 
                className="bg-gradient-primary text-white rounded-xl"
                disabled={selectedItems.length === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {t('inventory.orderNow')} ({selectedItems.length})
              </Button>
            </div>

            {/* Inventory List */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    selectedItems.includes(item.id) 
                      ? 'border-primary bg-primary/5' 
                      : 'border-transparent bg-muted/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                      className="mt-1 w-5 h-5 rounded-md"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-lg">{item.name}</h4>
                          <Badge className={`rounded-full ${getStatusColor(item.status)}`}>
                            {item.status === 'good' ? t('inventory.good') : 
                             item.status === 'low' ? t('inventory.low') : 
                             t('inventory.critical')}
                          </Badge>
                        </div>
                        <span className="text-2xl font-bold">{item.stock}</span>
                      </div>
                      
                      {/* Stock Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-muted-foreground mb-1">
                          <span>Stock Level</span>
                          <span>{item.stock} / {item.maxStock}</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${getProgressColor(item.status)}`}
                            style={{ width: `${(item.stock / item.maxStock) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Reorder Qty</p>
                          <p className="font-medium">{item.reorderQty} units</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Unit Cost</p>
                          <p className="font-medium">₹{item.cost}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Supplier</p>
                          <p className="font-medium">{item.supplier}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Order</p>
                          <p className="font-medium">{item.lastOrder}</p>
                        </div>
                      </div>

                      {/* Action for low/critical */}
                      {(item.status === 'low' || item.status === 'critical') && (
                        <div className="mt-3 p-3 bg-primary/10 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Truck className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-primary">
                              AI Recommends: Order {item.reorderQty} units (₹{item.reorderQty * item.cost})
                            </span>
                          </div>
                          <Button size="sm" className="rounded-xl">
                            Quick Order
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="dead" className="mt-6">
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg">{t('inventory.deadStock')} Detection</h3>
                <p className="text-muted-foreground">Products not selling - take action!</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Value Stuck</p>
                <p className="text-2xl font-bold text-red-600">₹10,650</p>
              </div>
            </div>

            <div className="space-y-4">
              {deadStock.map((item, i) => (
                <div key={i} className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <TrendingDown className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.stock} units • {item.value} value • {item.daysUnsold} days unsold
                        </p>
                      </div>
                    </div>
                    <Button variant="destructive" className="rounded-xl">
                      {item.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="mt-6">
          <div className="dashboard-card">
            <h3 className="font-bold text-lg mb-6">Supplier Directory</h3>
            <div className="space-y-4">
              {suppliers.map((supplier, i) => (
                <div key={i} className="p-4 bg-muted/50 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Truck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">{supplier.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        📞 {supplier.contact} • {supplier.items} products
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {'★'.repeat(Math.floor(supplier.rating))}
                      <span className="text-sm text-muted-foreground ml-1">{supplier.rating}</span>
                    </div>
                    <Button size="sm" variant="outline" className="mt-2 rounded-xl">
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
