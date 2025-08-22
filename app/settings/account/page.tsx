'use client';
import React, { useState } from "react";
import Notification from '@/components/Notification';

export default function AccountSettings() {
  const [email, setEmail] = useState("rupp email");
  const [fields, setFields] = useState({ current: "", next: "", confirm: "" });
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
    isVisible: boolean;
  }>({
    type: 'success',
    message: '',
    isVisible: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    
    try {
      // Validate password fields if any are filled
      if (fields.current || fields.next || fields.confirm) {
        if (!fields.current || !fields.next || !fields.confirm) {
          throw new Error('Please fill all password fields');
        }
        if (fields.next !== fields.confirm) {
          throw new Error('New password and confirmation do not match');
        }
        if (fields.next.length < 6) {
          throw new Error('New password must be at least 6 characters');
        }
      }

      // Validate email
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success/failure randomly for demo
      const isSuccess = Math.random() > 0.2; // 80% success rate
      
      if (isSuccess) {
        setNotification({
          type: 'success',
          message: 'Your changes have been saved successfully.',
          isVisible: true
        });
        // Clear password fields after successful save
        setFields({ current: "", next: "", confirm: "" });
      } else {
        throw new Error('Failed to save changes. Please try again.');
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Your changes have not been saved.',
        isVisible: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="bg-white  h-screen  grid grid-cols-12">


      <div className="bg-white p-4 col-span-9 col-start-4 text-gray-500">


    
            {/* Top bar */}
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-[30px] text-gray-800 ml-4">Account</h2>
              <button className="text-[#1E3A8A]">
                <img src="/favicon.ico" alt="S3TUDY" className='w-[55px] h-[55px]' />
                <p className='-ml-[145px] -mt-[42px] hover:cursor-pointer text-[20px]'>← Back</p>
              </button>             
            </div>

           
    
        

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Dynamic notification */}
          <Notification
            type={notification.type}
            message={notification.message}
            isVisible={notification.isVisible}
            onClose={handleCloseNotification}
          />

          {/* Body */}
          <div className="space-y-8 p-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 shadow-sm outline-none ring-0 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="you@example.com"
              />
            </div>

            {/* Change Password */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-700">Change Password</h2>

              <div className="space-y-2">
                <label htmlFor="current" className="text-xs font-medium text-slate-600">
                  Current Password
                </label>
                <input
                  id="current"
                  type="password"
                  value={fields.current}
                  onChange={(e) => setFields({ ...fields, current: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="new" className="text-xs font-medium text-slate-600">
                  New Password
                </label>
                <input
                  id="new"
                  type="password"
                  value={fields.next}
                  onChange={(e) => setFields({ ...fields, next: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirm" className="text-xs font-medium text-slate-600">
                  Confirm New Password
                </label>
                <input
                  id="confirm"
                  type="password"
                  value={fields.confirm}
                  onChange={(e) => setFields({ ...fields, confirm: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleSaveChanges}
                disabled={isLoading}
                className={`rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  isLoading
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-400'
                }`}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
