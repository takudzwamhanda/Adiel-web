import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs,
  orderBy,
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

// Types
interface Profile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  created_at: Date;
  updated_at: Date;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  description?: string;
  inStock: boolean;
  created_at: Date;
}

interface CartItem {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  product: Product;
  created_at: Date;
}

interface WishlistItem {
  id: string;
  product_id: string;
  user_id: string;
  product: Product;
  created_at: Date;
}

interface Order {
  id: string;
  user_id: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  shipping_address: string;
  created_at: Date;
  updated_at: Date;
}

interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: Date;
}

interface FirebaseContextType {
  // Auth
  user: FirebaseUser | null;
  profile: Profile | null;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  
  // Data
  products: Product[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
  reviews: Review[];
  loading: boolean;
  
  // Actions
  getProducts: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  createOrder: (items: CartItem[], shippingAddress: string) => Promise<void>;
  addReview: (productId: string, rating: number, comment: string) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await loadUserProfile(user.uid);
        await loadUserData(user.uid);
      } else {
        setProfile(null);
        setCart([]);
        setWishlist([]);
        setOrders([]);
        setReviews([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load user profile
  const loadUserProfile = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'profiles', userId));
      if (userDoc.exists()) {
        setProfile({ id: userDoc.id, ...userDoc.data() } as Profile);
      }
    } catch (error) {
      console.warn('Could not load user profile (this is normal if Firebase rules are not configured):', error);
      // Don't throw error - just log it as a warning
    }
  };

  // Load user data
  const loadUserData = async (userId: string) => {
    try {
      // Load cart
      const cartQuery = query(collection(db, 'cart_items'), where('user_id', '==', userId));
      const cartSnapshot = await getDocs(cartQuery);
      const cartItems = await Promise.all(
        cartSnapshot.docs.map(async (doc) => {
          const productDoc = await getDoc(doc(db, 'products', doc.data().product_id));
          return {
            id: doc.id,
            ...doc.data(),
            product: { id: productDoc.id, ...productDoc.data() } as Product
          } as CartItem;
        })
      );
      setCart(cartItems);

      // Load wishlist
      const wishlistQuery = query(collection(db, 'wishlist_items'), where('user_id', '==', userId));
      const wishlistSnapshot = await getDocs(wishlistQuery);
      const wishlistItems = await Promise.all(
        wishlistSnapshot.docs.map(async (doc) => {
          const productDoc = await getDoc(doc(db, 'products', doc.data().product_id));
          return {
            id: doc.id,
            ...doc.data(),
            product: { id: productDoc.id, ...productDoc.data() } as Product
          } as WishlistItem;
        })
      );
      setWishlist(wishlistItems);

      // Load orders - simplified query to avoid index requirement
      const ordersQuery = query(collection(db, 'orders'), where('user_id', '==', userId));
      const ordersSnapshot = await getDocs(ordersQuery);
      const orderItems = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
      // Sort orders by created_at in JavaScript instead of Firestore
      orderItems.sort((a, b) => {
        const dateA = a.created_at instanceof Date ? a.created_at : new Date(a.created_at);
        const dateB = b.created_at instanceof Date ? b.created_at : new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
      setOrders(orderItems);
    } catch (error) {
      console.warn('Could not load user data (this is normal if Firebase rules are not configured):', error);
      // Don't throw error - just log it as a warning
      // Set empty arrays as fallback
      setCart([]);
      setWishlist([]);
      setOrders([]);
    }
  };

  // Auth functions
  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user profile
      await setDoc(doc(db, 'profiles', user.uid), {
        email,
        name,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      });
      
      await loadUserProfile(user.uid);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Data functions
  const getProducts = async () => {
    try {
      const productsQuery = query(collection(db, 'products'), orderBy('created_at', 'desc'));
      const snapshot = await getDocs(productsQuery);
      const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(productsList);
    } catch (error) {
      console.error('Error getting products:', error);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    if (!user) return;
    
    try {
      const cartItem = {
        product_id: productId,
        user_id: user.uid,
        quantity,
        created_at: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'cart_items'), cartItem);
      const product = products.find(p => p.id === productId);
      if (product) {
        const newCartItem: CartItem = {
          id: docRef.id,
          ...cartItem,
          product,
          created_at: new Date()
        };
        setCart(prev => [...prev, newCartItem]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    
    try {
      const cartItem = cart.find(item => item.product_id === productId);
      if (cartItem) {
        await deleteDoc(doc(db, 'cart_items', cartItem.id));
        setCart(prev => prev.filter(item => item.product_id !== productId));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartQuantity = async (productId: string, quantity: number) => {
    if (!user) return;
    
    try {
      const cartItem = cart.find(item => item.product_id === productId);
      if (cartItem) {
        await updateDoc(doc(db, 'cart_items', cartItem.id), { quantity });
        setCart(prev => prev.map(item => 
          item.product_id === productId ? { ...item, quantity } : item
        ));
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const addToWishlist = async (productId: string) => {
    if (!user) return;
    
    try {
      const wishlistItem = {
        product_id: productId,
        user_id: user.uid,
        created_at: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'wishlist_items'), wishlistItem);
      const product = products.find(p => p.id === productId);
      if (product) {
        const newWishlistItem: WishlistItem = {
          id: docRef.id,
          ...wishlistItem,
          product,
          created_at: new Date()
        };
        setWishlist(prev => [...prev, newWishlistItem]);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;
    
    try {
      const wishlistItem = wishlist.find(item => item.product_id === productId);
      if (wishlistItem) {
        await deleteDoc(doc(db, 'wishlist_items', wishlistItem.id));
        setWishlist(prev => prev.filter(item => item.product_id !== productId));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const createOrder = async (items: CartItem[], shippingAddress: string) => {
    if (!user) return;
    
    try {
      const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const order = {
        user_id: user.uid,
        total,
        status: 'pending' as const,
        items: items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product.price
        })),
        shipping_address: shippingAddress,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'orders'), order);
      
      // Clear cart after order creation
      for (const item of items) {
        await deleteDoc(doc(db, 'cart_items', item.id));
      }
      setCart([]);
      
      // Add to orders list
      const newOrder: Order = {
        id: docRef.id,
        ...order,
        created_at: new Date(),
        updated_at: new Date()
      };
      setOrders(prev => [newOrder, ...prev]);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const addReview = async (productId: string, rating: number, comment: string) => {
    if (!user) return;
    
    try {
      const review = {
        product_id: productId,
        user_id: user.uid,
        rating,
        comment,
        created_at: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'reviews'), review);
      const newReview: Review = {
        id: docRef.id,
        ...review,
        created_at: new Date()
      };
      setReviews(prev => [...prev, newReview]);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const value: FirebaseContextType = {
    user,
    profile,
    signUp,
    signIn,
    signOutUser,
    products,
    cart,
    wishlist,
    orders,
    reviews,
    loading,
    getProducts,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist,
    createOrder,
    addReview
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
