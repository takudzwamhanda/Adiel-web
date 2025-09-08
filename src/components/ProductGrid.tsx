import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Search, Filter, Users, User } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface ProductGridProps {
  selectedBrandFromBrands?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ selectedBrandFromBrands }) => {
  const { user } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState(selectedBrandFromBrands || 'All');
  const [selectedGender, setSelectedGender] = useState(user?.gender || 'unisex');
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Update selected brand when prop changes
  React.useEffect(() => {
    if (selectedBrandFromBrands) {
      setSelectedBrand(selectedBrandFromBrands);
      setShowAllProducts(true); // Show all products when brand is selected
    }
  }, [selectedBrandFromBrands]);

  // Listen for catalog button click from Hero component
  React.useEffect(() => {
    const handleShowAllProducts = () => {
      setShowAllProducts(true);
      setSelectedCategory('All');
      setSelectedBrand('All');
    };

    window.addEventListener('showAllProducts', handleShowAllProducts);
    
    return () => {
      window.removeEventListener('showAllProducts', handleShowAllProducts);
    };
  }, []);

  const products = [
    // AMITY Products
    {
      id: 'amity-after-shave-balm',
      image: '/src/adiel/Amity/Amity After ShaveBalm $5.jpeg',
      name: 'Amity After Shave Balm',
      brand: 'AMITY',
      price: '$5',
      rating: 4.5,
      category: 'Skincare',
      gender: 'male'
    },
    {
      id: 'amity-bath-salts',
      image: '/src/adiel/Amity/Amity Bath Salts $7.jpeg',
      name: 'Amity Bath Salts',
      brand: 'AMITY',
      price: '$7',
      rating: 4.5,
      category: 'Body Care',
      gender: 'unisex'
    },
    {
      id: 'amity-braiding-spray',
      image: '/src/adiel/Amity/Amity Braiding spray $6.jpeg',
      name: 'Amity Braiding Spray',
      brand: 'AMITY',
      price: '$6',
      rating: 4,
      category: 'Hair Care'
    },
    {
      id: 'amity-facial-kit',
      image: '/src/adiel/Amity/Amity Facial Kit $25.jpeg',
      name: 'Amity Facial Kit',
      brand: 'AMITY',
      price: '$25',
      rating: 5,
      category: 'Skincare'
    },
    {
      id: 'amity-female-perfumes',
      image: '/src/adiel/Amity/Amity Female Perfumes $10.jpeg',
      name: 'Amity Female Perfumes',
      brand: 'AMITY',
      price: '$10',
      rating: 4.5,
      category: 'Fragrance',
      gender: 'female'
    },
    {
      id: 'amity-foot-spray',
      image: '/src/adiel/Amity/Amity FootSpray $5.jpeg',
      name: 'Amity Foot Spray',
      brand: 'AMITY',
      price: '$5',
      rating: 4,
      category: 'Body Care'
    },
    {
      id: 'amity-hair-scalp-oil',
      image: '/src/adiel/Amity/Amity Hair and Scalp oil treatment $6.jpeg',
      name: 'Amity Hair and Scalp Oil Treatment',
      brand: 'AMITY',
      price: '$6',
      rating: 4.5,
      category: 'Hair Care'
    },
    {
      id: 'amity-hand-body-cream',
      image: '/src/adiel/Amity/Amity Hand & Body Cream $5.jpeg',
      name: 'Amity Hand & Body Cream',
      brand: 'AMITY',
      price: '$5',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'amity-hill-balm',
      image: '/src/adiel/Amity/Amity Hill Balm $8.jpeg',
      name: 'Amity Hill Balm',
      brand: 'AMITY',
      price: '$8',
      rating: 4.5,
      category: 'Skincare'
    },
    {
      id: 'amity-male-perfumes',
      image: '/src/adiel/Amity/Amity Male Perfumes $10.jpeg',
      name: 'Amity Male Perfumes',
      brand: 'AMITY',
      price: '$10',
      rating: 4.5,
      category: 'Fragrance'
    },
    {
      id: 'amity-shower-gel',
      image: '/src/adiel/Amity/Amity shower gel $5.jpeg',
      name: 'Amity Shower Gel',
      brand: 'AMITY',
      price: '$5',
      rating: 4,
      category: 'Body Care'
    },
    {
      id: 'amity-skin-care',
      image: '/src/adiel/Amity/Amity Skin Care $25.jpeg',
      name: 'Amity Skin Care',
      brand: 'AMITY',
      price: '$25',
      rating: 5,
      category: 'Skincare'
    },
    {
      id: 'amity-tumeric-body',
      image: '/src/adiel/Amity/Amity Tumeric Body $6.jpeg',
      name: 'Amity Tumeric Body',
      brand: 'AMITY',
      price: '$6',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'amity-tumeric-body-lotion',
      image: '/src/adiel/Amity/Amity Tumeric Body Lotion $6.jpeg',
      name: 'Amity Tumeric Body Lotion',
      brand: 'AMITY',
      price: '$6',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'amity-tumeric-scrub',
      image: '/src/adiel/Amity/Amity Tumeric Scrub $10.jpeg',
      name: 'Amity Tumeric Scrub',
      brand: 'AMITY',
      price: '$10',
      rating: 4.5,
      category: 'Body Care'
    },

    // AVON Products
    {
      id: 'avon-black-suede',
      image: '/src/adiel/Avon/Avon Black Suede $18.jpg',
      name: 'Avon Black Suede',
      brand: 'AVON',
      price: '$18',
      rating: 4.5,
      category: 'Fragrance'
    },
    {
      id: 'avon-blemish-clearing-set',
      image: '/src/adiel/Avon/Avon Blemish Clearing Set $20.jpeg',
      name: 'Avon Blemish Clearing Set',
      brand: 'AVON',
      price: '$20',
      rating: 4.5,
      category: 'Skincare'
    },
    {
      id: 'avon-body-lotion-720ml',
      image: '/src/adiel/Avon/Avon Body Lotion 720ml $10.jpeg',
      name: 'Avon Body Lotion 720ml',
      brand: 'AVON',
      price: '$10',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'avon-body-lotion-handcream-12',
      image: '/src/adiel/Avon/Avon Body Lotion and HandCream $12.jpeg',
      name: 'Avon Body Lotion and Hand Cream',
      brand: 'AVON',
      price: '$12',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'avon-body-lotion-handcream-8',
      image: '/src/adiel/Avon/Avon Body Lotion and HandCream $8.jpeg',
      name: 'Avon Body Lotion and Hand Cream',
      brand: 'AVON',
      price: '$8',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'avon-body-sprays-her',
      image: '/src/adiel/Avon/Avon Body Sprays For Her $6.jpeg',
      name: 'Avon Body Sprays For Her',
      brand: 'AVON',
      price: '$6',
      rating: 4,
      category: 'Fragrance'
    },
    {
      id: 'avon-body-sprays-him',
      image: '/src/adiel/Avon/Avon Body Sprays For Him $6.jpeg',
      name: 'Avon Body Sprays For Him',
      brand: 'AVON',
      price: '$6',
      rating: 4,
      category: 'Fragrance'
    },
    {
      id: 'avon-body-wash',
      image: '/src/adiel/Avon/Avon Body Wash $6.jpeg',
      name: 'Avon Body Wash',
      brand: 'AVON',
      price: '$6',
      rating: 4,
      category: 'Body Care'
    },
    {
      id: 'avon-bubble-bath',
      image: '/src/adiel/Avon/Avon Bubble Bath 500ml $5.jpeg',
      name: 'Avon Bubble Bath 500ml',
      brand: 'AVON',
      price: '$5',
      rating: 4,
      category: 'Body Care'
    },
    {
      id: 'avon-charcoal-soap',
      image: '/src/adiel/Avon/Avon Charcoal Soap $3.jpeg',
      name: 'Avon Charcoal Soap',
      brand: 'AVON',
      price: '$3',
      rating: 4,
      category: 'Body Care'
    },
    {
      id: 'avon-face-cream',
      image: '/src/adiel/Avon/Avon Face Cream $5.jpeg',
      name: 'Avon Face Cream',
      brand: 'AVON',
      price: '$5',
      rating: 4.5,
      category: 'Skincare'
    },
    {
      id: 'avon-feminine-wash',
      image: '/src/adiel/Avon/Avon Feminine Wash 250ml $6.jpg',
      name: 'Avon Feminine Wash 250ml',
      brand: 'AVON',
      price: '$6',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'avon-foot-works',
      image: '/src/adiel/Avon/Avon foot works $5 each.jpg',
      name: 'Avon Foot Works',
      brand: 'AVON',
      price: '$5',
      rating: 4,
      category: 'Body Care'
    },
    {
      id: 'avon-hand-cream',
      image: '/src/adiel/Avon/Avon Hand Cream $3.jpeg',
      name: 'Avon Hand Cream',
      brand: 'AVON',
      price: '$3',
      rating: 4,
      category: 'Hand Care'
    },
    {
      id: 'avon-imari-set',
      image: '/src/adiel/Avon/Avon Imari set $25.jpeg',
      name: 'Avon Imari Set',
      brand: 'AVON',
      price: '$25',
      rating: 5,
      category: 'Fragrance'
    },
    {
      id: 'avon-lip-oils',
      image: '/src/adiel/Avon/Avon Lip oils $10.jpeg',
      name: 'Avon Lip Oils',
      brand: 'AVON',
      price: '$10',
      rating: 4.5,
      category: 'Makeup'
    },
    {
      id: 'avon-lipsticks',
      image: '/src/adiel/Avon/Avon Lipsticks $10.jpg',
      name: 'Avon Lipsticks',
      brand: 'AVON',
      price: '$10',
      rating: 4.5,
      category: 'Makeup'
    },
    {
      id: 'avon-onduty-rollon',
      image: '/src/adiel/Avon/Avon Onduty RollOn $3.jpg',
      name: 'Avon On Duty Roll On',
      brand: 'AVON',
      price: '$3',
      rating: 4,
      category: 'Deodorant'
    },
    {
      id: 'avon-scented-body-lotion',
      image: '/src/adiel/Avon/Avon Scented Body Lotion $6.jpg',
      name: 'Avon Scented Body Lotion',
      brand: 'AVON',
      price: '$6',
      rating: 4.5,
      category: 'Body Care'
    },
    
    // Arthur Ford Products
    {
      id: 'arthur-ford-body-lotion',
      image: '/src/adiel/Arthur Ford/Arthur Ford Body Lotion.jfif',
      name: 'Arthur Ford Body Lotion',
      brand: 'Arthur Ford',
      price: '$15',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'arthur-ford-perfume-men',
      image: '/src/adiel/Arthur Ford/Arthur Ford perfume for men.jpg',
      name: 'Arthur Ford Perfume for Men',
      brand: 'Arthur Ford',
      price: '$25',
      rating: 5,
      category: 'Fragrance',
      gender: 'male'
    }
  ];

  const categories = ['All', 'Skincare', 'Body Care', 'Fragrance', 'Hair Care', 'Hand Care', 'Makeup', 'Deodorant'];
  const brands = ['All', 'AMITY', 'AVON', 'Arthur Ford'];

  // Featured products - best from each brand
  const featuredProducts = [
    // Best AMITY products
    products.find(p => p.id === 'amity-facial-kit'),
    products.find(p => p.id === 'amity-skin-care'),
    products.find(p => p.id === 'amity-female-perfumes'),
    products.find(p => p.id === 'amity-male-perfumes'),
    
    // Best AVON products
    products.find(p => p.id === 'avon-imari-set'),
    products.find(p => p.id === 'avon-blemish-clearing-set'),
    products.find(p => p.id === 'avon-black-suede'),
    products.find(p => p.id === 'avon-lipsticks'),
    
    // Best Arthur Ford products
    products.find(p => p.id === 'arthur-ford-perfume-men'),
    products.find(p => p.id === 'arthur-ford-body-lotion'),
  ].filter(Boolean);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
    const productGender = product.gender || 'unisex'; // Default to unisex if no gender specified
    const genderMatch = selectedGender === 'unisex' || productGender === selectedGender || productGender === 'unisex';
    return categoryMatch && brandMatch && genderMatch;
  });

  // Determine which products to display
  const displayProducts = showAllProducts ? filteredProducts : featuredProducts;

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {showAllProducts ? 'All Products' : 'Featured Products'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {showAllProducts 
              ? 'Browse our complete collection of premium beauty products from top brands.'
              : 'Discover our handpicked selection of the best products from each brand. Quality products at affordable prices.'
            }
          </p>
        </div>

        {/* Gender Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setSelectedGender('male')}
              className={`px-6 py-3 rounded-md font-medium transition-all flex items-center space-x-2 ${
                selectedGender === 'male'
                  ? 'bg-white text-pink-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Men</span>
            </button>
            <button
              onClick={() => setSelectedGender('female')}
              className={`px-6 py-3 rounded-md font-medium transition-all flex items-center space-x-2 ${
                selectedGender === 'female'
                  ? 'bg-white text-pink-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Women</span>
            </button>
            <button
              onClick={() => setSelectedGender('unisex')}
              className={`px-6 py-3 rounded-md font-medium transition-all flex items-center space-x-2 ${
                selectedGender === 'unisex'
                  ? 'bg-white text-pink-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>All</span>
            </button>
          </div>
        </div>

        {/* View More Button - Only show when viewing featured products */}
        {!showAllProducts && (
          <div className="text-center mb-12">
            <button
              onClick={() => setShowAllProducts(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              View All Products ({products.length})
            </button>
          </div>
        )}

        {/* Filters - Only show when viewing all products */}
        {showAllProducts && (
          <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Filter by:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
          <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Category:</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
              {/* Brand Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Brand:</label>
          <select 
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
            </div>
          </div>
        )}

        {/* Back to Featured Button - Only show when viewing all products */}
        {showAllProducts && (
          <div className="text-center mb-8">
            <button
              onClick={() => {
                setShowAllProducts(false);
                setSelectedCategory('All');
                setSelectedBrand('All');
              }}
              className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
            >
              ← Back to Featured Products
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {displayProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBrand('All');
              }}
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Product Count */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            {showAllProducts 
              ? `Showing ${filteredProducts.length} of ${products.length} products`
              : `Showing ${featuredProducts.length} featured products`
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;