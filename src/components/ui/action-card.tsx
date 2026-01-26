import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ActionCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  to: string;
  variant?: 'primary' | 'success' | 'accent' | 'muted';
  className?: string;
}

const variantStyles = {
  primary: 'bg-primary/10 text-primary hover:bg-primary/20',
  success: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
  accent: 'bg-accent/10 text-accent hover:bg-accent/20',
  muted: 'bg-muted text-muted-foreground hover:bg-muted/80',
};

const iconBgStyles = {
  primary: 'bg-primary',
  success: 'bg-secondary',
  accent: 'bg-accent',
  muted: 'bg-muted-foreground',
};

export function ActionCard({
  title,
  description,
  icon: Icon,
  to,
  variant = 'primary',
  className,
}: ActionCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        "dashboard-card flex items-center gap-4 p-5",
        "transition-all duration-200 hover:scale-[1.02]",
        variantStyles[variant],
        className
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
        iconBgStyles[variant]
      )}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg truncate">{title}</h3>
        {description && (
          <p className="text-sm opacity-70 truncate">{description}</p>
        )}
      </div>
    </Link>
  );
}
