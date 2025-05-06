
import { useState } from "react";
import { Eye, EyeOff, Luggage } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de autenticação
    console.log("Login attempt with:", { email, password });
  };

  return (
    <div className="login-card">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Luggage className="text-[hsl(var(--epic-blue))]" size={32} />
        </div>
        <h1 className="text-2xl font-bold epic-blue-text mb-2">EpicTrip</h1>
        <p className="text-lg epic-blue-text">Welcome to our platform</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-2">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="login-input"
            placeholder="mickele@epictrip.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="login-input pr-10"
              placeholder="****************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Forgot password
          </button>
        </div>

        <button type="submit" className="epic-blue-btn w-full mb-6">
          Login
        </button>

        <div className="text-center">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
