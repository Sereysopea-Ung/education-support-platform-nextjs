'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const ContentPanel = () => {
  const item = {
    date: "23.FEB.2025",
    time: "11:30 AM",
    likes: 120,
    dislikes: 5,
    comments: 10,
  };

  // Initialize the active index for the carousel
  const [activeIndex, setActiveIndex] = React.useState(0);

  // List of images (for example purposes)
  const files = ([
    {

      file:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1KGDH_tjIH6w9ZfiiiNk3XeE3mvNEF6sMk-9uB6b--l-ulUz-RnjZ2mHLDEJN50C_0z1uZTV7HYCR0TLpdocgAtSPZBhFUTHmJdFFYemvMg",
    },
    {

      file:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSMlhIFCmwn7dOeFsAs7tl5zT98muqTzop--J0gGvD-sTu3ul6NenD72GNUbE7OxuPrTtT5RHg3NitifSmlTGY2uNoZMWfEKhy7ZG8zPI9g",
    },
    {

      file: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7jg-ZHMA4dGoj0poFFXBcDDMWN6o1QH9ulTku3oSYPSV50BVyo6-UtAWTWCXIHTBSBA8rwl_sqExgHIVVAJe9wc2f0MeGAtgFWAoK-R5laQ",
    }
  ]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % files.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + files.length) % files.length
    );
  };

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-2/3 bg-gray-50 p-4 h-screen overflow-hidden">
      {/* crossBack */}
      <div className='p-4 hover:cursor-pointer' onClick={handleBack}>
        <svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 1L1 11M1 1L11 11" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className = "w-[99%] h-[80%] mx-auto rounded-2xl flex items-center justify-center object-contain ">
        {files.length > 0 ?
          (
            <img
            className="w-full h-full object-cover mt-5 mx-auto rounded-[10px] hover:cursor-pointer"
            src={files[activeIndex].file}
            alt="Document"
            onClick={() => window.open(files[activeIndex].file, '_blank')}
            /> 
          ) :
          (
            <div className="w-full h-full mt-5 mx-auto rounded-2xl flex items-center justify-center object-contain bg-gray-200">
              No media uploaded
            </div>
          )
        }

          {files.length > 1 && ( 
            <div>
                {/* Left Arrow Button */}
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-[24px] transform -translate-y-1/2 p-3 text-white bg-opacity-20 rounded-full transition-all duration-300 ease-in-out focus:outline-none"
                >
                  <span className="w-12 h-12 bg-white flex items-center justify-center rounded-full hover:bg-gray-300 hover:cursor-pointer">
                    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.366211 8.11719C-0.12207 8.60547 -0.12207 9.39844 0.366211 9.88672L7.86621 17.3867C8.35449 17.875 9.14746 17.875 9.63574 17.3867C10.124 16.8984 10.124 16.1055 9.63574 15.6172L3.01855 9L9.63184 2.38281C10.1201 1.89453 10.1201 1.10156 9.63184 0.613281C9.14355 0.125 8.35059 0.125 7.86231 0.613281L0.362305 8.11328L0.366211 8.11719Z" fill="black"/>
                    </svg>
                  </span>
                </button>
      
                {/* Right Arrow Button */}
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-[650px] transform -translate-y-1/2 p-3 text-white bg-opacity-20 transition-all duration-300 ease-in-out rounded-full focus:outline-none"
                >
                  <span className="w-12 h-12 bg-white flex items-center justify-center rounded-full hover:bg-gray-300 hover:cursor-pointer">
                    <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.99121 8.11719C10.4795 8.60547 10.4795 9.39844 9.99121 9.88672L2.49121 17.3867C2.00293 17.875 1.20996 17.875 0.72168 17.3867C0.233398 16.8984 0.233398 16.1055 0.72168 15.6172L7.33887 9L0.725586 2.38281C0.237305 1.89453 0.237305 1.10156 0.725586 0.613281C1.21387 0.125 2.00684 0.125 2.49512 0.613281L9.99512 8.11328L9.99121 8.11719Z" fill="black"/>
                    </svg>
                  </span>
                </button>
              </div>
            )
          }
      </div>

      <div className="flex items-center mt-3 flex-row">
        <div className="w-full">
          <p className = "text-[18px] text-gray-500 ml-[510px] mt-6">{item.date} • {item.time}</p>
        </div>

        <div className="flex mt-[30px] space-x-4">
          {/* like */}
          <button className = "hover:cursor-pointer flex items-center space-x-2" onClick={() => console.log("like")}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 11L11 7M11 7L7 11M11 7V15M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className='mr-2 flex items-center'>{item.likes}</span>
          </button>

          {/* dislike */}
          <button className = "hover:cursor-pointer flex items-center space-x-2" onClick={() => console.log("dislike")}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 11L11 15M11 15L15 11M11 15V7M1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>{item.dislikes}</p>
          </button>

          {/* comment */}
          <button className = "hover:cursor-pointer flex items-center space-x-2 ml-2" onClick={() => console.log("comment")}>
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 10H5.51M10 10H10.01M14.5 10H14.51M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 11.1971 1.23374 12.3397 1.65806 13.3845C1.73927 13.5845 1.77988 13.6845 1.798 13.7653C1.81572 13.8443 1.8222 13.9028 1.82221 13.9839C1.82222 14.0667 1.80718 14.1569 1.77711 14.3374L1.18413 17.8952C1.12203 18.2678 1.09098 18.4541 1.14876 18.5888C1.19933 18.7067 1.29328 18.8007 1.41118 18.8512C1.54589 18.909 1.73218 18.878 2.10476 18.8159L5.66265 18.2229C5.84309 18.1928 5.9333 18.1778 6.01613 18.1778C6.09715 18.1778 6.15566 18.1843 6.23472 18.202C6.31554 18.2201 6.41552 18.2607 6.61549 18.3419C7.6603 18.7663 8.80286 19 10 19ZM6 10C6 10.2761 5.77614 10.5 5.5 10.5C5.22386 10.5 5 10.2761 5 10C5 9.72386 5.22386 9.5 5.5 9.5C5.77614 9.5 6 9.72386 6 10ZM10.5 10C10.5 10.2761 10.2761 10.5 10 10.5C9.72386 10.5 9.5 10.2761 9.5 10C9.5 9.72386 9.72386 9.5 10 9.5C10.2761 9.5 10.5 9.72386 10.5 10ZM15 10C15 10.2761 14.7761 10.5 14.5 10.5C14.2239 10.5 14 10.2761 14 10C14 9.72386 14.2239 9.5 14.5 9.5C14.7761 9.5 15 9.72386 15 10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
            <p>{item.comments}</p>
          </button>

        </div>

        <div className='flex mt-[30px] ml-30'>
          {/* favorite */}
          <button className = "hover:cursor-pointer" onClick={() => console.log("favorite")}>
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.2827 2.4533C10.5131 1.98637 10.6284 1.7529 10.7848 1.6783C10.9209 1.6134 11.0791 1.6134 11.2152 1.6783C11.3717 1.7529 11.4869 1.98637 11.7174 2.4533L13.9041 6.88327C13.9721 7.02112 14.0061 7.09005 14.0558 7.14356C14.0999 7.19095 14.1527 7.22934 14.2113 7.25661C14.2776 7.28741 14.3536 7.29853 14.5057 7.32076L19.397 8.03569C19.9121 8.11098 20.1696 8.14862 20.2888 8.27443C20.3925 8.38388 20.4412 8.53428 20.4215 8.68376C20.3988 8.85557 20.2124 9.03717 19.8395 9.40037L16.3014 12.8464C16.1912 12.9538 16.136 13.0075 16.1004 13.0715C16.0689 13.128 16.0487 13.1902 16.0409 13.2545C16.0321 13.3271 16.0451 13.403 16.0711 13.5547L16.906 18.4221C16.994 18.9355 17.038 19.1922 16.9553 19.3445C16.8833 19.477 16.7554 19.57 16.6071 19.5975C16.4366 19.6291 16.2061 19.5078 15.7451 19.2654L11.3724 16.9658C11.2361 16.8942 11.168 16.8583 11.0962 16.8443C11.0327 16.8318 10.9673 16.8318 10.9038 16.8443C10.832 16.8583 10.7639 16.8942 10.6277 16.9658L6.25492 19.2654C5.79392 19.5078 5.56341 19.6291 5.39297 19.5975C5.24468 19.57 5.11672 19.477 5.04474 19.3445C4.962 19.1922 5.00603 18.9355 5.09407 18.4221L5.92889 13.5547C5.95491 13.403 5.96793 13.3271 5.95912 13.2545C5.95132 13.1902 5.93111 13.128 5.89961 13.0715C5.86402 13.0075 5.80888 12.9538 5.69859 12.8464L2.16056 9.40037C1.78766 9.03717 1.60121 8.85557 1.57853 8.68376C1.55879 8.53428 1.60755 8.38388 1.71125 8.27443C1.83044 8.14862 2.08797 8.11098 2.60304 8.03569L7.49431 7.32076C7.64642 7.29853 7.72248 7.28741 7.78872 7.25661C7.84736 7.22934 7.90016 7.19095 7.94419 7.14356C7.99391 7.09005 8.02793 7.02112 8.09597 6.88327L10.2827 2.4533Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ContentPanel;
