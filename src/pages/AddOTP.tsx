import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import GeometricBackground from "@/components/GeometricBackground";
import { QRCodeCanvas } from 'qrcode.react';

const AddOTP = () => {
  const navigate = useNavigate();
  
  const handleConfirm = () => {
    navigate('/otp-code-entry');
  };
  
  const handlePreviousStep = () => {
    navigate('/verify-code');
  };

  const qrCodeValue = "otpauth://totp/EpicTrip:usuario@exemplo.com?secret=JBSWY3DPEHPK3PXP&issuer=EpicTrip";

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
          <h1 className="text-xl font-bold text-blue-600 mt-2">Adicionar OTP</h1>
        </div>

        <div className="space-y-6">
          <div className="border border-blue-200 rounded-md p-6">
            <p className="text-gray-600 text-center mb-4">
              Leia este QR Code para usar o OTP como<br />
              um processo de autenticação de dois fatores.
            </p>
            
            <div className="flex justify-center my-6">
              {/* QR code component */}
              <div className="w-48 h-48 bg-white flex items-center justify-center">
                <QRCodeCanvas 
                  value={qrCodeValue} 
                  size={192} // w-48 é 192px
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"Q"}
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleConfirm}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
          >
            Confirmar
          </Button>
          
          <div className="text-center">
            <button 
              onClick={handlePreviousStep}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Voltar para etapa anterior
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOTP;
