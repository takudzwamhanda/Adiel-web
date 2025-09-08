import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  image: string;
  name: string;
  brand: string;
  price: string;
  originalPrice?: string;
  rating: number;
  category: string;
  gender: 'male' | 'female' | 'unisex';
}

interface CartItem extends Product {
  quantity: number;
}

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  cartItemCount: number;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  submitContactForm: (formData: ContactForm) => Promise<void>;
  subscribeToNewsletter: (email: string) => Promise<void>;
  showQuickView: (product: Product) => void;
  quickViewProduct: Product | null;
  closeQuickView: () => void;
  user: { email: string; name: string; gender?: string } | null;
  setUser: (user: { email: string; name: string; gender?: string } | null) => void;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  cartTotal: 0,
  cartItemCount: 0,
  wishlist: [],
  toggleWishlist: () => {},
  isInWishlist: () => false,
  submitContactForm: async () => {},
  subscribeToNewsletter: async () => {},
  showQuickView: () => {},
  quickViewProduct: null,
  closeQuickView: () => {},
  user: null,
  setUser: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('adiel-cart');
    const savedWishlist = localStorage.getItem('adiel-wishlist');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }, []);

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('adiel-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('adiel-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id);
      if (isInWishlist) {
        const newWishlist = prevWishlist.filter(item => item.id !== product.id);
        toast({
          title: "Removed from Wishlist",
          description: `${product.name} has been removed from your wishlist.`,
        });
        return newWishlist;
      } else {
        const newWishlist = [...prevWishlist, product];
        toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
        return newWishlist;
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const submitContactForm = async (formData: ContactForm) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would send this to your backend
    console.log('Contact form submitted:', formData);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We'll get back to you soon!",
    });
  };

  const subscribeToNewsletter = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would send this to your backend
    console.log('Newsletter subscription:', email);
    
    toast({
      title: "Subscribed Successfully!",
      description: "You've been subscribed to our newsletter. Check your email for your 15% off code!",
    });
  };

  const showQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + (price * item.quantity);
  }, 0);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        cartTotal,
        cartItemCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        submitContactForm,
        subscribeToNewsletter,
        showQuickView,
        quickViewProduct,
        closeQuickView,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
