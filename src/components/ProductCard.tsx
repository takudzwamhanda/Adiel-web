import React from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface Product {
  id: string;
  image: string;
  name: string;
  brand: string;
  price: string;
  originalPrice?: string;
  rating: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, isInWishlist } = useAppContext();

  // Check if product is in wishlist
  const isInWishlistState = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  const handleQuickView = () => {
    // Quick view functionality can be implemented later
    console.log('Quick view:', product.name);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full glowing-card">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleQuickView}
              className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 relative overflow-hidden group/eye"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover/eye:opacity-20 transition-opacity duration-300 rounded-full"></div>
              <Eye className="w-5 h-5 text-gray-700 relative z-10" />
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 relative overflow-hidden group/heart ${
                isInWishlistState 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white text-gray-700'
              }`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover/heart:opacity-20 transition-opacity duration-300 rounded-full ${
                isInWishlistState 
                  ? 'bg-gradient-to-r from-pink-400 to-red-500' 
                  : 'bg-gradient-to-r from-pink-400 to-red-500'
              }`}></div>
              <Heart className={`w-5 h-5 relative z-10 ${isInWishlistState ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {Math.round(((parseFloat(product.originalPrice.replace('R', '')) - parseFloat(product.price.replace('R', ''))) / parseFloat(product.originalPrice.replace('R', ''))) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.brand}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-pink-600">{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through">{product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button - Always at bottom */}
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2 relative overflow-hidden group/btn"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
            <ShoppingCart className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;