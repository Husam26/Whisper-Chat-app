import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { MessageSquare, Mail, Lock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AUthimagePattern';
import { toast } from 'react-hot-toast'; // Import toast for notifications

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);  // Added state for Show/Hide password

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before calling the login function
    const isValid = validateForm();
    if (isValid) {
      // Call the login function if the form is valid
      login(formData);
    }
  };

  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
      {/* Left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* Form */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-1'>Login</h1>
              <p className='text-base-content/60'>Log in to your account</p>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type='email'
                  className={`input input-bordered w-full pl-10`}
                  placeholder="youremail@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle between password and text type
                  className={`input input-bordered w-full pl-10`}
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? 'Hide' : 'Show'} {/* Display Show or Hide depending on state */}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <Loader2 className="animate-spin mr-2 w-5 h-5 text-white" />
                ) : null}
                {isLoggingIn ? ' Logging In...' : ' Log In'}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-base-content/60">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="lg:block hidden">
        <AuthImagePattern
          title="Welcome Back!"
          subtitle="Log in to your account and continue where you left off"
        />
      </div>

      {/* Mobile Right side - only show welcome text on small screens */}
      <div className="lg:hidden flex justify-center items-center p-4 bg-primary/10 rounded-xl">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Welcome Back!</h2>
          <p className="text-sm text-base-content/60">
            Log in to your account and continue where you left off
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
