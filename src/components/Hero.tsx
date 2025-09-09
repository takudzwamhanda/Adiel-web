import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const [ratingStats, setRatingStats] = useState({
    averageRating: 0.0,
    totalRatings: 0,
    totalCustomers: 0
  });

  // Load rating stats from localStorage or initialize with realistic starting values
  useEffect(() => {
    const savedStats = localStorage.getItem('adiel-rating-stats');
    if (savedStats) {
      setRatingStats(JSON.parse(savedStats));
    } else {
      // Start with realistic values for a new business
      const initialStats = {
        averageRating: 0.0,
        totalRatings: 0,
        totalCustomers: 0
      };
      setRatingStats(initialStats);
      localStorage.setItem('adiel-rating-stats', JSON.stringify(initialStats));
    }

    // Listen for rating updates
    const handleRatingUpdate = (event: any) => {
      setRatingStats(event.detail);
    };

    window.addEventListener('ratingUpdated', handleRatingUpdate);
    
    return () => {
      window.removeEventListener('ratingUpdated', handleRatingUpdate);
    };
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openCatalog = () => {
    // Scroll to products section and show all products
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
      
      // Trigger the "View All Products" functionality
      setTimeout(() => {
        // Dispatch a custom event to trigger showing all products
        window.dispatchEvent(new CustomEvent('showAllProducts'));
      }, 500);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-hidden mb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              <span>Premium Beauty Products</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Natural Beauty
              </span>
          </h1>
          
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Transform your beauty routine with our curated collection of premium skincare, makeup, and fragrance products. 
              Experience luxury at affordable prices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToProducts}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={openCatalog}
                className="border-2 border-pink-500 text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>View Catalog</span>
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {ratingStats.totalCustomers > 0 ? `${ratingStats.totalCustomers}+` : '0'}
                </div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">37</div>
                <div className="text-sm text-gray-600">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <div className="text-2xl font-bold text-gray-800">
                    {ratingStats.totalRatings > 0 ? ratingStats.averageRating.toFixed(1) : '0.0'}
                  </div>
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
                <div className="text-sm text-gray-600">
                  {ratingStats.totalRatings > 0 ? `${ratingStats.totalRatings} Reviews` : 'No Reviews Yet'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/images/adiel.jpeg"
                alt="Adiel - Beauty Expert"
                className="w-full h-[600px] object-cover rounded-3xl shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;