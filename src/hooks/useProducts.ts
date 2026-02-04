import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useShop } from './useShop';

export interface Product {
  id: string;
  shop_id: string;
  name: string;
  category: string | null;
  current_price: number;
  cost_price: number | null;
  stock: number;
  min_stock: number | null;
  max_stock: number | null;
  unit: string | null;
  image_emoji: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { shop } = useShop();
  const { toast } = useToast();

  useEffect(() => {
    if (shop?.id) {
      fetchProducts();
    }
  }, [shop?.id]);

  const fetchProducts = async () => {
    if (!shop?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('shop_id', shop.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: {
    name: string;
    category?: string;
    current_price: number;
    cost_price?: number;
    stock: number;
    min_stock?: number;
    max_stock?: number;
    unit?: string;
    image_emoji?: string;
  }) => {
    if (!shop?.id) {
      toast({ title: 'Please create a shop first', variant: 'destructive' });
      return;
    }

    try {
      // Calculate status based on stock levels
      const minStock = productData.min_stock || 10;
      let status = 'good';
      if (productData.stock <= minStock * 0.3) {
        status = 'critical';
      } else if (productData.stock <= minStock) {
        status = 'low';
      }

      const { data, error } = await supabase
        .from('products')
        .insert({
          shop_id: shop.id,
          ...productData,
          status,
        })
        .select()
        .single();

      if (error) throw error;
      setProducts(prev => [data, ...prev]);
      toast({ title: 'Product added successfully!' });
      return data;
    } catch (error) {
      console.error('Error adding product:', error);
      toast({ title: 'Error adding product', variant: 'destructive' });
      throw error;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      // Recalculate status if stock is being updated
      if (updates.stock !== undefined) {
        const product = products.find(p => p.id === id);
        const minStock = updates.min_stock || product?.min_stock || 10;
        if (updates.stock <= minStock * 0.3) {
          updates.status = 'critical';
        } else if (updates.stock <= minStock) {
          updates.status = 'low';
        } else {
          updates.status = 'good';
        }
      }

      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setProducts(prev => prev.map(p => p.id === id ? data : p));
      toast({ title: 'Product updated!' });
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      toast({ title: 'Error updating product', variant: 'destructive' });
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
      toast({ title: 'Product deleted!' });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({ title: 'Error deleting product', variant: 'destructive' });
      throw error;
    }
  };

  const getInventoryStats = () => {
    const good = products.filter(p => p.status === 'good').length;
    const low = products.filter(p => p.status === 'low').length;
    const critical = products.filter(p => p.status === 'critical').length;
    return { good, low, critical, total: products.length };
  };

  return { 
    products, 
    loading, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    refetch: fetchProducts,
    getInventoryStats 
  };
}
