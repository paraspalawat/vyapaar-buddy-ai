import { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  TrendingUp,
  Package,
  IndianRupee,
  BarChart3,
  Bot
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

const chatHistory = [
  {
    role: 'assistant',
    content: 'नमस्ते! मैं आपका AI बिज़नेस सहायक हूं। आप मुझसे अपने व्यापार के बारे में कुछ भी पूछ सकते हैं।',
    contentEn: "Hello! I'm your AI business assistant. You can ask me anything about your business.",
  },
  {
    role: 'user',
    content: 'Agle hafte kitna bikri hoga?',
  },
  {
    role: 'assistant',
    content: 'आपकी पिछली बिक्री के आधार पर, अगले हफ्ते की अनुमानित बिक्री ₹85,000 - ₹95,000 होगी। शनिवार सबसे ज्यादा बिक्री का दिन होगा (~₹18,000)।',
    contentEn: "Based on your past sales, next week's estimated sales will be ₹85,000 - ₹95,000. Saturday will be the highest sales day (~₹18,000).",
    chart: true,
  },
];

export default function Assistant() {
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(chatHistory);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    setMessages([...messages, { role: 'user', content: inputText }]);
    setInputText('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'मैंने आपकी बिक्री का विश्लेषण किया है। आपके सबसे ज्यादा बिकने वाले उत्पाद आटा और चावल हैं।',
        contentEn: "I've analyzed your sales. Your best-selling products are Atta and Rice.",
      }]);
    }, 1000);
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
              <p className={`${language === 'hi' ? 'hindi-text' : ''}`}>
                {language === 'hi' ? message.content : (message.contentEn || message.content)}
              </p>
              
              {/* Sample Chart for response */}
              {message.chart && (
                <div className="mt-4 p-3 bg-muted/50 rounded-xl">
                  <div className="flex items-end justify-between h-24 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <div key={day} className="flex flex-col items-center gap-1">
                        <div 
                          className="w-6 bg-primary rounded-t"
                          style={{ height: `${[40, 35, 50, 45, 60, 80, 55][i]}%` }}
                        />
                        <span className="text-xs text-muted-foreground">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
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
              onClick={() => handlePromptClick(prompt.text)}
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
            />
            <Button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-primary"
            >
              <Send className="w-5 h-5" />
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
