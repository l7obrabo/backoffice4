
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-2">Login to EpicTrip</h1>
        <p className="text-gray-500">Welcome back! Please enter your details to continue.</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
          <input 
            id="email"
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input" 
            placeholder="Enter your email" 
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
          <input 
            id="password"
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input" 
            placeholder="••••••••" 
          />
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input id="remember" type="checkbox" className="h-4 w-4 accent-blue-600" />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
          </div>
          <a href="#" className="text-sm epic-blue-text">Forgot password?</a>
        </div>
        
        <button 
          type="submit" 
          className="epic-blue-btn w-full mb-6"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <a href="#" className="epic-blue-text">Create account</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
