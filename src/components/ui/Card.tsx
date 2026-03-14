import { cn } from '../../lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return (
    <div className={cn('rounded-lg border bg-card shadow-sm', className)}>
      {children}
    </div>
  );
};

const CardHeader = ({ className, children }: CardProps) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  );
};

const CardTitle = ({ className, children }: CardProps) => {
  return (
    <h3 className={cn('font-semibold leading-none tracking-tight', className)}>
      {children}
    </h3>
  );
};

const CardDescription = ({ className, children }: CardProps) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
};

const CardContent = ({ className, children }: CardProps) => {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
};

const CardFooter = ({ className, children }: CardProps) => {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };

