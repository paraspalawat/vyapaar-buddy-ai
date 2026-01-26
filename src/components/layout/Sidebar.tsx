import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  IndianRupee, 
  TrendingUp, 
  Package, 
  MessageCircle, 
  Megaphone, 
  Globe, 
  Mic, 
  Settings,
  Store,
  X
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { path: '/pricing', icon: IndianRupee, labelKey: 'nav.pricing' },
  { path: '/forecasting', icon: TrendingUp, labelKey: 'nav.forecasting' },
  { path: '/inventory', icon: Package, labelKey: 'nav.inventory' },
  { path: '/whatsapp', icon: MessageCircle, labelKey: 'nav.whatsapp' },
  { path: '/ads', icon: Megaphone, labelKey: 'nav.ads' },
  { path: '/website', icon: Globe, labelKey: 'nav.website' },
  { path: '/assistant', icon: Mic, labelKey: 'nav.assistant' },
  { path: '/settings', icon: Settings, labelKey: 'nav.settings' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-gradient-primary text-white",
          "transform transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Store className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Bharat Vyapaar</h1>
              <p className="text-xs text-white/70">AI Business Platform</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200",
                  "hover:bg-white/10",
                  isActive && "bg-white text-primary font-semibold shadow-lg"
                )}
              >
                <item.icon className={cn("w-6 h-6", isActive ? "text-primary" : "text-white")} />
                <span className={cn("text-base", isActive ? "text-primary" : "text-white")}>
                  {t(item.labelKey)}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="text-sm text-white/80 mb-2">Need help?</p>
            <p className="text-xs text-white/60">Contact support anytime</p>
          </div>
        </div>
      </aside>
    </>
  );
}
