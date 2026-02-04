import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Shop {
  id: string;
  user_id: string;
  name: string;
  owner_name: string;
  category: string;
  city: string | null;
  phone: string | null;
  language: string;
  created_at: string;
  updated_at: string;
}

export function useShop() {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setShop(data);
    } catch (error) {
      console.error('Error fetching shop:', error);
    } finally {
      setLoading(false);
    }
  };

  const createShop = async (shopData: {
    name: string;
    owner_name: string;
    category: string;
    city?: string;
    phone?: string;
    language?: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('shops')
        .insert({
          user_id: user.id,
          ...shopData,
        })
        .select()
        .single();

      if (error) throw error;
      setShop(data);
      toast({ title: 'Shop created successfully!' });
      return data;
    } catch (error) {
      console.error('Error creating shop:', error);
      toast({ 
        title: 'Error creating shop', 
        variant: 'destructive' 
      });
      throw error;
    }
  };

  const updateShop = async (updates: Partial<Shop>) => {
    if (!shop) return;
    
    try {
      const { data, error } = await supabase
        .from('shops')
        .update(updates)
        .eq('id', shop.id)
        .select()
        .single();

      if (error) throw error;
      setShop(data);
      toast({ title: 'Shop updated successfully!' });
      return data;
    } catch (error) {
      console.error('Error updating shop:', error);
      toast({ 
        title: 'Error updating shop', 
        variant: 'destructive' 
      });
      throw error;
    }
  };

  return { shop, loading, createShop, updateShop, refetch: fetchShop };
}
