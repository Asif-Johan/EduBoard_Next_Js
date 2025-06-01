// src/app/dashboard/teacher/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/me');
        setUser(res.data);
        console.log("From Teacher Dashboard",res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-black'>
      {user ? (
        <div className='text-blue-600'>
          <p>Welcome, {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p className='text-blue-400 text-center'>Loading user data...</p>
      )}
    </div>
  );
};

export default TeacherDashboard;
