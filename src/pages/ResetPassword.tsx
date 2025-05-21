
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import GeometricBackground from "@/components/GeometricBackground";

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Por favor, insira seu email");
      return;
    }

    // In a real application, this would call an API to send a password reset email
    toast.success("Email de recuperação enviado com sucesso!");
    
    // For demo purposes, redirect to verify-code page as if user received the code
    navigate('/verify-code');
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <GeometricBackground />
      <div className="login-card w-full max-w-md p-8 bg-white rounded-xl shadow-md z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="text-blue-600 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <span className="text-2xl font-bold">EpicTrip</span>
          </div>
          <h1 className="text-xl font-medium text-blue-600 mt-2">Reset password</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
          >
            Continue
          </Button>

          <div className="flex justify-center mt-4">
            <button 
              type="button"
              onClick={handleBackToLogin}
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Back to login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
