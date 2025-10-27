import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { checkHealth } from '../services/api';

const HealthBadge = () => {
  const [status, setStatus] = useState({ online: false, modelLoaded: false });

  useEffect(() => {
    const checkApiHealth = async () => {
      const result = await checkHealth();
      setStatus({
        online: result.online,
        modelLoaded: result.online && result.data?.model_loaded,
      });
    };

    checkApiHealth();
    const interval = setInterval(checkApiHealth, 30000); // Check every 30s

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        status.online && status.modelLoaded
          ? 'bg-success/20 text-success'
          : 'bg-destructive/20 text-destructive'
      }`}
      role="status"
      aria-live="polite"
    >
      <Activity className="h-3.5 w-3.5" />
      <span>
        {status.online && status.modelLoaded ? 'Model loaded ✅' : 'Offline ❌'}
      </span>
    </div>
  );
};

export default HealthBadge;
