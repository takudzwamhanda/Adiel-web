import React from 'react';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/68b72d572efa8d2913a21e42_1756835222041_70569837.webp" 
                alt="Adiel Beauty Logo" 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-2xl font-bold">Adiel Beauty</h3>
                <p className="text-gray-400">For all your beauty and selfcare products</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for premium beauty and selfcare products. We offer authentic AVON, Arthur Ford, and Amity products with guaranteed customer satisfaction.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  const productsSection = document.getElementById('products');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent('filterByBrand', { detail: 'AVON' }));
                    }, 500);
                  }
                }}
                className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-700 transition-colors cursor-pointer"
              >
                #AVON
              </button>
              <button 
                onClick={() => {
                  const productsSection = document.getElementById('products');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent('filterByBrand', { detail: 'AMITY' }));
                    }, 500);
                  }
                }}
                className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-700 transition-colors cursor-pointer"
              >
                #Amity
              </button>
              <button 
                onClick={() => {
                  const productsSection = document.getElementById('products');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent('filterByBrand', { detail: 'Arthur Ford' }));
                    }, 500);
                  }
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
              >
                #ArthurFord
              </button>
              <button 
                onClick={() => {
                  const productsSection = document.getElementById('products');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent('filterByBrand', { detail: 'Arthur Ford' }));
                    }, 500);
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                #FineFragrances
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-pink-400 transition-colors">Home</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-pink-400 transition-colors">Products</a></li>
              <li><a href="#brands" className="text-gray-300 hover:text-pink-400 transition-colors">Brands</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-pink-400 transition-colors">Contact</a></li>
              <li><a href="#products" onClick={(e) => {
                e.preventDefault();
                const productsSection = document.getElementById('products');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('showAllProducts'));
                  }, 500);
                }
              }} className="text-gray-300 hover:text-pink-400 transition-colors cursor-pointer">Catalog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Special Offers</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-pink-400" />
                <a href="tel:+263785389836" className="text-gray-300 hover:text-white">
                  +263 78 538 9836
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-pink-400" />
                <a href="mailto:paulineadiel@gmail.com" className="text-gray-300 hover:text-white">
                  paulineadiel@gmail.com
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-pink-400 mt-1" />
                <p className="text-gray-300">
                  26428 Unit L Ext<br />
                  Chitungwiza
                </p>
              </div>
            </div>

            <div className="mt-6">
              <a 
                href="https://wa.me/263785389836" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors inline-block"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 Adiel Beauty. All rights reserved. Brands that guarantee Customer Satisfaction.
            </p>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-gray-400">Made with</span>
              <Heart className="w-4 h-4 text-pink-400 fill-current" />
              <span className="text-gray-400">for beauty enthusiasts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;