import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'primary' | 'success' | 'accent' | 'warning';
  className?: string;
}

const variantStyles = {
  primary: 'bg-gradient-primary',
  success: 'bg-gradient-success',
  accent: 'bg-gradient-accent',
  warning: 'bg-gradient-to-br from-yellow-400 to-orange-500',
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = 'primary',
  className,
}: MetricCardProps) {
  return (
    <div className={cn(
      "dashboard-card overflow-hidden",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground">{value}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className={cn(
              "inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-medium",
              trend === 'up' && "bg-green-100 text-green-700",
              trend === 'down' && "bg-red-100 text-red-700",
              trend === 'neutral' && "bg-gray-100 text-gray-700"
            )}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </div>
          )}
        </div>
        <div className={cn(
          "icon-container shrink-0",
          variantStyles[variant]
        )}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
}
