"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PeopleToFollowPage({tittle}, items = {}) {

  const mockData = [ 
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Au Ping",
      course: "Computer Science",
      year: "Year 3",
      roles : "Teacher",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Rong Rong",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
      roles : "Student",
      posts : 10,
      followers : "4.4k",
      mutual : 25
    },
    
    
  ];

  const router = useRouter();
  const [search, setSearch] = useState('');
  const [followed, setFollowed] = useState(Array(mockData.length).fill(false));

  const toggleFollow = (index) => {
    setFollowed((prev) => prev.map((f, i) => (i === index ? !f : f)));
  };

  const filtered = mockData.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const [visibleCount, setVisibleCount] = useState(20);

  return (
    <div>
        <header>
          <title>S3TUDY | People To Follow</title>
        </header>

        <div className="min-h-screen bg-white px-10 py-6 w-[1400px] justify-center align-items-center mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[30px]">People to Follow</h1>
            <button onClick={() => router.back()} className="text-[#1E3A8A] ">
              <img src="/favicon.ico" alt="S3TUDY" className='w-[55px] h-[55px]' />
              <p className='-ml-[145px] -mt-[42px] hover:cursor-pointer text-[20px]'>← Back</p>
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full mt-10">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search people..."
                className="flex-1 outline-none text-lg w-full h-[40px]"
              />
              <span className="text-xl">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 16.5L11.5 11.5M13.1667 7.33333C13.1667 8.09938 13.0158 8.85792 12.7226 9.56565C12.4295 10.2734 11.9998 10.9164 11.4581 11.4581C10.9164 11.9998 10.2734 12.4295 9.56565 12.7226C8.85792 13.0158 8.09938 13.1667 7.33333 13.1667C6.56729 13.1667 5.80875 13.0158 5.10101 12.7226C4.39328 12.4295 3.75022 11.9998 3.20854 11.4581C2.66687 10.9164 2.23719 10.2734 1.94404 9.56565C1.65088 8.85792 1.5 8.09938 1.5 7.33333C1.5 5.78624 2.11458 4.30251 3.20854 3.20854C4.30251 2.11458 5.78624 1.5 7.33333 1.5C8.88043 1.5 10.3642 2.11458 11.4581 3.20854C12.5521 4.30251 13.1667 5.78624 13.1667 7.33333Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

           <div className="flex flex-col gap-5">
              {filtered.slice(0, visibleCount).map((person, index) => {
                const isStudent = person.roles.toLowerCase() === "student";
                const roleClass = isStudent
                  ? "text-[13px] text-[#2563EB] bg-[#DBEAFE] px-4 py-1 rounded-full"
                  : "text-[13px] text-white bg-[#8E44AD] px-4 py-1 rounded-full";

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between border rounded-lg p-4 shadow-sm hover:bg-gray-50"
                  >
                    <div className="flex-1 flex items-center gap-2">
                      <img
                        src={person.img}
                        alt={person.name}
                        className="w-14 h-14 rounded-full object-cover border-1"
                      />

                      <div>
                        <h2 className="font-semibold text-lg">{person.name.length >20 ? person.name.slice(0, 20) + '..' : person.name}</h2>
                        <p className="text-sm text-gray-600">
                          {person.course} • {person.year}
                        </p>
                      </div>

                      <div className="-mt-[25px] ml-4">
                        <span className={roleClass}>
                          {person.roles}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-8 mr-[400px]">
                      <div className="text-center">
                        <p className="font-semibold">{person.posts}</p>
                        <p className="text-[15px] text-gray-500">Posts</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{person.followers}</p>
                        <p className="text-[15px] text-gray-500">Followers</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{person.mutual}</p>                          
                        <p className="text-[15px] text-gray-500">Mutual</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFollow(index)}
                      className={`w-[100px] border rounded transition-all duration-200 ${
                        followed[index]
                          ? 'bg-blue-500 text-white border-blue-500 px-2 py-2'
                          : 'border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white px-2 py-2'
                          }`}
                        >
                      {followed[index] ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Load More People button */}
            {filtered.length > visibleCount && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setVisibleCount(prev => prev + 20)}
                  className="px-6 py-3 border-1 bg-[#2563EB] text-white border-blue-500 transition-all duration-200 rounded-[12px] hover:cursor-pointer"
                >
                  Load More People
                </button>
              </div>
            )}
        </div>
    </div>
  );
}





