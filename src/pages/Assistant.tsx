import { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  TrendingUp,
  Package,
  IndianRupee,
  BarChart3,
  Bot,
  Loader2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useShop } from '@/hooks/useShop';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestedPrompts = [
  { 
    text: 'Agle hafte kitna bikri hoga?', 
    textEn: "What will be next week's sales?",
    icon: TrendingUp,
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    text: 'Kaunsa product kam stock mein hai?', 
    textEn: 'Which product is low in stock?',
    icon: Package,
    color: 'bg-orange-100 text-orange-600'
  },
  { 
    text: 'Aaj ka profit margin kya hai?', 
    textEn: "What's today's profit margin?",
    icon: IndianRupee,
    color: 'bg-green-100 text-green-600'
  },
  { 
    text: 'Best selling product kaun sa hai?', 
    textEn: 'What is the best selling product?',
    icon: BarChart3,
    color: 'bg-purple-100 text-purple-600'
  },
];

export default function Assistant() {
  const { t, language } = useLanguage();
  const { shop } = useShop();
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: language === 'hi' 
        ? 'नमस्ते! मैं आपका AI बिज़नेस सहायक हूं। आप मुझसे अपने व्यापार के बारे में कुछ भी पूछ सकते हैं।'
        : "Hello! I'm your AI business assistant. You can ask me anything about your business.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    
    const userMessage = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          messages: [...messages, { role: 'user', content: userMessage }].map(m => ({
            role: m.role,
            content: m.content,
          })),
          shopData: shop ? {
            shopName: shop.name,
            category: shop.category,
            city: shop.city,
          } : null,
        },
      });

      if (error) throw error;

      const assistantMessage = data?.message || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error: any) {
      console.error('AI Assistant error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to get AI response',
        variant: 'destructive',
      });
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInputText(prompt);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="animate-fade-up mb-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          {t('assistant.title')} 🤖
        </h1>
        <p className="text-muted-foreground mt-1">
          Ask anything in Hindi or English
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 animate-fade-up delay-100">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${
              message.role === 'user' 
                ? 'bg-primary text-white rounded-2xl rounded-br-md' 
                : 'bg-card border border-border rounded-2xl rounded-bl-md'
            } p-4 shadow-sm`}>
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">AI Assistant</span>
                </div>
              )}
              <p className={`whitespace-pre-wrap ${language === 'hi' ? 'hindi-text' : ''}`}>
                {message.content}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card border border-border rounded-2xl rounded-bl-md p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-muted-foreground">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="py-4 animate-fade-up delay-200">
        <p className="text-sm text-muted-foreground mb-3">
          {t('assistant.suggestions')}
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handlePromptClick(language === 'hi' ? prompt.text : prompt.textEn)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all hover:scale-105 ${prompt.color}`}
            >
              <prompt.icon className="w-4 h-4" />
              <span>{language === 'hi' ? prompt.text : prompt.textEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border p-4 -mx-4 lg:-mx-6 animate-fade-up delay-300">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          {/* Mic Button */}
          <Button
            variant={isListening ? 'destructive' : 'outline'}
            size="icon"
            onClick={() => setIsListening(!isListening)}
            className={`shrink-0 w-14 h-14 rounded-full transition-all ${
              isListening ? 'animate-pulse ring-4 ring-red-200' : ''
            }`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <Input
              placeholder={language === 'hi' ? 'यहां टाइप करें या बोलें...' : 'Type or speak here...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="h-14 rounded-2xl pr-14 text-lg"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-primary"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isListening && (
          <p className="text-center text-sm text-muted-foreground mt-3 animate-pulse">
            {t('assistant.listening')} 🎤
          </p>
        )}
      </div>
    </div>
  );
}
