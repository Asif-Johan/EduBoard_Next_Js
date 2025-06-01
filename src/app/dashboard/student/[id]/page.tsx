// src/app/dashboard/student/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const StudentDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/me');
        // Check if user is a student
        if (res.data.role !== 'student') {
          console.log('Non-student attempting to access student dashboard');
          router.push('/forbidden');
          return;
        }
        setUser(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Handle 401 Unauthorized
          if (err.response?.status === 401) {
            router.push('/signin');
            return;
          }
          setError(err.response?.data?.error || 'Failed to fetch user data');
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchUser();
  }, [router]);

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-black'>
        <p className='text-red-500 text-center'>{error}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-black'>
      {user ? (
        <div className='text-blue-600'>
          <p>Welcome, {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p className='text-blue-400 text-center'>Loading...</p>
      )}
    </div>
  );
};

export default StudentDashboard;
