
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { FirebaseProvider } from "@/contexts/FirebaseContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthDashboard from "./components/AuthDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

// Create router with modern syntax
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthDashboard />,
  },
  {
    path: "/auth",
    element: <AuthDashboard />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FirebaseProvider>
          <Toaster />
          <Sonner />
          <RouterProvider router={router} />
        </FirebaseProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
