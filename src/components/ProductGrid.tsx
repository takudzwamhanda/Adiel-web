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

    const handleFilterByBrand = (event: CustomEvent) => {
      const brandName = event.detail;
      setShowAllProducts(true);
      setSelectedCategory('All');
      setSelectedBrand(brandName);
    };

    window.addEventListener('showAllProducts', handleShowAllProducts);
    window.addEventListener('filterByBrand', handleFilterByBrand as EventListener);
    
    return () => {
      window.removeEventListener('showAllProducts', handleShowAllProducts);
      window.removeEventListener('filterByBrand', handleFilterByBrand as EventListener);
    };
  }, []);

  const products = [
    // AMITY Products
    {
      id: 'amity-after-shave-balm',
      image: '/images/Amity/Amity After ShaveBalm $5.jpeg',
      name: 'Amity After Shave Balm',
      brand: 'AMITY',
      price: '$5',
      rating: 4.5,
      category: 'Skincare',
      gender: 'male'
    },
    {
      id: 'amity-bath-salts',
      image: '/images/Amity/Amity Bath Salts $7.jpeg',
      name: 'Amity Bath Salts',
      brand: 'AMITY',
      price: '$7',
      rating: 4.5,
      category: 'Body Care',
      gender: 'unisex'
    },
    {
      id: 'amity-braiding-spray',
      image: '/images/Amity/Amity Braiding spray $6.jpeg',
      name: 'Amity Braiding Spray',
      brand: 'AMITY',
      price: '$6',
      rating: 4,
      category: 'Hair Care'
    },
    {
      id: 'amity-facial-kit',
      image: '/images/Amity/Amity Facial Kit $25.jpeg',
      name: 'Amity Facial Kit',
      brand: 'AMITY',
      price: '$25',
      rating: 5,
      category: 'Skincare',
      gender: 'unisex'
    },
    {
      id: 'amity-female-perfumes',
      image: '/images/Amity/Amity Female Perfumes $10.jpeg',
      name: 'Amity Female Perfumes',
      brand: 'AMITY',
      price: '$10',
      rating: 4.5,
      category: 'Fragrance',
      gender: 'female'
    },
    {
      id: 'amity-foot-spray',
      image: '/images/Amity/Amity FootSpray $5.jpeg',
      name: 'Amity Foot Spray',
      brand: 'AMITY',
      price: '$5',
      rating: 4,
      category: 'Body Care'
    },
    {
      id: 'amity-hair-scalp-oil',
      image: '/images/Amity/Amity Hair and Scalp oil treatment $6.jpeg',
      name: 'Amity Hair and Scalp Oil Treatment',
      brand: 'AMITY',
      price: '$6',
      rating: 4.5,
      category: 'Hair Care'
    },
    {
      id: 'amity-hand-body-cream',
      image: '/images/Amity/Amity Hand & Body Cream $5.jpeg',
      name: 'Amity Hand & Body Cream',
      brand: 'AMITY',
      price: '$5',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'amity-hill-balm',
      image: '/images/Amity/Amity Hill Balm $8.jpeg',
      name: 'Amity Hill Balm',
      brand: 'AMITY',
      price: '$8',
      rating: 4.5,
      category: 'Skincare'
    },
    {
      id: 'amity-male-perfumes',
      image: '/images/Amity/Amity Male Perfumes $10.jpeg',
      name: 'Amity Male Perfumes',
      brand: 'AMITY',
      price: '$10',
      rating: 4.5,
      category: 'Fragrance',
      gender: 'male'
    },
    {
      id: 'amity-shower-gel',
      image: '/images/Amity/Amity shower gel $5.jpeg',
      name: 'Amity Shower Gel',
      brand: 'AMITY',
      price: '$5',
      rating: 4,
      category: 'Body Care'
    },
    {
      id: 'amity-skin-care',
      image: '/images/Amity/Amity Skin Care $25.jpeg',
      name: 'Amity Skin Care',
      brand: 'AMITY',
      price: '$25',
      rating: 5,
      category: 'Skincare',
      gender: 'unisex'
    },
    {
      id: 'amity-tumeric-body',
      image: '/images/Amity/Amity Tumeric Body $6.jpeg',
      name: 'Amity Tumeric Body',
      brand: 'AMITY',
      price: '$6',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'amity-tumeric-body-lotion',
      image: '/images/Amity/Amity Tumeric Body Lotion $6.jpeg',
      name: 'Amity Tumeric Body Lotion',
      brand: 'AMITY',
      price: '$6',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'amity-tumeric-scrub',
      image: '/images/Amity/Amity Tumeric Scrub $10.jpeg',
      name: 'Amity Tumeric Scrub',
      brand: 'AMITY',
      price: '$10',
      rating: 4.5,
      category: 'Body Care'
    },

    // AVON Products
    {
      id: 'avon-black-suede',
      image: '/images/Avon/Avon Black Suede $18.jpg',
      name: 'Avon Black Suede',
      brand: 'AVON',
      price: '$18',
      rating: 4.5,
      category: 'Fragrance',
      gender: 'male'
    },
    {
      id: 'avon-blemish-clearing-set',
      image: '/images/Avon/Avon Blemish Clearing Set $20.jpeg',
      name: 'Avon Blemish Clearing Set',
      brand: 'AVON',
      price: '$20',
      rating: 4.5,
      category: 'Skincare',
      gender: 'unisex'
    },
    {
      id: 'avon-body-lotion-720ml',
      image: '/images/Avon/Avon Body Lotion 720ml $10.jpeg',
      name: 'Avon Body Lotion 720ml',
      brand: 'AVON',
      price: '$10',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'avon-body-lotion-handcream-12',
      image: '/images/Avon/Avon Body Lotion and HandCream $12.jpeg',
      name: 'Avon Body Lotion and Hand Cream',
      brand: 'AVON',
      price: '$12',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'avon-body-lotion-handcream-8',
      image: '/images/Avon/Avon Body Lotion and HandCream $8.jpeg',
      name: 'Avon Body Lotion and Hand Cream',
      brand: 'AVON',
      price: '$8',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'avon-body-sprays-her',
      image: '/images/Avon/Avon Body Sprays For Her $6.jpeg',
      name: 'Avon Body Sprays For Her',
      brand: 'AVON',
      price: '$6',
      rating: 4,
      category: 'Fragrance',
      gender: 'female'
    },
    {
      id: 'avon-body-sprays-him',
      image: '/images/Avon/Avon Body Sprays For Him $6.jpeg',
      name: 'Avon Body Sprays For Him',
      brand: 'AVON',
      price: '$6',
      rating: 4,
      category: 'Fragrance',
      gender: 'male'
    },
    {
      id: 'avon-body-wash',
      image: '/images/Avon/Avon Body Wash $6.jpeg',
      name: 'Avon Body Wash',
      brand: 'AVON',
      price: '$6',
      rating: 4,
      category: 'Body Care'
    },
    {
      id: 'avon-bubble-bath',
      image: '/images/Avon/Avon Bubble Bath 500ml $5.jpeg',
      name: 'Avon Bubble Bath 500ml',
      brand: 'AVON',
      price: '$5',
      rating: 4,
      category: 'Body Care'
    },
    {
      id: 'avon-charcoal-soap',
      image: '/images/Avon/Avon Charcoal Soap $3.jpeg',
      name: 'Avon Charcoal Soap',
      brand: 'AVON',
      price: '$3',
      rating: 4,
      category: 'Body Care'
    },
    {
      id: 'avon-face-cream',
      image: '/images/Avon/Avon Face Cream $5.jpeg',
      name: 'Avon Face Cream',
      brand: 'AVON',
      price: '$5',
      rating: 4.5,
      category: 'Skincare'
    },
    {
      id: 'avon-feminine-wash',
      image: '/images/Avon/Avon Feminine Wash 250ml $6.jpg',
      name: 'Avon Feminine Wash 250ml',
      brand: 'AVON',
      price: '$6',
      rating: 4.5,
      category: 'Body Care'
    },
    {
      id: 'avon-foot-works',
      image: '/images/Avon/Avon foot works $5 each.jpg',
      name: 'Avon Foot Works',
      brand: 'AVON',
      price: '$5',
      rating: 4,
      category: 'Body Care'
    },
    {
      id: 'avon-hand-cream',
      image: '/images/Avon/Avon Hand Cream $3.jpeg',
      name: 'Avon Hand Cream',
      brand: 'AVON',
      price: '$3',
      rating: 4,
      category: 'Hand Care'
    },
    {
      id: 'avon-imari-set',
      image: '/images/Avon/Avon Imari set $25.jpeg',
      name: 'Avon Imari Set',
      brand: 'AVON',
      price: '$25',
      rating: 5,
      category: 'Fragrance',
      gender: 'female'
    },
    {
      id: 'avon-lip-oils',
      image: '/images/Avon/Avon Lip oils $10.jpeg',
      name: 'Avon Lip Oils',
      brand: 'AVON',
      price: '$10',
      rating: 4.5,
      category: 'Makeup',
      gender: 'female'
    },
    {
      id: 'avon-lipsticks',
      image: '/images/Avon/Avon Lipsticks $10.jpg',
      name: 'Avon Lipsticks',
      brand: 'AVON',
      price: '$10',
      rating: 4.5,
      category: 'Makeup',
      gender: 'female'
    },
    {
      id: 'avon-onduty-rollon',
      image: '/images/Avon/Avon Onduty RollOn $3.jpg',
      name: 'Avon On Duty Roll On',
      brand: 'AVON',
      price: '$3',
      rating: 4,
      category: 'Deodorant'
    },
    {
      id: 'avon-scented-body-lotion',
      image: '/images/Avon/Avon Scented Body Lotion $6.jpg',
      name: 'Avon Scented Body Lotion',
      brand: 'AVON',
      price: '$6',
      rating: 4.5,
      category: 'Body Care'
    },
    
    // Arthur Ford Products
    {
      id: 'arthur-ford-body-lotion',
      image: '/images/Arthur Ford/Arthur Ford Body Lotion.jfif',
      name: 'Arthur Ford Body Lotion',
      brand: 'Arthur Ford',
      price: '$15',
      rating: 4.5,
      category: 'Body Care',
      gender: 'unisex'
    },
    {
      id: 'arthur-ford-perfume-men',
      image: '/images/Arthur Ford/Arthur Ford perfume for men.jpg',
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

  // Featured products - best from each brand, filtered by gender
  const getFeaturedProducts = () => {
    const allFeatured = [
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

    // Filter by gender
    return allFeatured.filter(product => {
      const productGender = product.gender || 'unisex';
      if (selectedGender === 'unisex') {
        return true; // Show all products when "All" is selected
      }
      return productGender === selectedGender || productGender === 'unisex';
    });
  };

  const featuredProducts = getFeaturedProducts();

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand;
    const productGender = product.gender || 'unisex'; // Default to unisex if no gender specified
    
    // Gender filtering logic
    let genderMatch;
    if (selectedGender === 'unisex') {
      genderMatch = true; // Show all products when "All" is selected
    } else {
      genderMatch = productGender === selectedGender || productGender === 'unisex';
    }
    
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