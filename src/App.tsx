import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Animals from "./pages/Animals";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/animals" element={<Animals />} />
                    <Route path="/health" element={<div className="p-8 text-center text-muted-foreground">Health Records - Coming Soon</div>} />
                    <Route path="/feeding" element={<div className="p-8 text-center text-muted-foreground">Feeding Schedule - Coming Soon</div>} />
                    <Route path="/breeding" element={<div className="p-8 text-center text-muted-foreground">Breeding Management - Coming Soon</div>} />
                    <Route path="/sales" element={<div className="p-8 text-center text-muted-foreground">Sales & Purchases - Coming Soon</div>} />
                    <Route path="/reports" element={<div className="p-8 text-center text-muted-foreground">Reports & Analytics - Coming Soon</div>} />
                    <Route path="/settings" element={<div className="p-8 text-center text-muted-foreground">Settings - Coming Soon</div>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
