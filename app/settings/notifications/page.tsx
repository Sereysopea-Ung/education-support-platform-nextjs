'use client';
import React, { useState } from 'react';

type PrefKey =
  | 'email_followed'
  | 'email_replies'
  | 'email_mentions'
  | 'email_followers'
  | 'app_followed'
  | 'app_replies'
  | 'app_mentions'
  | 'app_followers';

type Frequency = 'Instant' | 'Hourly' | 'Daily' | 'Weekly';

export default function NotificationPage() {
  const [prefs, setPrefs] = useState<Record<PrefKey, boolean>>({
    email_followed: false,
    email_replies: false,
    email_mentions: false,
    email_followers: false,
    app_followed: false,
    app_replies: false,
    app_mentions: false,
    app_followers: false,
  });

  const [frequency, setFrequency] = useState<Frequency>('Instant');
  const [toast, setToast] = useState<string | null>(null);

  const toggle = (k: PrefKey) =>
    setPrefs((p) => ({ ...p, [k]: !p[k] }));

  function handleSave() {
    // pretend to persist…
    setToast('Changes saved');
    setTimeout(() => setToast(null), 1600);
  }

  function CheckRow({
    checked,
    onChange,
    label,
    }: {
    checked: boolean;
    onChange: () => void;
    label: string;
    }) {
    const id = React.useId();
    return (
        <label htmlFor={id} className="flex items-center gap-3 cursor-pointer select-none">
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="h-5 w-5 rounded border border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-[15px] text-gray-800">{label}</span>
        </label>
    );
    }

  return (
    <div className="bg-white h-screen w-screen overflow-x-hidden">
      <div className="bg-white p-4 lg:ml-90 md:ml-60 sm:ml-40 lg:w-[1020px] md:w-[600px] sm:w-[480px] text-gray-500">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
            {/* Title */}
            <h1 className="text-[30px] text-black px-5 -mt-2 mb-4">Notification</h1>
            <button className="text-[#1E3A8A]">
                <img src="/favicon.ico" alt="S3TUDY" className='w-[55px] h-[55px]' />
                <p className='-ml-[145px] -mt-[42px] hover:cursor-pointer text-[20px]'>← Back</p>
            </button>                
        </div>

        {/* Email Notifications */}
        <section className="px-5">
          <h2 className="flex items-center gap-2 text-[20px] text-black mb-3">
            <span className="inline-grid place-items-center w-5 h-5 rounded text-gray-700">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 1.9375C1.94062 1.9375 1.6875 2.19062 1.6875 2.5V3.27695L7.75195 8.25508C8.47969 8.85273 9.52383 8.85273 10.2516 8.25508L16.3125 3.27695V2.5C16.3125 2.19062 16.0594 1.9375 15.75 1.9375H2.25ZM1.6875 5.46016V11.5C1.6875 11.8094 1.94062 12.0625 2.25 12.0625H15.75C16.0594 12.0625 16.3125 11.8094 16.3125 11.5V5.46016L11.3203 9.55937C9.97031 10.6668 8.02617 10.6668 6.67969 9.55937L1.6875 5.46016ZM0 2.5C0 1.25898 1.00898 0.25 2.25 0.25H15.75C16.991 0.25 18 1.25898 18 2.5V11.5C18 12.741 16.991 13.75 15.75 13.75H2.25C1.00898 13.75 0 12.741 0 11.5V2.5Z" fill="#111827"/>
                </svg>
            </span>
            Email Notifications
          </h2>

          <div className="space-y-5">
            <CheckRow
              checked={prefs.email_followed}
              onChange={() => toggle('email_followed')}
              label="New posts in followed topics"
            />
            <CheckRow
              checked={prefs.email_replies}
              onChange={() => toggle('email_replies')}
              label="Replies to my posts"
            />
            <CheckRow
              checked={prefs.email_mentions}
              onChange={() => toggle('email_mentions')}
              label="Mentions"
            />
            <CheckRow
              checked={prefs.email_followers}
              onChange={() => toggle('email_followers')}
              label="New followers"
            />
          </div>
        </section>

        <div className="h-px bg-gray-200 my-6 mx-5" />

        {/* In-App Notifications */}
        <section className="px-5">
          <h2 className="flex items-center gap-2 text-[20px] text-black mb-3">
            <span className="inline-grid place-items-center w-5 h-5 rounded text-gray-700">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.87519 0C7.25293 0 6.75019 0.502734 6.75019 1.125V1.7543C4.20136 2.15859 2.25019 4.36641 2.25019 7.03125V8.20547C2.25019 9.80156 1.70527 11.352 0.710347 12.5965L0.186519 13.2539C-0.0173877 13.507 -0.0560596 13.8551 0.0845654 14.1469C0.22519 14.4387 0.520503 14.625 0.843941 14.625H14.9064C15.2299 14.625 15.5252 14.4387 15.6658 14.1469C15.8064 13.8551 15.7678 13.507 15.5639 13.2539L15.04 12.6C14.0451 11.352 13.5002 9.80156 13.5002 8.20547V7.03125C13.5002 4.36641 11.549 2.15859 9.00019 1.7543V1.125C9.00019 0.502734 8.49746 0 7.87519 0ZM7.87519 3.375H8.15644C10.1744 3.375 11.8127 5.01328 11.8127 7.03125V8.20547C11.8127 9.88945 12.3014 11.5312 13.2084 12.9375H2.54199C3.44902 11.5312 3.93769 9.88945 3.93769 8.20547V7.03125C3.93769 5.01328 5.57597 3.375 7.59394 3.375H7.87519ZM10.1252 15.75H7.87519H5.62519C5.62519 16.3477 5.86074 16.9207 6.28261 17.3426C6.70449 17.7645 7.27754 18 7.87519 18C8.47285 18 9.04589 17.7645 9.46777 17.3426C9.88964 16.9207 10.1252 16.3477 10.1252 15.75Z" fill="#111827"/>
                </svg>
            </span>
            In-App Notifications
          </h2>

          <div className="space-y-5">
            <CheckRow
              checked={prefs.app_followed}
              onChange={() => toggle('app_followed')}
              label="New posts in followed topics"
            />
            <CheckRow
              checked={prefs.app_replies}
              onChange={() => toggle('app_replies')}
              label="Replies to my posts"
            />
            <CheckRow
              checked={prefs.app_mentions}
              onChange={() => toggle('app_mentions')}
              label="Mentions"
            />
            <CheckRow
              checked={prefs.app_followers}
              onChange={() => toggle('app_followers')}
              label="New followers"
            />
          </div>
        </section>

        <div className="h-px bg-gray-200 my-6 mx-5" />

        {/* Notification Frequency */}
        <section className="px-5 mb-6">
          <h2 className="flex items-center gap-2 text-[20px] text-black mb-3">
            <span className="inline-grid place-items-center w-5 h-5 text-gray-700">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.3125 9C16.3125 10.9394 15.5421 12.7994 14.1707 14.1707C12.7994 15.5421 10.9394 16.3125 9 16.3125C7.0606 16.3125 5.20064 15.5421 3.82928 14.1707C2.45792 12.7994 1.6875 10.9394 1.6875 9C1.6875 7.0606 2.45792 5.20064 3.82928 3.82928C5.20064 2.45792 7.0606 1.6875 9 1.6875C10.9394 1.6875 12.7994 2.45792 14.1707 3.82928C15.5421 5.20064 16.3125 7.0606 16.3125 9ZM0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948212 11.3869 0 9 0C6.61305 0 4.32387 0.948212 2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9ZM8.15625 4.21875V9C8.15625 9.28125 8.29688 9.54492 8.53242 9.70312L11.9074 11.9531C12.2941 12.2133 12.818 12.1078 13.0781 11.7176C13.3383 11.3273 13.2328 10.807 12.8426 10.5469L9.84375 8.55V4.21875C9.84375 3.75117 9.46758 3.375 9 3.375C8.53242 3.375 8.15625 3.75117 8.15625 4.21875Z" fill="#111827"/>
                </svg>
            </span>
            Notification Frequency
          </h2>

          <div className="relative">
            <select
              className="w-full p-3 pr-16 border border-gray-200 rounded-lg bg-white font-medium text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-indigo-200"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as Frequency)}
            >
              <option>Instant</option>
              <option>Hourly</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>

            {/* mini avatar */}
            <img
              src="https://i.pravatar.cc/40?img=5"
              alt="you"
              className="absolute top-1/2 -translate-y-1/2 right-12 w-6 h-6 rounded-full border-2 border-white shadow"
            />
          </div>
        </section>

        {/* Footer */}
        <div className="px-5 pb-6 mt-10">
          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow">
          {toast}
        </div>
      )}
    </div>
  );
}


