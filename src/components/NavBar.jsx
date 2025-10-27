import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

function NavBar() {
  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-3">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">CropMate</span>
        </Link>

        {/* Right: Home link */}
        <div>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition"
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
