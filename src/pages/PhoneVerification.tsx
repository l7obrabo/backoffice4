
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import GeometricBackground from "@/components/GeometricBackground";
import { ArrowLeft } from "lucide-react";

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('+1 (431) ****-2314');
  const [verificationMethod, setVerificationMethod] = useState('whatsapp');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if coming from reset password flow
  const isResetFlow = location.state?.fromReset === true;
  
  const handleSendCode = () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    
    toast.success(`Verification code sent via ${verificationMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}`);
    // Navigate to the verification code page
    navigate('/verify-code', { state: { fromReset: isResetFlow } });
  };

  const handlePreviousStep = () => {
    if (isResetFlow) {
      navigate('/reset-password');
    } else {
      navigate('/create-password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <GeometricBackground />
      <div className="login-card w-full max-w-md p-8 bg-white rounded-xl shadow-md z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="text-blue-600 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <span className="text-2xl font-bold">EpicTrip</span>
          </div>
          <h2 className="text-xl font-medium text-blue-600">Reset password</h2>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-gray-600 mb-2">Confirm your phone number</p>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-white"
            />
          </div>

          <div>
            <p className="text-gray-600 mb-2">Choose the method to receive your verification code</p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="whatsapp" 
                  checked={verificationMethod === 'whatsapp'} 
                  onCheckedChange={() => setVerificationMethod('whatsapp')}
                />
                <Label htmlFor="whatsapp" className="cursor-pointer">Whatsapp</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="email" 
                  checked={verificationMethod === 'email'} 
                  onCheckedChange={() => setVerificationMethod('email')}
                />
                <Label htmlFor="email" className="cursor-pointer">Email</Label>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSendCode}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
          >
            Send code
          </Button>
          
          <div className="text-center">
            <button 
              onClick={handlePreviousStep}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Back to previous step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
