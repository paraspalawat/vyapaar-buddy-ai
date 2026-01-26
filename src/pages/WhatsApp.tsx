import { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Calendar, 
  Eye, 
  MousePointer,
  Users,
  Image,
  Sparkles,
  ChevronRight,
  Clock
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const templates = [
  { 
    id: 1, 
    name: 'Festival Offer', 
    nameHi: 'त्योहार ऑफ़र',
    preview: '🎉 Republic Day Sale! Get 20% OFF on all products...',
    previewHi: '🎉 गणतंत्र दिवस सेल! सभी उत्पादों पर 20% की छूट...',
    type: 'festival',
    color: 'bg-orange-100 text-orange-700'
  },
  { 
    id: 2, 
    name: 'Daily Deals', 
    nameHi: 'आज का ऑफ़र',
    preview: '🛒 Today\'s Special: Fresh vegetables at lowest prices...',
    previewHi: '🛒 आज का स्पेशल: सबसे कम कीमत पर ताज़ी सब्जियां...',
    type: 'daily',
    color: 'bg-green-100 text-green-700'
  },
  { 
    id: 3, 
    name: 'New Arrivals', 
    nameHi: 'नए उत्पाद',
    preview: '✨ Just Arrived! Premium quality products now available...',
    previewHi: '✨ अभी आया! प्रीमियम क्वालिटी के प्रोडक्ट्स अब उपलब्ध...',
    type: 'new',
    color: 'bg-purple-100 text-purple-700'
  },
  { 
    id: 4, 
    name: 'Discount Alert', 
    nameHi: 'छूट की सूचना',
    preview: '💰 Limited Time Offer! Up to 30% discount on select items...',
    previewHi: '💰 सीमित समय ऑफ़र! चुनिंदा उत्पादों पर 30% तक की छूट...',
    type: 'discount',
    color: 'bg-red-100 text-red-700'
  },
];

const posters = [
  { id: 1, name: 'Republic Day', image: '🇮🇳', theme: 'Tricolor theme' },
  { id: 2, name: 'Weekend Sale', image: '🛍️', theme: 'Blue & Yellow' },
  { id: 3, name: 'Grocery Fresh', image: '🥬', theme: 'Green fresh' },
  { id: 4, name: 'Electronics Deal', image: '📱', theme: 'Tech blue' },
];

const campaigns = [
  { 
    id: 1, 
    name: 'Republic Day Sale', 
    date: '26 Jan 2024', 
    sent: 245, 
    views: 189, 
    clicks: 67, 
    repeat: 23,
    status: 'completed'
  },
  { 
    id: 2, 
    name: 'Weekly Deals', 
    date: '22 Jan 2024', 
    sent: 198, 
    views: 156, 
    clicks: 45, 
    repeat: 18,
    status: 'completed'
  },
  { 
    id: 3, 
    name: 'New Arrivals', 
    date: '28 Jan 2024', 
    sent: 0, 
    views: 0, 
    clicks: 0, 
    repeat: 0,
    status: 'scheduled'
  },
];

export default function WhatsApp() {
  const { t, language } = useLanguage();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSelectedTemplate(template.id);
    setMessage(language === 'hi' ? template.previewHi : template.preview);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          {t('whatsapp.title')} 💬
        </h1>
        <p className="text-muted-foreground mt-1">
          Create and send marketing campaigns to your customers
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up delay-100">
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-green-100">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Contacts</p>
              <p className="text-2xl font-bold">248</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-blue-100">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Views</p>
              <p className="text-2xl font-bold">78%</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-purple-100">
              <MousePointer className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Click Rate</p>
              <p className="text-2xl font-bold">32%</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="flex items-center gap-3">
            <div className="icon-container bg-orange-100">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Repeat Buyers</p>
              <p className="text-2xl font-bold">41</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="create" className="animate-fade-up delay-200">
        <TabsList className="grid grid-cols-3 w-full max-w-md rounded-2xl">
          <TabsTrigger value="create" className="rounded-xl">Create</TabsTrigger>
          <TabsTrigger value="posters" className="rounded-xl">Posters</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-xl">{t('whatsapp.analytics')}</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Templates */}
            <div className="dashboard-card">
              <h3 className="font-bold text-lg mb-4">{t('whatsapp.templates')}</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                      selectedTemplate === template.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-transparent bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">
                        {language === 'hi' ? template.nameHi : template.name}
                      </h4>
                      <Badge className={`rounded-full ${template.color}`}>
                        {template.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {language === 'hi' ? template.previewHi : template.preview}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Editor */}
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Message Editor</h3>
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Enhance
                </Button>
              </div>
              
              <Textarea 
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px] rounded-xl mb-4"
              />

              <div className="flex items-center gap-3 mb-4">
                <Button variant="outline" className="rounded-xl flex-1">
                  <Image className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
                <Button variant="outline" className="rounded-xl flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('whatsapp.schedule')}
                </Button>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 rounded-xl h-12">
                <Send className="w-5 h-5 mr-2" />
                {t('whatsapp.send')}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="posters" className="mt-6">
          <div className="dashboard-card">
            <h3 className="font-bold text-lg mb-4">AI-Generated Posters</h3>
            <p className="text-muted-foreground mb-6">
              Select a poster template and customize for your shop
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {posters.map((poster) => (
                <div 
                  key={poster.id}
                  className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform border-2 border-transparent hover:border-primary"
                >
                  <span className="text-5xl mb-3">{poster.image}</span>
                  <p className="font-medium text-center">{poster.name}</p>
                  <p className="text-xs text-muted-foreground">{poster.theme}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-2xl">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium">AI Poster Generator</p>
                  <p className="text-sm text-muted-foreground">
                    Describe your offer and AI will create a custom poster
                  </p>
                </div>
                <Button className="ml-auto rounded-xl">
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="dashboard-card">
            <h3 className="font-bold text-lg mb-6">Campaign Performance</h3>
            
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div 
                  key={campaign.id}
                  className={`p-4 rounded-2xl ${
                    campaign.status === 'scheduled' 
                      ? 'bg-blue-50 border border-blue-100' 
                      : 'bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        campaign.status === 'scheduled' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        {campaign.status === 'scheduled' 
                          ? <Clock className="w-5 h-5 text-blue-600" />
                          : <MessageCircle className="w-5 h-5 text-green-600" />
                        }
                      </div>
                      <div>
                        <h4 className="font-medium">{campaign.name}</h4>
                        <p className="text-sm text-muted-foreground">{campaign.date}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={campaign.status === 'scheduled' ? 'outline' : 'secondary'}
                      className="rounded-full"
                    >
                      {campaign.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                    </Badge>
                  </div>

                  {campaign.status === 'completed' && (
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-2 bg-card rounded-xl">
                        <p className="text-2xl font-bold text-primary">{campaign.sent}</p>
                        <p className="text-xs text-muted-foreground">Sent</p>
                      </div>
                      <div className="text-center p-2 bg-card rounded-xl">
                        <p className="text-2xl font-bold text-blue-600">{campaign.views}</p>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                      <div className="text-center p-2 bg-card rounded-xl">
                        <p className="text-2xl font-bold text-purple-600">{campaign.clicks}</p>
                        <p className="text-xs text-muted-foreground">Clicks</p>
                      </div>
                      <div className="text-center p-2 bg-card rounded-xl">
                        <p className="text-2xl font-bold text-green-600">{campaign.repeat}</p>
                        <p className="text-xs text-muted-foreground">Repeat</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
