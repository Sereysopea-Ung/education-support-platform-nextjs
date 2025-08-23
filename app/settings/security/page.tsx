'use client'
import React, { useMemo, useState } from "react";

type Session = {
  id: string;
  device: string;
  browser: string;
  os: string;
  lastActivity: string;
  location: string;
  ip: string;
  signInTime: string;
  isCurrent?: boolean;
};

const initialData: Session[] = [
  {
    id: "1",
    device: "Chrome on Windows 11",
    browser: "Chrome 119.0.0",
    os: "Windows 11",
    lastActivity: "Active now",
    location: "seoul",
    ip: "192.168.1.1",
    signInTime: "2023-11-15 14:30:25",
    isCurrent: true,
  },
  {
    id: "2",
    device: "Safari on iPhone 14",
    browser: "Safari 17.0",
    os: "iOS 17.1",
    lastActivity: "2 hours ago",
    location: "knong besdoung nana",
    ip: "192.168.1.2",
    signInTime: "2023-11-15 12:30:25",
  },
  {
    id: "3",
    device: "Firefox on MacBook Pro",
    browser: "Firefox 119.0",
    os: "macOS 14.1",
    lastActivity: "1 day ago",
    location: "Knong besdoung b",
    ip: "192.168.1.3",
    signInTime: "2023-11-14 14:30:25",
  },
];

function SessionCard({
  session,
  onTerminate,
}: {
  session: Session;
  onTerminate: (id: string) => void;
}) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <strong className="text-sm">{session.device}</strong>
          {session.isCurrent && (
            <span className="bg-green-50 text-green-600 text-xs font-semibold py-1 px-2 rounded-full border border-green-300">
              Current Session
            </span>
          )}
        </div>
        <button
          className="text-red-600 bg-white border border-pink-300 py-1 px-3 text-xs font-semibold rounded-md shadow-sm hover:bg-pink-50"
          onClick={() => onTerminate(session.id)}
        >
          Terminate Session
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-4">
        <dl>
          <dt className="text-xs text-gray-600">Browser:</dt>
          <dd className="text-sm">{session.browser}</dd>

          <dt className="text-xs text-gray-600">Operating System:</dt>
          <dd className="text-sm">{session.os}</dd>

          <dt className="text-xs text-gray-600">Last Activity:</dt>
          <dd className="text-sm">{session.lastActivity}</dd>
        </dl>

        <dl>
          <dt className="text-xs text-gray-600">Location:</dt>
          <dd className="text-sm">{session.location}</dd>

          <dt className="text-xs text-gray-600">IP Address:</dt>
          <dd className="text-sm">{session.ip}</dd>

          <dt className="text-xs text-gray-600">Sign-in Time:</dt>
          <dd className="text-sm">{session.signInTime}</dd>
        </dl>
      </div>
    </section>
  );
}

export default function SecuritySessions() {
  const [sessions, setSessions] = useState<Session[]>(initialData);

  const terminate = (id: string) =>
    setSessions((prev) => prev.filter((s) => s.id !== id));

  const logoutAll = () => setSessions((prev) => prev.filter((s) => s.isCurrent));

  const count = useMemo(() => sessions.length, [sessions]);

  return (
    <div className="grid grid-cols-12 h-full w-full overflow-x-hidden bg-white">
      <div className="bg-white p-4 col-span-9 col-start-4 text-gray-500">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl mt-4">Security</h1>
          <button className="text-[#1E3A8A]">
            <img src="/favicon.ico" alt="S3TUDY" className='w-[55px] h-[55px]' />
            <p className='-ml-[145px] -mt-[42px] hover:cursor-pointer text-[20px]'>← Back</p>
          </button>     
        </div>


        <section className="border-t border-gray-200 pt-4 mb-4 relative">
          <h2 className="text-sm font-semibold mb-1">Active Sessions</h2>
          <p className="text-gray-600 text-sm">These are the devices that are currently logged into your account</p>
          <span className="text-gray-600 text-sm absolute right-0 top-0 transform -translate-y-5">
            {count} active {count === 1 ? "session" : "sessions"}
          </span>
        </section>

        <div className="space-y-4">
          {sessions.map((s) => (
            <SessionCard key={s.id} session={s} onTerminate={terminate} />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="w-full max-w-lg bg-white text-red-600 border border-pink-300 py-3 px-4 rounded-lg shadow-md hover:bg-pink-50"
            onClick={logoutAll}
          >
            <div className="flex justify-center">
              <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5594 2.30938L16.3969 6.14687C16.6219 6.37187 16.75 6.68125 16.75 7C16.75 7.31875 16.6219 7.62812 16.3969 7.85312L12.5594 11.6906C12.3594 11.8906 12.0906 12 11.8094 12C11.225 12 10.75 11.525 10.75 10.9406V9H6.75C6.19688 9 5.75 8.55313 5.75 8V6C5.75 5.44688 6.19688 5 6.75 5H10.75V3.05937C10.75 2.475 11.225 2 11.8094 2C12.0906 2 12.3594 2.1125 12.5594 2.30938ZM5.75 2H3.75C3.19688 2 2.75 2.44688 2.75 3V11C2.75 11.5531 3.19688 12 3.75 12H5.75C6.30312 12 6.75 12.4469 6.75 13C6.75 13.5531 6.30312 14 5.75 14H3.75C2.09375 14 0.75 12.6562 0.75 11V3C0.75 1.34375 2.09375 0 3.75 0H5.75C6.30312 0 6.75 0.446875 6.75 1C6.75 1.55313 6.30312 2 5.75 2Z" fill="#DC2626"/>
              </svg>
              <p className="ml-3 -mt-1.5">Log out of all sessions</p>
            </div>
            
          </button>
        </div>
      </div>
    </div>
  );
}

