
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import GeometricBackground from "@/components/GeometricBackground";
import { CheckCircle } from 'lucide-react';

const AccountCreated = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/'); // Redireciona para a página de login (Index)
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100">
      <GeometricBackground />
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl z-10 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-blue-600" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Sua conta foi criada com sucesso!
        </h1>
        <Button
          onClick={handleBackToLogin}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md mt-6"
        >
          Voltar para o login
        </Button>
      </div>
    </div>
  );
};

export default AccountCreated;
