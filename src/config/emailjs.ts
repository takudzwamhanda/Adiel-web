// EmailJS Configuration
// Set these values in your .env.local file

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  TO_EMAIL: 'paulineadiel@gmail.com',
  TO_NAME: 'Adiel Beauty'
};

// EmailJS Template Variables
export const EMAILJS_TEMPLATE_VARS = {
  from_name: '',
  from_email: '',
  from_phone: '',
  message: '',
  to_name: EMAILJS_CONFIG.TO_NAME,
  to_email: EMAILJS_CONFIG.TO_EMAIL
};
