import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setEmail('');
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('success');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('error');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Beautiful & Informed
          </h2>
          
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive beauty tips, new product launches, 
            special offers, and insider access to the latest beauty trends.
          </p>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg max-w-md mx-auto">
              ✅ Thank you for subscribing! Welcome to the Adiel Beauty family!
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md mx-auto">
              ❌ Sorry, there was an error. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-4 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all transform flex items-center justify-center space-x-2 ${
                  isSubmitting || !email.trim()
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-white text-pink-600 hover:shadow-lg hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-pink-200 text-sm mt-4">
            🔒 We respect your privacy. Unsubscribe at any time.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Exclusive Offers</h3>
              <p className="text-pink-100">Get access to subscriber-only discounts and promotions</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Beauty Tips</h3>
              <p className="text-pink-100">Expert advice and tutorials from beauty professionals</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">New Products</h3>
              <p className="text-pink-100">Be the first to know about new arrivals and launches</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;