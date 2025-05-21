import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GeometricBackground from "@/components/GeometricBackground";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(54);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if coming from reset password flow
  const isResetFlow = location.state?.fromReset === true;
  
  // Timer for the resend code countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timerId);
  }, [timeLeft]);
  
  const handleConfirm = () => {
    if (verificationCode.length !== 6) {
      toast.error("Please enter the complete verification code");
      return;
    }
    
    toast.success("Code verified successfully");
    
    if (isResetFlow) {
      // Navigate to OTP code entry page in reset flow
      navigate('/otp-code-entry', { state: { fromReset: true } });
    } else {
      navigate('/add-otp');
    }
  };
  
  const handleResendCode = () => {
    setTimeLeft(54);
    toast.success("Verification code resent");
  };
  
  const handlePreviousStep = () => {
    navigate('/phone-verification', { state: { fromReset: isResetFlow } });
  };

  // Format the timer as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <GeometricBackground />
      <div className="login-card w-full max-w-md p-8 bg-white rounded-xl shadow-md z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="text-blue-600 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <span className="text-2xl font-bold">EpicTrip</span>
          </div>
          {/* Title changes based on context, but let's keep "Reset password" if isResetFlow for consistency with PhoneVerification */}
          <h2 className="text-xl font-medium text-blue-600 mb-6">{isResetFlow ? "Reset password" : "Verify Phone Number"}</h2>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Insert the code sent for you</p>
            
            <div className="flex justify-center mb-4">
              <InputOTP
                maxLength={6}
                value={verificationCode}
                onChange={setVerificationCode}
                // className="gap-2" // The input-otp component itself adds gap-2 via containerClassName
              >
                <InputOTPGroup className="gap-2"> {/* Apply gap directly to group if needed, or rely on InputOTP's default */}
                  <InputOTPSlot index={0} className="rounded-md h-12 w-12 border-gray-300 text-lg" />
                  <InputOTPSlot index={1} className="rounded-md h-12 w-12 border-gray-300 text-lg" />
                  <InputOTPSlot index={2} className="rounded-md h-12 w-12 border-gray-300 text-lg" />
                  <InputOTPSlot index={3} className="rounded-md h-12 w-12 border-gray-300 text-lg" />
                  <InputOTPSlot index={4} className="rounded-md h-12 w-12 border-gray-300 text-lg" />
                  <InputOTPSlot index={5} className="rounded-md h-12 w-12 border-gray-300 text-lg" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <button 
              onClick={handleResendCode}
              disabled={timeLeft > 0}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resend code {timeLeft > 0 ? `(${formatTime(timeLeft)})` : ''}
            </button>
          </div>

          <Button
            onClick={handleConfirm}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
          >
            Confirm
          </Button>
          
          <div className="text-center mt-4">
            <button 
              onClick={handlePreviousStep}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Back to previous step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
