import React from 'react';
import { Star, Quote } from 'lucide-react';
import Nicole1 from '@/images/Nicole1.jpeg';
import Nicole2 from '@/images/Nicole2.jpeg';
import Tafadzwa from '@/images/Tafadzwa.jpeg';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Nicole',
      image: Nicole1,
      rating: 5,
      text: 'Adiel has transformed my skincare routine! The AVON products she recommended have given me the most radiant skin I\'ve ever had. Her personalized recommendations are spot on!',
      product: 'AVON Care Skincare Set'
    },
    {
      name: 'Tafadzwa',
      image: Tafadzwa,
      rating: 5,
      text: 'I\'ve been buying from Adiel for over a year now. Always authentic products, great prices, and personalized recommendations. Her knowledge of beauty products is incredible!',
      product: 'AVON Body Care Collection'
    },
    {
      name: 'Nicole',
      image: Nicole2,
      rating: 5,
      text: 'The Amity perfumes are absolutely divine! Long-lasting and sophisticated. Adiel\'s service is exceptional - fast delivery and genuine products. I\'m a loyal customer now!',
      product: 'Amity Fine Fragrances'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real reviews from satisfied customers who trust Adiel Beauty for their selfcare needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-pink-100"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-pink-200 absolute -top-2 -left-2" />
                <p className="text-gray-600 leading-relaxed mb-4 pl-6">
                  {testimonial.text}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-pink-600 font-semibold">
                  Purchased: {testimonial.product}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Happy Customers</h3>
            <p className="text-gray-600 mb-6">
              Experience the difference with authentic beauty products and personalized service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const productsSection = document.getElementById('products');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Shop Now
              </button>
              <a 
                href="https://wa.me/263785389836" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
              >
                Get Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;