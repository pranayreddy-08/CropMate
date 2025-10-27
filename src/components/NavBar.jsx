import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import HealthBadge from './HealthBadge';

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Leaf className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-foreground">CropMate</span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Home
              </Link>
              <Link
                to="/farmer"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/farmer')
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Farmer
              </Link>
              <Link
                to="/buyer"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/buyer')
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Buyer
              </Link>
            </div>

            <HealthBadge />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
