import { Menu, Bell, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onMenuClick: () => void;
  shopName?: string;
}

export function Header({ onMenuClick, shopName = "My Shop" }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left - Menu button (mobile) */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-muted rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6 text-foreground" />
        </button>

        {/* Center - Shop name */}
        <div className="flex-1 lg:flex-none">
          <h2 className="text-lg font-bold text-foreground truncate text-center lg:text-left">
            {shopName}
          </h2>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Globe className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem 
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'bg-primary/10' : ''}
              >
                🇬🇧 English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage('hi')}
                className={language === 'hi' ? 'bg-primary/10' : ''}
              >
                🇮🇳 हिंदी
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="rounded-xl relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  );
}
