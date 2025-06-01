'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/signin', form);
      console.log(response);
      toast.success(response.data.message || 'Login successful');
      
      // Optional: redirect based on role
      if (response.data.user.role === 'student') {
        router.push(`/dashboard/student/${response.data.user.id}`);
      } else if (response.data.user.role === 'teacher') {
        router.push(`/dashboard/teacher/${response.data.user.id}`);
      } else {
        router.push('/');
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.error || 'Login failed. Try again.';
        toast.error(errorMsg);
      } else {
        toast.error('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }

    
  };

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('verified') === 'success') {
    toast.success('Email verified! You can now log in.');
  }
}, []);

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <main className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-[#1F2937] text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full px-4 py-2 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="yourRoll@student.ruet.ac.bd"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-1 w-full px-4 py-2 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2563EB] text-white py-2 rounded-lg hover:bg-[#1D4ED8] transition"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{' '}
            <Link href="/signup/student" className="text-[#2563EB] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
