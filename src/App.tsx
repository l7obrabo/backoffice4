
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Companies from "./pages/Companies";
import Customer from "./pages/Customer";
import Houses from "./pages/Houses";
import Booking from "./pages/Booking";
import PreOrders from "./pages/PreOrders";
import Product from "./pages/Product";
import CreatePassword from "./pages/CreatePassword";
import PhoneVerification from "./pages/PhoneVerification";
import VerifyCode from "./pages/VerifyCode";
import AddOTP from "./pages/AddOTP";
import OTPCodeEntry from "./pages/OTPCodeEntry";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/pre-orders" element={<PreOrders />} />
          <Route path="/product" element={<Product />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/phone-verification" element={<PhoneVerification />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/add-otp" element={<AddOTP />} />
          <Route path="/otp-code-entry" element={<OTPCodeEntry />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
