import { Link } from 'react-router-dom';
import { Sprout, ShoppingCart, ArrowRight } from 'lucide-react';
import NavBar from '../components/NavBar';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Welcome to CropMate
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering farmers with AI-driven insights and connecting them with buyers for sustainable agriculture
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Farmer Portal Card */}
          <Link
            to="/farmer"
            className="group bg-card border-2 border-border hover:border-primary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Sprout className="h-16 w-16 text-primary" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Farmer Portal
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Upload soil images, get AI-powered crop recommendations, and access real-time weather and demand insights
              </p>
              
              <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </Link>

          {/* Buyer Portal Card */}
          <Link
            to="/buyer"
            className="group bg-card border-2 border-border hover:border-secondary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-secondary/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="h-16 w-16 text-secondary" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Buyer Portal
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Post your crop requirements, browse farmer offerings, and manage your purchase orders efficiently
              </p>
              
              <div className="flex items-center gap-2 text-secondary font-semibold group-hover:gap-4 transition-all">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 p-6 bg-muted rounded-xl">
            <div>
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Active Farmers</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div>
              <div className="text-3xl font-bold text-secondary">5K+</div>
              <div className="text-sm text-muted-foreground">Verified Buyers</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div>
              <div className="text-3xl font-bold text-accent">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
