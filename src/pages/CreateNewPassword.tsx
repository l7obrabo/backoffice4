
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import GeometricBackground from "@/components/GeometricBackground";
import { Eye, EyeOff, Check } from 'lucide-react';

const PasswordCriterion = ({ text, isValid }: { text: string; isValid: boolean }) => (
  <li className={`flex items-center text-sm ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
    <Check className={`h-4 w-4 mr-2 ${isValid ? 'text-green-600' : 'text-gray-400'}`} />
    {text}
  </li>
);

const CreateNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const passwordCriteria = [
    { text: "Be at least 8 and 20 characters", check: (p: string) => p.length >= 8 && p.length <= 20 },
    { text: "Include at least one number", check: (p: string) => /\d/.test(p) },
    { text: "Include at least one symbol", check: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) }, // Example symbols
    { text: "Include at least one uppercase letter", check: (p: string) => /[A-Z]/.test(p) },
    { text: "Include at least a special character (!@#$&*)", check: (p: string) => /[!@#$&*]/.test(p) },
    { text: "Not contain your name, username, or school name", check: (_p: string) => true }, // Placeholder, complex to implement without more info
    { text: "Must be different from your email", check: (_p: string) => true }, // Placeholder, complex to implement without email
  ];

  const validatePassword = (pass: string) => {
    return passwordCriteria.every(criterion => criterion.check(pass));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password does not meet all criteria.");
      return;
    }

    // Simulate API call for password creation
    console.log("New password created:", password);
    toast.success("Password created successfully!");
    navigate('/'); // Navigate to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <GeometricBackground />
      <div className="login-card w-full max-w-lg p-8 bg-white rounded-xl shadow-xl z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="text-blue-600 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 7.5h3M3.75 7.5h16.5M7.5 11.25l.083.083m2.084-2.166L10 9.5m2.084 2.166l.083-.083M7.5 15l.083.083m2.084-2.166L10 13.25m2.084 2.166l.083-.083" />
            </svg>
            <span className="text-3xl font-bold">EpicTrip</span>
          </div>
          <h1 className="text-2xl font-semibold text-blue-600 mt-4">Create new password</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-base"
          >
            Continue
          </Button>
        </form>

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-900 mb-2">Your password must contain:</p>
          <ul className="space-y-1">
            {passwordCriteria.map((criterion, index) => (
              <PasswordCriterion key={index} text={criterion.text} isValid={criterion.check(password)} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
