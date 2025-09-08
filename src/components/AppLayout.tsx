import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import BrandShowcase from './BrandShowcase';
import ProductGrid from './ProductGrid';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';
import Contact from './Contact';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <BrandShowcase onBrandSelect={handleBrandSelect} />
      <ProductGrid selectedBrandFromBrands={selectedBrand} />
      <Testimonials />
      <Newsletter />
      <Contact />
      <Footer />
    </div>
  );
};

export default AppLayout;