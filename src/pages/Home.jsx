import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Sprout, ShoppingCart } from "lucide-react";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />

      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        {/* Big Responsive Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
          Welcome to <span className="text-primary">CropMate 🌾</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 px-2">
          AI-driven crop recommendations and a platform that connects farmers
          with verified buyers for smarter, sustainable farming.
        </p>

        {/* Buttons stacked vertically */}
        <div className="flex flex-col gap-4 items-center">
          <Link
            to="/farmer"
            className="flex items-center justify-center gap-2 w-52 px-6 py-3 bg-primary text-white rounded-xl 
            shadow-md shadow-green-400/40 hover:shadow-green-400/80 hover:-translate-y-1 transition-all 
            text-sm sm:text-base font-semibold"
          >
            <Sprout className="h-5 w-5 sm:h-6 sm:w-6" />
            Farmer Portal
          </Link>

          <Link
            to="/buyer"
            className="flex items-center justify-center gap-2 w-52 px-6 py-3 bg-secondary text-white rounded-xl 
            shadow-md shadow-amber-500/40 hover:shadow-amber-500/80 hover:-translate-y-1 transition-all 
            text-sm sm:text-base font-semibold"
          >
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            Buyer Portal
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} CropMate. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
