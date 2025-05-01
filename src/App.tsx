
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import MentalHealth from "./pages/MentalHealth";
import Financial from "./pages/Financial";
import Scholarships from "./pages/Scholarships";
import Community from "./pages/Community";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AuthRoute from "./components/auth/AuthRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<AuthRoute><Dashboard /></AuthRoute>} />
            <Route path="/mental-health" element={<AuthRoute><MentalHealth /></AuthRoute>} />
            <Route path="/financial" element={<AuthRoute><Financial /></AuthRoute>} />
            <Route path="/scholarships" element={<AuthRoute><Scholarships /></AuthRoute>} />
            <Route path="/community" element={<AuthRoute><Community /></AuthRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
