import React, { useState, useEffect } from 'react';
import { useFirebase } from '@/contexts/FirebaseContext';
import { useAppContext } from '@/contexts/AppContext';
import { Mail, Lock, User, Star, Heart, Shield, Truck, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AuthDashboard: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, signUp, user: firebaseUser, signOutUser } = useFirebase();
  const { setUser: setAppUser } = useAppContext();
  const navigate = useNavigate();

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (firebaseUser) {
      navigate('/home');
    }
  }, [firebaseUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!isLogin && !name) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }

    if (!isLogin && !gender) {
      setError('Please select your gender');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signIn(email, password);
        setSuccess('Successfully logged in!');
        setAppUser({ email, name: email.split('@')[0], gender: '' });
        // Redirect to home after successful login
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        await signUp(email, password, name);
        setSuccess('Account created successfully!');
        setAppUser({ email, name, gender });
        // Redirect to home after successful signup
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
    } catch (error: any) {
      
      // Handle specific Firebase errors
      let errorMessage = 'An error occurred';
      
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address. Please sign up first.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists. Please sign in instead.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setSuccess('Successfully signed out!');
      setAppUser(null);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Adiel Beauty</h1>
          <p className="text-gray-600">Please sign in or create an account to access our premium beauty products</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Authentication Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {isLogin ? 'Welcome Back' : 'Join Adiel Beauty'}
                </h1>
                <p className="text-gray-600">
                  {isLogin ? 'Sign in to your account' : 'Create your account and start shopping'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all appearance-none bg-white"
                        required={!isLogin}
                      >
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              </div>
            </div>

            {/* About Our Page */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">About Adiel Beauty</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Premium Beauty Products</h3>
                      <p className="text-gray-600 text-sm">Discover our curated collection of premium skincare, makeup, and fragrance products from top brands like Avon, Amity, and Arthur Ford.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Authentic Products</h3>
                      <p className="text-gray-600 text-sm">All our products are 100% authentic and sourced directly from authorized distributors to ensure quality and authenticity.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Truck className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Fast Delivery</h3>
                      <p className="text-gray-600 text-sm">Enjoy quick and reliable delivery to your doorstep. We ensure your beauty products reach you in perfect condition.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl shadow-xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Why Choose Adiel Beauty?</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold">100+</div>
                    <div className="opacity-90">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">100+</div>
                    <div className="opacity-90">Premium Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="opacity-90">Customer Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="opacity-90">Support</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Our Brands</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-pink-50 rounded-xl">
                    <div className="font-semibold text-pink-700">Avon</div>
                    <div className="text-xs text-gray-600">Premium Beauty</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <div className="font-semibold text-purple-700">Amity</div>
                    <div className="text-xs text-gray-600">Natural Care</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-xl">
                    <div className="font-semibold text-yellow-700">Arthur Ford</div>
                    <div className="text-xs text-gray-600">Luxury Fragrance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDashboard;
