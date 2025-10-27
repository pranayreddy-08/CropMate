import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose }) => {
  const styles = {
    success: 'bg-success/10 border-success text-success-foreground',
    error: 'bg-destructive/10 border-destructive text-destructive',
    info: 'bg-primary/10 border-primary text-primary',
  };

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    info: <AlertCircle className="h-5 w-5" />,
  };

  return (
    <div className={`rounded-lg border-2 p-4 mb-4 flex items-start gap-3 ${styles[type]}`}>
      {icons[type]}
      <p className="flex-1 text-sm font-medium">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close alert"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
