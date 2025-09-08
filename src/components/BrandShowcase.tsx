import React from 'react';
import { Sparkles, Heart, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BrandShowcaseProps {
  onBrandSelect?: (brandName: string) => void;
}

const BrandShowcase: React.FC<BrandShowcaseProps> = ({ onBrandSelect }) => {
  const brands = [
    {
      name: 'AVON',
      tagline: 'The Company for Women',
      description: 'Premium beauty products trusted by millions worldwide. From skincare to fragrances, AVON delivers quality and innovation.',
      color: 'from-pink-500 to-pink-700',
      icon: Heart,
      image: '/src/adiel/Avon/Avon page background.jpg'
    },
    {
      name: 'AMITY',
      tagline: 'The World Needs More Amity',
      description: 'Luxury perfumes and skincare products crafted with the finest ingredients for the discerning customer.',
      color: 'from-yellow-500 to-yellow-700',
      icon: Crown,
      image: '/src/adiel/Amity Background.jpg'
    },
    {
      name: 'Arthur Ford',
      tagline: 'Fine Fragrances',
      description: 'Exquisite fragrances that capture elegance and sophistication in every bottle.',
      color: 'from-purple-500 to-purple-700',
      icon: Sparkles,
      image: '/src/adiel/Arthur Ford/Arthur Ford page Background.jpg'
    }
  ];

  const handleBrandClick = (brandName: string) => {
    // Scroll to products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
      
      // Call the parent component's brand selection handler
      if (onBrandSelect) {
        setTimeout(() => {
          onBrandSelect(brandName);
        }, 500);
      }
    }
  };

  return (
    <section id="brands" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Premium Brands
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the finest selection of beauty and selfcare products from trusted brands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand, index) => {
            const IconComponent = brand.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 flex flex-col">
                <div className={`h-48 bg-gradient-to-br ${brand.color} flex items-center justify-center relative overflow-hidden`}>
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{brand.name}</h3>
                    <p className="text-sm font-semibold text-gray-500 mb-4">{brand.tagline}</p>
                    <p className="text-gray-600 leading-relaxed">{brand.description}</p>
                  </div>
                  
                  <div className="mt-6">
                    <button 
                      onClick={() => handleBrandClick(brand.name)}
                      className={`w-full bg-gradient-to-r ${brand.color} text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105 active:scale-95`}
                    >
                      Explore {brand.name}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;