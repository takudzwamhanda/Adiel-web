import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useFirebase } from '@/contexts/FirebaseContext';
import { ShoppingBag, X, Trash2, Plus, Minus, LogOut, Smartphone, Mail, Banknote, Check, Smartphone as EcoCashIcon, Star, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { cart, removeFromCart, updateCartItemQuantity, cartTotal, cartItemCount, user, setUser } = useAppContext();
  const { signOutUser, addReview, user: firebaseUser, reviews, getReviews } = useFirebase();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedOrderMethod, setSelectedOrderMethod] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const navigate = useNavigate();

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser(null);
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Check if user is authenticated
    if (!user) {
      alert('Please log in to proceed with checkout');
      return;
    }

    setShowCheckout(true);
  };

  // Handle order method selection (WhatsApp or Email)
  const handleOrderMethodSelect = (method: string) => {
    setSelectedOrderMethod(method);
  };

  // Handle payment method selection (Zimbabwean payment methods)
  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  // Process order
  const processOrder = () => {
    if (!selectedOrderMethod) {
      alert('Please select how you want to place your order (WhatsApp or Email)');
      return;
    }

    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Create order summary
    const orderSummary = {
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: parseFloat(item.price.replace('$', '')) * item.quantity
      })),
      total: cartTotal,
      date: new Date().toLocaleDateString(),
      orderId: `ORD-${Date.now()}`,
      customerEmail: user.email,
      customerName: user.name,
      orderMethod: selectedOrderMethod,
      paymentMethod: selectedPaymentMethod
    };

    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
      
      // Send order via WhatsApp or Email based on order method
      if (selectedOrderMethod === 'whatsapp') {
        sendOrderToWhatsApp(orderSummary);
      } else if (selectedOrderMethod === 'email') {
        sendOrderToEmail(orderSummary);
      }

      // Clear cart after successful order
      setTimeout(() => {
        cart.forEach(item => removeFromCart(item.id));
        setShowCheckout(false);
        setSelectedOrderMethod('');
        setSelectedPaymentMethod('');
        setOrderComplete(false);
        setSidebarOpen(false);
      }, 3000);
    }, 2000);
  };

  // Reset checkout state
  const resetCheckout = () => {
    setShowCheckout(false);
    setSelectedOrderMethod('');
    setSelectedPaymentMethod('');
    setOrderComplete(false);
  };

  // Handle rating submission
  const handleRatingSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    try {
      // Check if user is logged in
      if (!firebaseUser) {
        alert('Please log in to submit a review');
        return;
      }

      // Add review to Firebase database
      // Using 'general' as productId for general service reviews
      await addReview('general-service', rating, ratingComment || 'General service rating');

      // Get current stats from localStorage for display purposes
    const savedStats = localStorage.getItem('adiel-rating-stats');
    let currentStats = {
      averageRating: 0.0,
      totalRatings: 0,
      totalCustomers: 0
    };

    if (savedStats) {
      currentStats = JSON.parse(savedStats);
    }

      // Calculate new average rating for display
    const newTotalRatings = currentStats.totalRatings + 1;
    const newTotalRating = (currentStats.averageRating * currentStats.totalRatings) + rating;
    const newAverageRating = newTotalRating / newTotalRatings;

      // Update stats for display
    const updatedStats = {
      averageRating: newAverageRating,
      totalRatings: newTotalRatings,
        totalCustomers: Math.max(currentStats.totalCustomers, newTotalRatings)
    };

      // Save to localStorage for display purposes
    localStorage.setItem('adiel-rating-stats', JSON.stringify(updatedStats));

    // Dispatch custom event to update Hero component
    window.dispatchEvent(new CustomEvent('ratingUpdated', { detail: updatedStats }));

    // Show success message
      alert(`Thank you for your ${rating}-star rating! Your feedback has been saved and helps us improve our service.`);
    
    // Reset rating form
    setRating(0);
    setRatingComment('');
    setShowRatingModal(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('There was an error submitting your review. Please try again.');
    }
  };

  // Handle star click
  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  // Handle reviews modal
  const handleShowReviews = async () => {
    setShowReviewsModal(true);
    await getReviews();
  };

  // Send order to WhatsApp
  const sendOrderToWhatsApp = (orderSummary: any) => {
    const whatsappMessage = `🛍️ *NEW ORDER - Adiel Beauty*

*Order ID:* ${orderSummary.orderId}
*Date:* ${orderSummary.date}

*Items:*
${orderSummary.items.map(item => 
  `• ${item.name} x${item.quantity} - $${item.total.toFixed(2)}`
).join('\n')}

*Total:* $${orderSummary.total.toFixed(2)}

*Customer:* ${orderSummary.customerEmail}
*Payment Method:* ${orderSummary.paymentMethod}
*Status:* Pending Payment

Please confirm this order and provide payment details for ${orderSummary.paymentMethod}.`;

    // WhatsApp number - Adiel's actual number
    const whatsappNumber = '263785389836'; // Zimbabwe: +263 78 538 9836
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert(`Order sent to WhatsApp!\nOrder ID: ${orderSummary.orderId}\n\nAdiel will contact you soon to confirm payment and delivery.`);
    
    // Clear cart and close sidebar
    cart.forEach(item => removeFromCart(item.id));
    setSidebarOpen(false);
  };

  // Send order to Email
  const sendOrderToEmail = async (orderSummary: any) => {
    try {
      // You'll need to set up EmailJS with your service details
      // For now, we'll show a formatted email that can be copied
      const emailBody = `NEW ORDER - Adiel Beauty

Order ID: ${orderSummary.orderId}
Date: ${orderSummary.date}

Items:
${orderSummary.items.map(item => 
  `• ${item.name} x${item.quantity} - $${item.total.toFixed(2)}`
).join('\n')}

Total: $${orderSummary.total.toFixed(2)}

Customer: ${orderSummary.customerEmail}
Payment Method: ${orderSummary.paymentMethod}
Status: Pending Payment

Please confirm this order and provide payment details for ${orderSummary.paymentMethod}.`;

      // Show email content for manual sending
      const emailSubject = `New Order - ${orderSummary.orderId}`;
      const mailtoUrl = `mailto:paulineadiel@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open default email client
      window.open(mailtoUrl);
      
      alert(`Order email opened!\nOrder ID: ${orderSummary.orderId}\n\nPlease send the email to confirm your order.`);
      
      // Clear cart and close sidebar
      cart.forEach(item => removeFromCart(item.id));
      setSidebarOpen(false);
      
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email. Please try again or contact Adiel directly.');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 logo-container">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center bounce-logo">
              <span className="text-white font-bold text-sm">AB</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Adiel Beauty</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-pink-500 transition-colors">Home</a>
            <a href="#products" className="text-gray-600 hover:text-pink-500 transition-colors">Products</a>
            <a href="#brands" className="text-gray-600 hover:text-pink-500 transition-colors">Brands</a>
            <a href="#testimonials" className="text-gray-600 hover:text-pink-500 transition-colors">Reviews</a>
            <a href="#contact" className="text-gray-600 hover:text-pink-500 transition-colors">Contact</a>
            <button
              onClick={() => setShowRatingModal(true)}
              className="flex items-center space-x-1 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <Star className="w-4 h-4" />
              <span>Rate Us</span>
            </button>
            <button
              onClick={() => {
                const testimonialsSection = document.getElementById('testimonials');
                if (testimonialsSection) {
                  testimonialsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center space-x-1 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Reviews</span>
            </button>
          </nav>

          {/* Right Side - User Info & Shopping Bag */}
          <div className="flex items-center space-x-4">
            {/* User Info & Sign Out */}
            <div className="flex items-center space-x-4">
              <span className="hidden sm:inline text-gray-600">Welcome, {user?.name || user?.email}</span>
            <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-500 transition-colors"
            >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sign Out</span>
            </button>
            </div>

            {/* Shopping Bag */}
            <button
              onClick={toggleSidebar}
              className="relative p-2 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform flex flex-col">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                <button
                  onClick={toggleSidebar}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart && cart.length > 0 ? (
                <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img
                          src={item.image || '/placeholder-product.jpg'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-pink-600 font-semibold">{item.price}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400">Add some products to get started!</p>
                </div>
              )}
            </div>

            {/* Fixed Footer - Order Summary */}
            {cart && cart.length > 0 && (
              <div className="border-t bg-white flex flex-col max-h-96">
                {/* Order Summary - Always visible */}
                <div className="p-6 border-b">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-pink-600">${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {!showCheckout ? (
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Proceed to Checkout
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={resetCheckout}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={processOrder}
                        disabled={!selectedOrderMethod || !selectedPaymentMethod || orderComplete}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {orderComplete ? 'Processing...' : 'Place Order'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Checkout Options - Scrollable */}
                {showCheckout && (
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4">
                      {/* Order Methods */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">How would you like to place your order?</h3>
                        <div className="space-y-2">
                          <button
                            onClick={() => handleOrderMethodSelect('whatsapp')}
                            className={`w-full p-3 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                              selectedOrderMethod === 'whatsapp' 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Smartphone className="w-5 h-5 text-green-600" />
                            <div className="text-left">
                              <div className="font-medium">WhatsApp Order</div>
                              <div className="text-sm text-gray-600">Send order via WhatsApp</div>
                            </div>
                            {selectedOrderMethod === 'whatsapp' && (
                              <Check className="w-5 h-5 text-green-600 ml-auto" />
                            )}
                          </button>
                          
                          <button
                            onClick={() => handleOrderMethodSelect('email')}
                            className={`w-full p-3 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                              selectedOrderMethod === 'email' 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Mail className="w-5 h-5 text-blue-600" />
                            <div className="text-left">
                              <div className="font-medium">Email Order</div>
                              <div className="text-sm text-gray-600">Send order via Email</div>
                            </div>
                            {selectedOrderMethod === 'email' && (
                              <Check className="w-5 h-5 text-blue-600 ml-auto" />
                            )}
                          </button>
          </div>
        </div>

                      {/* Payment Methods - Only show after order method is selected */}
                      {selectedOrderMethod && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Choose Payment Method</h3>
                          <div className="space-y-2">
                            <button
                              onClick={() => handlePaymentMethodSelect('ecocash')}
                              className={`w-full p-3 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                                selectedPaymentMethod === 'ecocash' 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <EcoCashIcon className="w-5 h-5 text-green-600" />
                              <div className="text-left">
                                <div className="font-medium">EcoCash</div>
                                <div className="text-sm text-gray-600">Mobile money payment</div>
                              </div>
                              {selectedPaymentMethod === 'ecocash' && (
                                <Check className="w-5 h-5 text-green-600 ml-auto" />
                              )}
                            </button>
                            
                            <button
                              onClick={() => handlePaymentMethodSelect('onemoney')}
                              className={`w-full p-3 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                                selectedPaymentMethod === 'onemoney' 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Smartphone className="w-5 h-5 text-blue-600" />
                              <div className="text-left">
                                <div className="font-medium">OneMoney</div>
                                <div className="text-sm text-gray-600">NetOne mobile money</div>
                              </div>
                              {selectedPaymentMethod === 'onemoney' && (
                                <Check className="w-5 h-5 text-blue-600 ml-auto" />
                              )}
                            </button>

                <button
                              onClick={() => handlePaymentMethodSelect('bank_transfer')}
                              className={`w-full p-3 rounded-lg border-2 flex items-center space-x-3 transition-all ${
                                selectedPaymentMethod === 'bank_transfer' 
                                  ? 'border-purple-500 bg-purple-50' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Banknote className="w-5 h-5 text-purple-600" />
                              <div className="text-left">
                                <div className="font-medium">Bank Transfer</div>
                                <div className="text-sm text-gray-600">Direct bank transfer</div>
                              </div>
                              {selectedPaymentMethod === 'bank_transfer' && (
                                <Check className="w-5 h-5 text-purple-600 ml-auto" />
                              )}
                </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Order Complete Message */}
            {orderComplete && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Placed Successfully!</h3>
                  <p className="text-gray-600 mb-4">
                    Your order has been sent to Adiel. You will receive confirmation shortly.
                  </p>
                  <div className="text-sm text-gray-500">
                    This window will close automatically...
                  </div>
                </div>
            </div>
            )}
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Rate Our Service</h3>
              <button
                onClick={() => setShowRatingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 mb-3">How would you rate your experience with Adiel Beauty?</p>
                <div className="flex space-x-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      className="transition-colors"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 hover:text-yellow-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-center text-sm text-gray-600 mt-2">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us more about your experience (optional)
                </label>
                <textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="Share your thoughts about our service, products, or delivery..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRatingSubmit}
                  disabled={rating === 0}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Modal */}
      {showReviewsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Customer Reviews</h3>
              <button
                onClick={() => setShowReviewsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">No Reviews Yet</h4>
                  <p className="text-gray-500">Be the first to rate our service!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-lg p-4 border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-pink-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">
                              {review.user_id.substring(0, 8)}...
                            </div>
                            <div className="text-sm text-gray-500">
                              {review.product_id}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">
                            {review.created_at instanceof Date
                              ? review.created_at.toLocaleDateString()
                              : new Date(review.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      {review.comment && review.comment !== 'General service rating' && (
                        <div className="bg-white rounded p-3 border-l-4 border-pink-200">
                          <p className="text-gray-700 text-sm">{review.comment}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Total Reviews: {reviews.length}
                </div>
                <button
                  onClick={() => setShowReviewsModal(false)}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;