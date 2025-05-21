import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import GeometricBackground from "@/components/GeometricBackground";

const OTPCodeEntry = () => {
  const [otpCode, setOtpCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isResetFlow = location.state?.fromReset === true;
  
  const handleConfirm = () => {
    if (otpCode.length !== 6) {
      toast.error("Please enter the complete OTP code");
      return;
    }
    
    console.log("OTP Code entered:", otpCode);

    if (isResetFlow) {
      toast.success("OTP confirmed, proceed to create new password");
      navigate('/create-new-password'); // Navigate to create new password page
    } else {
      toast.success("OTP confirmed successfully");
      navigate('/account-created'); 
    }
  };
  
  const handlePreviousStep = () => {
    if (isResetFlow) {
      navigate('/verify-code', { state: { fromReset: true } }); // Go back to code verification
    } else {
      navigate('/add-otp'); // Go back to QR code scan page
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <GeometricBackground />
      <div className="login-card w-full max-w-md p-8 bg-white rounded-xl shadow-md z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="text-blue-600 mb-2 flex items-center">
            {/* Using the existing SVG icon. The image shows a suitcase icon. */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 7.5h3M3.75 7.5h16.5M7.5 11.25l.083.083m2.084-2.166L10 9.5m2.084 2.166l.083-.083M7.5 15l.083.083m2.084-2.166L10 13.25m2.084 2.166l.083-.083" />
            </svg>
            <span className="text-3xl font-bold">EpicTrip</span>
          </div>
          <h1 className="text-2xl font-semibold text-blue-600 mt-4">Please, type your OTP Code</h1>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-500 mb-4 text-sm">Insert the code</p>
            
            <div className="flex justify-center mb-4">
              <InputOTP
                maxLength={6}
                value={otpCode}
                onChange={setOtpCode}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="rounded-md h-12 w-12 border-gray-300 text-lg" />
                  <InputOTPSlot index={1} className="rounded-md h-12 w-12 border-gray-300 text-lg" />
                  <InputOTPSlot index={2} className="rounded-md h-12 w-12 border-gray-300 text-lg" />
                  <InputOTPSlot index={3} className="rounded-md h-12 w-12 border-gray-300 text-lg" />
                  <InputOTPSlot index={4} className="rounded-md h-12 w-12 border-gray-300 text-lg" />
                  <InputOTPSlot index={5} className="rounded-md h-12 w-12 border-gray-300 text-lg" />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <Button
            onClick={handleConfirm}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-base"
          >
            Confirm
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

export default OTPCodeEntry;
