-- Create shops table for shop profiles
CREATE TABLE public.shops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'kirana',
  city TEXT,
  phone TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table for inventory
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_id UUID REFERENCES public.shops(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  current_price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  cost_price NUMERIC(10, 2) DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER DEFAULT 10,
  max_stock INTEGER DEFAULT 100,
  unit TEXT DEFAULT 'unit',
  image_emoji TEXT DEFAULT '📦',
  status TEXT DEFAULT 'good' CHECK (status IN ('good', 'low', 'critical')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat_messages table for AI assistant history
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_id UUID REFERENCES public.shops(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create whatsapp_campaigns table
CREATE TABLE public.whatsapp_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_id UUID REFERENCES public.shops(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  template_type TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_campaigns ENABLE ROW LEVEL SECURITY;

-- Shops policies
CREATE POLICY "Users can view their own shops"
  ON public.shops FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own shops"
  ON public.shops FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own shops"
  ON public.shops FOR UPDATE
  USING (auth.uid() = user_id);

-- Products policies (via shop ownership)
CREATE POLICY "Users can view products of their shops"
  ON public.products FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.shops WHERE shops.id = products.shop_id AND shops.user_id = auth.uid()
  ));

CREATE POLICY "Users can create products for their shops"
  ON public.products FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.shops WHERE shops.id = products.shop_id AND shops.user_id = auth.uid()
  ));

CREATE POLICY "Users can update products of their shops"
  ON public.products FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.shops WHERE shops.id = products.shop_id AND shops.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete products of their shops"
  ON public.products FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.shops WHERE shops.id = products.shop_id AND shops.user_id = auth.uid()
  ));

-- Chat messages policies
CREATE POLICY "Users can view chat messages of their shops"
  ON public.chat_messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.shops WHERE shops.id = chat_messages.shop_id AND shops.user_id = auth.uid()
  ));

CREATE POLICY "Users can create chat messages for their shops"
  ON public.chat_messages FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.shops WHERE shops.id = chat_messages.shop_id AND shops.user_id = auth.uid()
  ));

-- WhatsApp campaigns policies
CREATE POLICY "Users can view campaigns of their shops"
  ON public.whatsapp_campaigns FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.shops WHERE shops.id = whatsapp_campaigns.shop_id AND shops.user_id = auth.uid()
  ));

CREATE POLICY "Users can create campaigns for their shops"
  ON public.whatsapp_campaigns FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.shops WHERE shops.id = whatsapp_campaigns.shop_id AND shops.user_id = auth.uid()
  ));

CREATE POLICY "Users can update campaigns of their shops"
  ON public.whatsapp_campaigns FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.shops WHERE shops.id = whatsapp_campaigns.shop_id AND shops.user_id = auth.uid()
  ));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_shops_updated_at
  BEFORE UPDATE ON public.shops
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();