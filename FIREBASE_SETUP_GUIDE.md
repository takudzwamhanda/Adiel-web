# 🔥 Firebase Setup Guide for Adiel Beauty

Your Adiel Beauty project now uses **Firebase** instead of Supabase! Firebase provides:
- **Authentication** (email/password, Google, Facebook)
- **Firestore Database** (NoSQL database)
- **Storage** (for product images)
- **Hosting** (deploy your app)
- **Analytics** (track user behavior)

## 🚀 Quick Setup Steps

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `adiel-beauty` (or your preferred name)
4. Enable Google Analytics (optional but recommended)
5. Click **"Create project"**

### 2. Enable Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Click **"Save"**

### 3. Create Firestore Database
1. Go to **Firestore Database** → **Create database**
2. Choose **"Start in test mode"** (for development)
3. Select a location close to your users
4. Click **"Done"**

### 4. Set Up Security Rules
1. In Firestore Database, go to **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read all products
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Users can manage their own profiles
    match /profiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can manage their own cart items
    match /cart_items/{itemId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
    
    // Users can manage their own wishlist items
    match /wishlist_items/{itemId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
    
    // Users can manage their own orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
    
    // Users can manage their own reviews
    match /reviews/{reviewId} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
  }
}
```

### 5. Get Firebase Configuration
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **"Your apps"** section
3. Click **"Add app"** → **Web app**
4. Register app with name: `Adiel Beauty Web`
5. Copy the configuration object

### 6. Create Environment File
1. Create `.env.local` file in your project root
2. Add your Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# EmailJS Configuration (for contact form)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 7. Add Sample Data (Optional)
You can add sample products to Firestore manually or use the Firebase Console:

**Collection: `products`**
```json
{
  "name": "Avon Care Hydrating Face Cream",
  "brand": "AVON",
  "price": 54,
  "originalPrice": 65,
  "image": "/src/adiel/WhatsApp Image 2025-09-02 at 7.28.18 PM.jpeg",
  "category": "Skincare",
  "rating": 5,
  "inStock": true,
  "created_at": "2025-09-03T00:00:00.000Z"
}
```

## 🔧 Testing Your Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Check the browser console** for any Firebase connection errors

3. **Test authentication** by trying to sign up/sign in

## 🚨 Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check your API key in `.env.local`
   - Make sure the file is in the project root

2. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to Firebase Console → Authentication → Settings → Authorized domains
   - For development, add `localhost`

3. **"Firebase: Error (firestore/permission-denied)"**
   - Check your Firestore security rules
   - Make sure you're authenticated when trying to write data

4. **"Cannot read properties of undefined (reading 'auth')"**
   - Check that Firebase is properly initialized
   - Verify your configuration values

### Still Having Issues?

1. **Check browser console** for detailed error messages
2. **Verify environment variables** are loaded correctly
3. **Restart your dev server** after making changes
4. **Check Firebase Console** for any service errors

## 🎯 Next Steps

Once Firebase is working:

1. **Test user registration** and login
2. **Add products** to your Firestore database
3. **Test cart functionality** (add/remove items)
4. **Test wishlist functionality**
5. **Deploy to Firebase Hosting** when ready

## 🔒 Security Best Practices

1. **Never commit** `.env.local` to version control
2. **Use proper security rules** in production
3. **Enable authentication** before going live
4. **Monitor usage** in Firebase Console
5. **Set up proper indexes** for queries

Your Adiel Beauty business will be ready for real customers with a complete, professional Firebase backend! 🚀✨
