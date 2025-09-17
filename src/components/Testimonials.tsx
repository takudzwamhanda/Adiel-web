import React from 'react';
import { Star, Quote } from 'lucide-react';
// Images are now served from public folder
const Nicole1 = '/images/Nicole1.jpeg';
const Nicole2 = '/images/Nicole2.jpeg';
const Tafadzwa = '/images/Tafadzwa.jpeg';

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
    <section id="testimonials" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
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
            <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 glowing-card group">
              <div className="flex items-center mb-6">
                <div className="relative mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-3 border-pink-200 group-hover:border-pink-400 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
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
                <Quote className="w-8 h-8 text-pink-200 absolute -top-2 -left-2 group-hover:text-pink-300 transition-colors duration-300" />
                <p className="text-gray-600 leading-relaxed mb-4 pl-6 group-hover:text-gray-700 transition-colors duration-300">
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
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto glowing-card group">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">Join Our Happy Customers</h3>
            <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
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
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105 relative overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                <span className="relative z-10">Shop Now</span>
              </button>
              <a 
                href="https://wa.me/263785389836" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all transform hover:scale-105 relative overflow-hidden group/whatsapp"
              >
                <div className="absolute inset-0 bg-green-500 opacity-0 group-hover/whatsapp:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover/whatsapp:opacity-20 transition-opacity duration-300"></div>
                <span className="relative z-10">Get Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;