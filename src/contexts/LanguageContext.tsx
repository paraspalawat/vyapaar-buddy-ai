import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड' },
  'nav.pricing': { en: 'AI Pricing', hi: 'AI मूल्य निर्धारण' },
  'nav.forecasting': { en: 'Sales Forecast', hi: 'बिक्री पूर्वानुमान' },
  'nav.inventory': { en: 'Inventory', hi: 'इन्वेंटरी' },
  'nav.whatsapp': { en: 'WhatsApp Marketing', hi: 'व्हाट्सएप मार्केटिंग' },
  'nav.ads': { en: 'Local Ads', hi: 'लोकल विज्ञापन' },
  'nav.website': { en: 'My Website', hi: 'मेरी वेबसाइट' },
  'nav.assistant': { en: 'AI Assistant', hi: 'AI सहायक' },
  'nav.settings': { en: 'Settings', hi: 'सेटिंग्स' },

  // Dashboard
  'dashboard.title': { en: 'Welcome Back!', hi: 'स्वागत है!' },
  'dashboard.todaySales': { en: "Today's Sales Prediction", hi: 'आज की बिक्री का अनुमान' },
  'dashboard.profit': { en: 'Profit Margin', hi: 'मुनाफ़ा मार्जिन' },
  'dashboard.bestSelling': { en: 'Best Selling Today', hi: 'आज सबसे ज्यादा बिकने वाला' },
  'dashboard.inventory': { en: 'Inventory Alerts', hi: 'इन्वेंटरी अलर्ट' },
  'dashboard.offers': { en: 'Run Offers Today', hi: 'आज ऑफ़र चलाएं' },
  'dashboard.whatsapp': { en: 'WhatsApp Campaigns', hi: 'व्हाट्सएप कैंपेन' },
  'dashboard.askAI': { en: 'Ask AI anything...', hi: 'AI से कुछ भी पूछें...' },

  // Common
  'common.save': { en: 'Save', hi: 'सेव करें' },
  'common.cancel': { en: 'Cancel', hi: 'रद्द करें' },
  'common.apply': { en: 'Apply', hi: 'लागू करें' },
  'common.next': { en: 'Next', hi: 'आगे' },
  'common.back': { en: 'Back', hi: 'पीछे' },
  'common.submit': { en: 'Submit', hi: 'जमा करें' },
  'common.search': { en: 'Search', hi: 'खोजें' },
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...' },

  // Login/Register
  'auth.login': { en: 'Login', hi: 'लॉगिन' },
  'auth.register': { en: 'Register', hi: 'रजिस्टर करें' },
  'auth.phone': { en: 'Mobile Number', hi: 'मोबाइल नंबर' },
  'auth.otp': { en: 'Enter OTP', hi: 'OTP दर्ज करें' },
  'auth.sendOtp': { en: 'Send OTP', hi: 'OTP भेजें' },
  'auth.verifyOtp': { en: 'Verify OTP', hi: 'OTP सत्यापित करें' },
  'auth.shopName': { en: 'Shop Name', hi: 'दुकान का नाम' },
  'auth.ownerName': { en: 'Owner Name', hi: 'मालिक का नाम' },
  'auth.category': { en: 'Shop Category', hi: 'दुकान की श्रेणी' },
  'auth.city': { en: 'City / Locality', hi: 'शहर / इलाका' },
  'auth.language': { en: 'Preferred Language', hi: 'पसंदीदा भाषा' },

  // Pricing
  'pricing.title': { en: 'AI Pricing Engine', hi: 'AI मूल्य निर्धारण' },
  'pricing.upload': { en: 'Upload Products', hi: 'उत्पाद अपलोड करें' },
  'pricing.recommended': { en: 'AI Recommended Price', hi: 'AI अनुशंसित मूल्य' },
  'pricing.low': { en: 'Low Price', hi: 'कम कीमत' },
  'pricing.best': { en: 'Best Price', hi: 'सर्वोत्तम कीमत' },
  'pricing.premium': { en: 'Premium Price', hi: 'प्रीमियम कीमत' },
  'pricing.apply': { en: 'Apply New Price', hi: 'नई कीमत लागू करें' },

  // Forecasting
  'forecast.title': { en: 'Sales Forecasting', hi: 'बिक्री पूर्वानुमान' },
  'forecast.7days': { en: '7-Day Forecast', hi: '7-दिन का पूर्वानुमान' },
  'forecast.30days': { en: '30-Day Forecast', hi: '30-दिन का पूर्वानुमान' },
  'forecast.highDemand': { en: 'High Demand', hi: 'उच्च मांग' },
  'forecast.slowMoving': { en: 'Slow Moving', hi: 'धीमी गति' },
  'forecast.prepareInventory': { en: 'Prepare Inventory Plan', hi: 'इन्वेंटरी योजना तैयार करें' },

  // Inventory
  'inventory.title': { en: 'Inventory Planner', hi: 'इन्वेंटरी प्लानर' },
  'inventory.good': { en: 'Good Stock', hi: 'अच्छा स्टॉक' },
  'inventory.low': { en: 'Low Stock', hi: 'कम स्टॉक' },
  'inventory.critical': { en: 'Critical', hi: 'गंभीर' },
  'inventory.orderNow': { en: 'Order Now', hi: 'अभी ऑर्डर करें' },
  'inventory.deadStock': { en: 'Dead Stock', hi: 'डेड स्टॉक' },

  // WhatsApp
  'whatsapp.title': { en: 'WhatsApp Marketing', hi: 'व्हाट्सएप मार्केटिंग' },
  'whatsapp.templates': { en: 'Templates', hi: 'टेम्पलेट्स' },
  'whatsapp.send': { en: 'Send to WhatsApp', hi: 'व्हाट्सएप पर भेजें' },
  'whatsapp.schedule': { en: 'Schedule Campaign', hi: 'कैंपेन शेड्यूल करें' },
  'whatsapp.analytics': { en: 'Campaign Analytics', hi: 'कैंपेन एनालिटिक्स' },

  // Ads
  'ads.title': { en: 'Hyperlocal Ads', hi: 'हाइपरलोकल विज्ञापन' },
  'ads.radius': { en: 'Select Radius', hi: 'दायरा चुनें' },
  'ads.type': { en: 'Promotion Type', hi: 'प्रमोशन प्रकार' },
  'ads.budget': { en: 'Budget', hi: 'बजट' },
  'ads.startAd': { en: 'Start Ad', hi: 'विज्ञापन शुरू करें' },

  // Website Builder
  'website.title': { en: 'My Shop Website', hi: 'मेरी दुकान की वेबसाइट' },
  'website.templates': { en: 'Choose Template', hi: 'टेम्पलेट चुनें' },
  'website.publish': { en: 'Publish My Website', hi: 'मेरी वेबसाइट प्रकाशित करें' },
  'website.preview': { en: 'Preview', hi: 'पूर्वावलोकन' },

  // Voice Assistant
  'assistant.title': { en: 'AI Assistant', hi: 'AI सहायक' },
  'assistant.speak': { en: 'Tap to speak', hi: 'बोलने के लिए टैप करें' },
  'assistant.listening': { en: 'Listening...', hi: 'सुन रहा हूं...' },
  'assistant.suggestions': { en: 'Try asking:', hi: 'पूछकर देखें:' },

  // Settings
  'settings.title': { en: 'Settings', hi: 'सेटिंग्स' },
  'settings.profile': { en: 'Profile', hi: 'प्रोफ़ाइल' },
  'settings.subscription': { en: 'Subscription Plan', hi: 'सब्सक्रिप्शन प्लान' },
  'settings.billing': { en: 'Billing History', hi: 'बिलिंग इतिहास' },
  'settings.api': { en: 'API Keys', hi: 'API कुंजी' },
  'settings.language': { en: 'Language', hi: 'भाषा' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
