//src/app/signup/student/page.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';



export default function StudentSignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle student signup logic 
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/signup', {
        ...form,
        role: 'student',
      });
      toast.success(response.data.message)
      setMessage('Student Registered successfully. Please Verify Email');
      setMessageColor('text-green-500');
      
      
      console.log(response);
      
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Signup failed. Please try again.');
      setMessageColor('text-red-500');

      if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
      setMessage(errorMessage);
      toast.error(errorMessage);
} else {
       setMessage("Signup failed. Please try again.");
       toast.error("Signup failed. Please try again.");
}

      


    } finally {
      setLoading(false);
    }

  };

  return (<>
    <Toaster position='top-center'
    toastOptions={{
        duration: 6000,
    }}
    />
    <main className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-[#1F2937] text-center">Student Signup</h2>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full px-4 py-2 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="Your full name"
            />
          </div>

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
            className="w-full bg-[#2563EB] text-white py-2 rounded-lg hover:bg-[#1D4ED8] transition"
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>


        {messageColor === 'text-green-500' && <p className="text-center text-sm text-green-500 mt-2">{message}</p>}
        {messageColor === 'text-red-500' && <p className="text-center text-sm text-red-500 mt-2">{message}</p>}

        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-[#2563EB] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
    </>
  );
}
