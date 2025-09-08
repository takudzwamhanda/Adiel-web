
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FirebaseProvider } from './contexts/FirebaseContext'
import { AppProvider } from './contexts/AppContext'

// Suppress React Router warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
    return; // Suppress React Router warnings
  }
  originalWarn.apply(console, args);
};

// Remove dark mode class addition
createRoot(document.getElementById("root")!).render(
  <FirebaseProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </FirebaseProvider>
);
