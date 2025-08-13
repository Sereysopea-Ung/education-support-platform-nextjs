"use client";
import { useState , useEffect } from "react";
import { useRouter } from 'next/navigation';
import EventSection from "./eventSection";
import OppSection from "./opportunitySection";
import ProfileInfo from "./profile";
import NewsSection from "./newsSection";
import Content from "./content";
import CreatePost from "./createPost";
import UserDropdown from './UserDropdown';
import MyNetworkPage from '../mynetwork/page';


export default function HomePage() {
  // People
  var [accUser, setAccUser] = useState([
    {
      img: "/default_avatar.svg",
      name: "Celine Celine",
      course: "Computer Science",
      year: "Year 3",
    },
    {
      img: "/default_avatar.svg",
      name: "Ao Ruping",
      course: "Computer Science",
      year: "Year 3",
    },
    {
      img: "/default_avatar.svg",
      name: "Ariana Grande",
      course: "Computer Science",
      year: "Year 3",
    },
    {
      img: "/default_avatar.svg",
      name: "Ao Ruping",
      course: "Computer Science",
      year: "Year 3",
    },
    {
      img: "/default_avatar.svg",
      name: "Ariana Grande",
      course: "Computer Science",
      year: "Year 3",
    },
    {
      img: "/default_avatar.svg",
      name: "Ao Ruping",
      course: "Computer Science",
      year: "Year 3",
    },
    {
      img: "/default_avatar.svg",
      name: "Ariana Grande",
      course: "Computer Science",
      year: "Year 3",
    },
    {
      img: "/default_avatar.svg",
      name: "Ao Ruping",
      course: "Computer Science",
      year: "Year 3",
    },
    {
      img: "/default_avatar.svg",
      name: "Ariana Grande",
      course: "Computer Science",
      year: "Year 3",
    },
  ]);

  // Opportunity
  var [opportuniy, setOpportuniy] = useState([
    {
      type: "Software Engineer Intern",
      pos: "CEO",
    },
    {
      type: "Step Scholarship 2025",
      pos: "Full tuition Coverage",
    },
    {
      type: "Software Engineer Intern",
      pos: "CEO",
    },
    {
      type: "Step Scholarship 2025",
      pos: "Full tuition Coverage",
    },
    {
      type: "Step Scholarship 2025",
      pos: "Full tuition Coverage",
    },
    {
      type: "Software Engineer Intern",
      pos: "CEO",
    },
    {
      type: "Step Scholarship 2025",
      pos: "Full tuition Coverage",
    },
    {
      type: "Step Scholarship 2025",
      pos: "Full tuition Coverage",
    },
    {
      type: "Software Engineer Intern",
      pos: "CEO",
    },
    {
      type: "Step Scholarship 2025",
      pos: "Full tuition Coverage",
    },
  ]);

  // News
  var [news, setNews] = useState([
    {
      uni: "Royal University of Phnom Penh",
      des: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញជ្រើសរើស និស្សិតស្ម័គ្រចិត្តក្នុងកម្មវិធីសង្រ្កាន RUPP។",
      img: "https://upload.wikimedia.org/wikipedia/en/a/a2/RUPP_logo.PNG",
      date: "11.feb.2025",
      time: "11.11PM",
      read: "264",
    },
    {
      uni: "Royal University of Phnom Penh",
      des: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញជ្រើសរើស និស្សិតស្ម័គ្រចិត្តក្នុងកម្មវិធីសង្រ្កាន RUPP។",
      img: "https://upload.wikimedia.org/wikipedia/en/a/a2/RUPP_logo.PNG",
      date: "11.feb.2025",
      time: "11.11PM",
      read: "264",
    },
    {
      uni: "Royal University of Phnom Penh",
      des: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញជ្រើសរើស និស្សិតស្ម័គ្រចិត្តក្នុងកម្មវិធីសង្រ្កាន RUPP។",
      img: "https://upload.wikimedia.org/wikipedia/en/a/a2/RUPP_logo.PNG",
      date: "11.feb.2025",
      time: "11.11PM",
      read: "264",
    },
    {
      uni: "Royal University of Phnom Penh",
      des: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញជ្រើសរើស និស្សិតស្ម័គ្រចិត្តក្នុងកម្មវិធីសង្រ្កាន RUPP។",
      img: "https://upload.wikimedia.org/wikipedia/en/a/a2/RUPP_logo.PNG",
      date: "11.feb.2025",
      time: "11.11PM",
      read: "264",
    },
    {
      uni: "Royal University of Phnom Penh",
      des: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញជ្រើសរើស និស្សិតស្ម័គ្រចិត្តក្នុងកម្មវិធីសង្រ្កាន RUPP។",
      img: "https://upload.wikimedia.org/wikipedia/en/a/a2/RUPP_logo.PNG",
      date: "11.feb.2025",
      time: "11.11PM",
      read: "264",
    },
    {
      uni: "Royal University of Phnom Penh",
      des: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញជ្រើសរើស និស្សិតស្ម័គ្រចិត្តក្នុងកម្មវិធីសង្រ្កាន RUPP។",
      img: "https://upload.wikimedia.org/wikipedia/en/a/a2/RUPP_logo.PNG",
      date: "11.feb.2025",
      time: "11.11PM",
      read: "264",
    },
    {
      uni: "Royal University of Phnom Penh",
      des: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញជ្រើសរើស និស្សិតស្ម័គ្រចិត្តក្នុងកម្មវិធីសង្រ្កាន RUPP។",
      img: "https://upload.wikimedia.org/wikipedia/en/a/a2/RUPP_logo.PNG",
      date: "11.feb.2025",
      time: "11.11PM",
      read: "264",
    },
  ]);

  // Content
  var [content, setContent] = useState([
    {
      name : "Celine Celine",
      img : "/default_avatar.svg",
      year : "Year 3",
      role : "Student",
      type : "Q&A",
      file: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1KGDH_tjIH6w9ZfiiiNk3XeE3mvNEF6sMk-9uB6b--l-ulUz-RnjZ2mHLDEJN50C_0z1uZTV7HYCR0TLpdocgAtSPZBhFUTHmJdFFYemvMg",
      caption : "វិញ្ញាសាគណិតវិទ្យាទម្រង់ QCM ត្រៀមប្រឡងគ្រូអនុ(គណិត) បឋម 12+4 និង មត្តេយ្យភាគទី1 (50 លំហាត់) វិញ្ញាសាគណិតវិទ្យាទម្រង់ QCM ត្រៀមប្រឡងគ្រូអនុ(គណិត) បឋម 12+4 និង មត្តេយ្យភាគទី1 (50 លំហាត់) វិញ្ញាសាគណិតវិទ្យាទម្រង់ QCM ត្រៀមប្រឡងគ្រូអនុ(គណិត) បឋម 12+4 និង មត្តេយ្យភាគទី1 (50 លំហាត់) វិញ្ញាសាគណិតវិទ្យាទម្រង់ QCM ត្រៀមប្រឡងគ្រូអនុ(គណិត) បឋម 12+4 និង មត្តេយ្យភាគទី1 (50 លំហាត់)",
      time : "11.11PM",
      date : "11.feb.2025",
      like : "264",
      unlike : "4",
      comment : "256",
    },
    {
      name : "Celine Celine",
      img : "/default_avatar.svg",
      year : "Year 3",
      role : "professor",
      type : "Lessons",
      file : "https://i0.wp.com/calmatters.org/wp-content/uploads/2021/08/math-curriculum.jpg?fit=1200%2C900&ssl=1",
      caption : "Here's my solution to the algorithm problem we discussed in class...",
      time : "11.11PM",
      date : "11.feb.2025",
      like : "264",
      unlike : "4",
      comment : "264",
    },
    {
      name : "Celine Celine",
      img : "/default_avatar.svg",
      year : "Year 3",
      role : "Student",
      type : "Q&A",
      file : "https://previews.123rf.com/images/blueringmedia/blueringmedia1703/blueringmedia170300245/74310733-kids-with-numbers-and-mathematics-sign-illustration.jpg",
      caption : "វិញ្ញាសាគណិតវិទ្យាទម្រង់ QCM ត្រៀមប្រឡងគ្រូអនុ(គណិត) បឋម 12+4 និង មត្តេយ្យភាគទី1 (50 លំហាត់)",
      time : "11.11PM",
      date : "11.feb.2025",
      like : "264",
      unlike : "4",
      comment : "264",
    },
    {
      name : "Celine Celine",
      img : "/default_avatar.svg",
      year : "Year 3",
      role : "Student",
      type : "Q&A",
      file : "data:image/png;base64,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",
      caption : "Here's my solution to the algorithm problem we discussed in class...",
      time : "11.11PM",
      date : "11.feb.2025",
      like : "264",
      unlike : "4",
      comment : "264",
    },
    {
      name : "Celine Celine",
      img : "/default_avatar.svg",
      year : "Year 3",
      role : "professor",
      type : "Lessons",
      file : "",
      caption : "Here's my solution to the algorithm problem we discussed in class...",
      time : "11.11PM",
      date : "11.feb.2025",
      like : "264",
      unlike : "4",
      comment : "264",
    }
  ])

  // CreatePost img
  var [createPost,setCreatePost] = useState([
    {
      name : "Celine Celine",
      img : "/default_avatar.svg",
    }
  ])

  // User DropDown
  var DropdownAcc = ([
    {
      name : "Celine Celine",
      img : "/default_avatar.svg",
      email : "bun.seavlang.2823@rupp.edu.kh"
    }
  ])


  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const router = useRouter();
  const handleClickedMyNetwork = () => {
    router.push('/mynetwork');
  };

  const [activeMenu, setActiveMenu] = useState("Homepage");
  
  // Tab state for mid-sidebar
  const [activeTab, setActiveTab] = useState("NewsFeed");

  // Filtered content for mid-sidebar
  function getFilteredContent(tab) {
    if (tab === "Q&A") return content.filter(item => item.type === "Q&A");
    if (tab === "Lessons") return content.filter(item => item.type === "Lessons");
    return content; 
  }

  useEffect(() => {
    if (activeTab === "Network") {
      router.push("/mynetwork");
    }
  }, [activeTab, router]);

  return (
    <section>
      <header>
        <title>S3TUDY | Home Page</title>
      </header>
      
        <section>
          <div className="flex flex-12 h-full">
            {/* left-sidebar */}
            <div className="overflow-hidden flex flex-3 fixed top-0 left-0 h-full z-10 w-[435px]">
              <div className="position-absolute w-full bg-gray-100">
                <div className="bg-white h-25">
                  {/* logo  */}
                  <div className="position-absolute">
                    <div className="position-absolute p-3 flex ml-2 w-full">
                      <img src="/favicon.ico" alt="Logo" className="w-20 h-20" />
                      <p className="position-absolute text-[30px] text-[#0092C6] font-radiocanada mt-1 ml-2">S3TUDY</p>
                    </div>
                  </div>
                </div>

                <div className="position-absolute w-full -mt-[60px] rounded-t-2xl shadow-2xs bg-white h-full">
                  {/* profile Info */}
                  <ProfileInfo
                    items={accUser[0]}
                    propertyNames={{
                      label: "name",
                      course: "course",
                      year: "year",
                    }}
                  />

                  {/* menu */}
                  <ul className="flex flex-col gap-y-4 mt-18 ml-5">
                    <li className={`p-2 hover:cursor-pointer ${activeMenu === "Homepage" ? "bg-blue-600 px-2 py-4 text-white rounded-[10px]" : ""}`}>
                      <span className="flex items-center gap-x-5" onClick={() => setActiveMenu("Homepage")}>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.6667 6.3334L11.6667 2.16923C11.2084 1.77977 10.615 1.56445 10.0001 1.56445C9.38514 1.56445 8.79176 1.77977 8.33341 2.16923L3.33341 6.3334C3.06872 6.55829 2.8575 6.83417 2.71381 7.14268C2.57012 7.45118 2.49726 7.78522 2.50008 8.12257V15.0417C2.50008 15.6716 2.76347 16.2757 3.23231 16.7211C3.70115 17.1665 4.33704 17.4167 5.00008 17.4167H15.0001C15.6631 17.4167 16.299 17.1665 16.7678 16.7211C17.2367 16.2757 17.5001 15.6716 17.5001 15.0417V8.11465C17.5017 7.77864 17.4283 7.44612 17.2846 7.13906C17.141 6.83201 16.9304 6.55741 16.6667 6.3334ZM11.6667 15.8334H8.33341V11.8751C8.33341 11.6651 8.42121 11.4637 8.57749 11.3153C8.73377 11.1668 8.94573 11.0834 9.16675 11.0834H10.8334C11.0544 11.0834 11.2664 11.1668 11.4227 11.3153C11.5789 11.4637 11.6667 11.6651 11.6667 11.8751V15.8334ZM15.8334 15.0417C15.8334 15.2517 15.7456 15.4531 15.5893 15.6015C15.4331 15.75 15.2211 15.8334 15.0001 15.8334H13.3334V11.8751C13.3334 11.2452 13.07 10.6411 12.6012 10.1957C12.1323 9.75029 11.4965 9.50007 10.8334 9.50007H9.16675C8.5037 9.50007 7.86782 9.75029 7.39898 10.1957C6.93014 10.6411 6.66675 11.2452 6.66675 11.8751V15.8334H5.00008C4.77907 15.8334 4.5671 15.75 4.41082 15.6015C4.25454 15.4531 4.16675 15.2517 4.16675 15.0417V8.11465C4.1669 8.00224 4.19224 7.89116 4.24109 7.78878C4.28995 7.68641 4.36119 7.59509 4.45008 7.5209L9.45008 3.36465C9.60215 3.23773 9.79766 3.16773 10.0001 3.16773C10.2025 3.16773 10.398 3.23773 10.5501 3.36465L15.5501 7.5209C15.639 7.59509 15.7102 7.68641 15.7591 7.78878C15.8079 7.89116 15.8333 8.00224 15.8334 8.11465V15.0417Z"
                            fill="#565D6C"
                          />
                        </svg>
                        Home
                      </span>
                    </li>

                    <li className="p-2 hover:cursor-pointer" onClick={handleClickedMyNetwork}>
                      <span className="flex items-center gap-x-5">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.6197 9.5C11.6553 9.5 12.4947 10.2975 12.4947 11.2812L12.4938 12.1699C12.6223 14.3508 10.8542 15.4385 7.57524 15.4385C4.3069 15.4385 2.5 14.3651 2.5 12.2011V11.2812C2.5 10.2975 3.33947 9.5 4.375 9.5H10.6197ZM15.6205 9.5C16.656 9.5 17.4955 10.2975 17.4955 11.2812L17.4945 11.9066C17.6076 13.8629 16.0452 14.8438 13.1895 14.8438C12.8018 14.8438 12.4374 14.8258 12.0971 14.7899C12.4604 14.4724 12.731 14.0934 12.9035 13.6531L13.1895 13.6562C15.4198 13.6562 16.3114 13.0965 16.2455 11.9391V11.2812C16.2455 10.9533 15.9657 10.6875 15.6205 10.6875L13.041 10.6875C12.9144 10.2204 12.6421 9.80897 12.2728 9.49951L15.6205 9.5ZM10.6197 10.6875H4.375C4.02982 10.6875 3.75 10.9533 3.75 11.2812V12.2011C3.75 13.5619 4.90993 14.251 7.57524 14.251C10.23 14.251 11.3248 13.5775 11.2447 12.2031V11.2812C11.2447 10.9533 10.9649 10.6875 10.6197 10.6875ZM7.5 2.375C9.22617 2.375 10.6255 3.70437 10.6255 5.34423C10.6255 6.98409 9.22617 8.31346 7.5 8.31346C5.77383 8.31346 4.37449 6.98409 4.37449 5.34423C4.37449 3.70437 5.77383 2.375 7.5 2.375ZM13.75 3.5625C15.1307 3.5625 16.25 4.62582 16.25 5.9375C16.25 7.24918 15.1307 8.3125 13.75 8.3125C12.3693 8.3125 11.25 7.24918 11.25 5.9375C11.25 4.62582 12.3693 3.5625 13.75 3.5625ZM7.5 3.5625C6.46419 3.5625 5.62449 4.36021 5.62449 5.34423C5.62449 6.32825 6.46419 7.12596 7.5 7.12596C8.53581 7.12596 9.37551 6.32825 9.37551 5.34423C9.37551 4.36021 8.53581 3.5625 7.5 3.5625ZM13.75 4.75C13.0596 4.75 12.5 5.28166 12.5 5.9375C12.5 6.59334 13.0596 7.125 13.75 7.125C14.4404 7.125 15 6.59334 15 5.9375C15 5.28166 14.4404 4.75 13.75 4.75Z"
                            fill="#565D6C"
                          />
                        </svg>
                        My Network
                      </span>
                    </li>

                    <li className="p-2">
                      <span className="flex items-center gap-x-5 hover:cursor-pointer" onClick={() => router.push("/collection")}>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.857 17.1656H3.14453C2.97877 17.1656 2.8198 17.0998 2.70259 16.9826C2.58538 16.8654 2.51953 16.7064 2.51953 16.5406V9.5625C2.51953 9.39674 2.58538 9.23777 2.70259 9.12056C2.8198 9.00335 2.97877 8.9375 3.14453 8.9375H16.857C17.0228 8.9375 17.1818 9.00335 17.299 9.12056C17.4162 9.23777 17.482 9.39674 17.482 9.5625V16.5406C17.482 16.7064 17.4162 16.8654 17.299 16.9826C17.1818 17.0998 17.0228 17.1656 16.857 17.1656ZM3.76953 15.9156H16.232V10.1875H3.76953V15.9156Z"
                            fill="#565D6C"
                          />
                          <path
                            d="M15.607 10.1874H4.39453C4.22877 10.1874 4.0698 10.1216 3.95259 10.0043C3.83538 9.88713 3.76953 9.72816 3.76953 9.5624V6.19678C3.76953 6.03102 3.83538 5.87205 3.95259 5.75484C4.0698 5.63763 4.22877 5.57178 4.39453 5.57178H15.607C15.7728 5.57178 15.9318 5.63763 16.049 5.75484C16.1662 5.87205 16.232 6.03102 16.232 6.19678V9.5624C16.232 9.72816 16.1662 9.88713 16.049 10.0043C15.9318 10.1216 15.7728 10.1874 15.607 10.1874ZM5.01953 8.9374H14.982V6.82178H5.01953V8.9374Z"
                            fill="#565D6C"
                          />
                          <path
                            d="M14.25 6.82192H5.75C5.58424 6.82192 5.42527 6.75608 5.30806 6.63887C5.19085 6.52166 5.125 6.36268 5.125 6.19692V3.4563C5.125 3.29054 5.19085 3.13157 5.30806 3.01436C5.42527 2.89715 5.58424 2.8313 5.75 2.8313H14.25C14.4158 2.8313 14.5747 2.89715 14.6919 3.01436C14.8092 3.13157 14.875 3.29054 14.875 3.4563V6.19692C14.875 6.36268 14.8092 6.52166 14.6919 6.63887C14.5747 6.75608 14.4158 6.82192 14.25 6.82192ZM6.375 5.57192H13.625V4.0813H6.375V5.57192Z"
                            fill="#565D6C"
                          />
                        </svg>
                        Collection
                      </span>
                    </li>

                    <li className="p-2 hover:cursor-pointer">
                      <span className="flex items-center gap-x-5 ml-1" onClick={() => router.push("/opportunity")}>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.12195 0C7.40317 7.73577e-05 6.71089 0.256331 6.18348 0.717547C5.65606 1.17876 5.33236 1.81097 5.27707 2.4878H5.01717C4.22341 2.4878 3.58332 2.4878 3.06615 2.53176C2.53405 2.57737 2.06868 2.67439 1.64634 2.90493C1.14573 3.17768 0.729945 3.57008 0.440781 4.04268C0.197561 4.44156 0.0948292 4.88107 0.0465366 5.38361C-2.23517e-08 5.87205 0 6.47658 0 7.22624V7.28595C0 8.03561 -2.23517e-08 8.64015 0.0465366 9.12859C0.0948292 9.63112 0.197561 10.0706 0.441659 10.4695C0.663805 10.8344 0.962341 11.1512 1.31707 11.4024V11.448C1.31707 12.5817 1.31707 13.4963 1.4198 14.2153C1.52517 14.9617 1.75346 15.5902 2.28117 16.0895C2.80976 16.5887 3.47532 16.8026 4.26556 16.9038C5.02683 17 5.99532 17 7.19561 17H10.8044C12.0047 17 12.9732 17 13.7344 16.9038C14.5247 16.8026 15.1902 16.5887 15.7188 16.0895C16.2474 15.5902 16.474 14.9617 16.5811 14.2153C16.6829 13.4963 16.6829 12.5817 16.6829 11.448V11.4024C17.0387 11.1505 17.3368 10.8332 17.5592 10.4695C17.8024 10.0706 17.9052 9.63112 17.9535 9.12859C18 8.64015 18 8.03561 18 7.28595V7.22624C18 6.47658 18 5.87205 17.9535 5.38361C17.9052 4.88107 17.8024 4.44156 17.5583 4.04268C17.2695 3.56988 16.8541 3.1772 16.3537 2.9041C15.9313 2.67439 15.466 2.57737 14.9339 2.53176C14.4167 2.4878 13.7766 2.4878 12.9828 2.4878H12.7229C12.6676 1.81097 12.3439 1.17876 11.8165 0.717547C11.2891 0.256331 10.5968 7.73577e-05 9.87805 0H8.12195ZM8.12195 1.2439C7.75246 1.24391 7.39535 1.36966 7.11605 1.59812C6.83674 1.82657 6.65395 2.14242 6.60117 2.4878H11.3988C11.346 2.14242 11.1633 1.82657 10.884 1.59812C10.6046 1.36966 10.2475 1.24391 9.87805 1.2439H8.12195ZM2.72459 14.0495C2.64907 13.5196 2.63678 12.8437 2.63415 11.9282C2.77376 11.9506 2.91776 11.9672 3.06615 11.9804C3.58332 12.0244 4.22341 12.0244 5.01717 12.0244H6.67668C6.82019 12.502 7.12473 12.9223 7.5441 13.2216C7.96348 13.521 8.47478 13.6829 9.00044 13.6829C9.52609 13.6829 10.0374 13.521 10.4568 13.2216C10.8761 12.9223 11.1807 12.502 11.3242 12.0244H12.9828C13.7766 12.0244 14.4167 12.0244 14.9339 11.9804C15.0831 11.9672 15.2262 11.9506 15.3659 11.9282C15.3632 12.8437 15.3509 13.5196 15.2754 14.0495C15.1885 14.6581 15.0296 14.9799 14.7872 15.2096C14.544 15.4393 14.2033 15.5886 13.558 15.6707C12.895 15.7544 12.0161 15.7561 10.7561 15.7561H7.2439C5.9839 15.7561 5.1041 15.7544 4.44117 15.6707C3.79668 15.5886 3.456 15.4385 3.21278 15.2096C2.96956 14.9799 2.81151 14.659 2.72459 14.0495ZM11.3242 10.7805H12.9512C13.7836 10.7805 14.3649 10.7805 14.8144 10.7415C15.2561 10.7034 15.5063 10.6337 15.6951 10.5309C15.9954 10.3667 16.2448 10.1312 16.4186 9.84756C16.5275 9.66927 16.6013 9.43293 16.6417 9.0158C16.682 8.59122 16.6829 8.04224 16.6829 7.2561C16.6829 6.46995 16.6829 5.92098 16.6417 5.49639C16.6013 5.07927 16.5275 4.84293 16.4186 4.66463C16.2452 4.38081 15.9956 4.14513 15.6951 3.98132C15.5063 3.87849 15.2561 3.80883 14.8144 3.77068C14.3649 3.73254 13.7836 3.73171 12.9512 3.73171H5.04878C4.21639 3.73171 3.63512 3.73171 3.18556 3.77068C2.7439 3.80883 2.49366 3.87849 2.30488 3.98132C2.00436 4.14513 1.75482 4.38081 1.58137 4.66463C1.47249 4.84293 1.39873 5.07927 1.35834 5.49639C1.31795 5.92098 1.31707 6.46995 1.31707 7.2561C1.31707 8.04224 1.31707 8.59122 1.35834 9.0158C1.39873 9.4321 1.47249 9.66927 1.58137 9.84756C1.75522 10.1312 2.00459 10.3667 2.30488 10.5309C2.49366 10.6337 2.7439 10.7034 3.18556 10.7415C3.63512 10.7797 4.21639 10.7805 5.04878 10.7805H6.67668C6.82019 10.3029 7.12473 9.88255 7.5441 9.58323C7.96348 9.28392 8.47478 9.12197 9.00044 9.12197C9.52609 9.12197 10.0374 9.28392 10.4568 9.58323C10.8761 9.88255 11.1807 10.3029 11.3242 10.7805ZM7.90244 11.4024C7.90244 11.1275 8.01807 10.8639 8.22391 10.6695C8.42974 10.4751 8.70891 10.3659 9 10.3659C9.29109 10.3659 9.57026 10.4751 9.77609 10.6695C9.98193 10.8639 10.0976 11.1275 10.0976 11.4024C10.0976 11.6774 9.98193 11.941 9.77609 12.1354C9.57026 12.3298 9.29109 12.439 9 12.439C8.70891 12.439 8.42974 12.3298 8.22391 12.1354C8.01807 11.941 7.90244 11.6774 7.90244 11.4024Z"
                            fill="#565D6C"
                          />
                        </svg>
                        Opportunity
                      </span>
                    </li>

                    <li className="p-2 hover:cursor-pointer">
                      <span className="flex items-center gap-x-5 ml-1" onClick={() => router.push("/news")}>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 18 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1743_82)">
                            <path
                              d="M0.630859 0H15.2925V3.1968H0.630859V0ZM0.630859 4.7968H15.2925V16H1.29063C0.994957 16 0.630859 15.5456 0.630859 15.1744V4.7968ZM1.85266 6.3872V14.4H7.96169V6.3872H1.85266ZM9.18349 6.4V8H14.0707V6.4H9.18349ZM3.07447 7.9872H6.73988V12.8H3.07447V7.9872ZM16.5143 8H17.7361V15.4C17.7361 15.6784 17.5113 16 17.1252 16C16.7391 16 16.5143 15.68 16.5143 15.4V12.8192V8ZM9.18349 9.6V11.2H14.0707V9.6H9.18349ZM9.18349 12.8V14.4H14.0707V12.8H9.18349Z"
                              fill="#565D6C"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1743_82">
                              <rect width="18" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        News
                      </span>
                    </li>

                    <li className="p-2 hover:cursor-pointer">
                      <span className="flex items-center gap-x-5 ml-1">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1665_277)">
                            <path
                              d="M11.375 5.6875C11.375 6.94258 10.9676 8.10195 10.2812 9.04258L13.743 12.507C14.0848 12.8488 14.0848 13.4039 13.743 13.7457C13.4012 14.0875 12.8461 14.0875 12.5043 13.7457L9.04258 10.2812C8.10195 10.9703 6.94258 11.375 5.6875 11.375C2.5457 11.375 0 8.8293 0 5.6875C0 2.5457 2.5457 0 5.6875 0C8.8293 0 11.375 2.5457 11.375 5.6875ZM5.6875 9.625C6.20458 9.625 6.7166 9.52315 7.19432 9.32528C7.67204 9.1274 8.1061 8.83736 8.47173 8.47173C8.83736 8.1061 9.1274 7.67204 9.32528 7.19432C9.52315 6.7166 9.625 6.20458 9.625 5.6875C9.625 5.17042 9.52315 4.6584 9.32528 4.18068C9.1274 3.70296 8.83736 3.2689 8.47173 2.90327C8.1061 2.53764 7.67204 2.2476 7.19432 2.04972C6.7166 1.85185 6.20458 1.75 5.6875 1.75C5.17042 1.75 4.6584 1.85185 4.18068 2.04972C3.70296 2.2476 3.2689 2.53764 2.90327 2.90327C2.53764 3.2689 2.2476 3.70296 2.04972 4.18068C1.85185 4.6584 1.75 5.17042 1.75 5.6875C1.75 6.20458 1.85185 6.7166 2.04972 7.19432C2.2476 7.67204 2.53764 8.1061 2.90327 8.47173C3.2689 8.83736 3.70296 9.1274 4.18068 9.32528C4.6584 9.52315 5.17042 9.625 5.6875 9.625Z"
                              fill="#565D6C"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1665_277">
                              <path d="M0 0H14V14H0V0Z" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Searching
                      </span>
                    </li>

                    <li className="p-2 hover:cursor-pointer">
                      <span className="flex items-center gap-x-5">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.32 9.55L19.43 8.92L20.32 7.14C20.4102 6.95369 20.4404 6.74397 20.4064 6.53978C20.3723 6.33558 20.2758 6.14699 20.13 6L18 3.87C17.8522 3.72209 17.6618 3.62421 17.4555 3.59013C17.2493 3.55605 17.0375 3.58748 16.85 3.68L15.07 4.57L14.44 2.68C14.3735 2.483 14.2472 2.31163 14.0787 2.18975C13.9102 2.06787 13.7079 2.00155 13.5 2H10.5C10.2904 1.99946 10.0858 2.06482 9.91537 2.18685C9.7449 2.30887 9.61709 2.48138 9.55 2.68L8.92 4.57L7.14 3.68C6.95369 3.58978 6.74397 3.55961 6.53978 3.59364C6.33558 3.62767 6.14699 3.72423 6 3.87L3.87 6C3.72209 6.14777 3.62421 6.33818 3.59013 6.54446C3.55605 6.75074 3.58748 6.96251 3.68 7.15L4.57 8.93L2.68 9.56C2.483 9.62654 2.31163 9.75283 2.18975 9.92131C2.06787 10.0898 2.00155 10.2921 2 10.5V13.5C1.99946 13.7096 2.06482 13.9142 2.18685 14.0846C2.30887 14.2551 2.48138 14.3829 2.68 14.45L4.57 15.08L3.68 16.86C3.58978 17.0463 3.55961 17.256 3.59364 17.4602C3.62767 17.6644 3.72423 17.853 3.87 18L6 20.13C6.14777 20.2779 6.33818 20.3758 6.54446 20.4099C6.75074 20.444 6.96251 20.4125 7.15 20.32L8.93 19.43L9.56 21.32C9.62709 21.5186 9.7549 21.6911 9.92537 21.8132C10.0958 21.9352 10.3004 22.0005 10.51 22H13.51C13.7196 22.0005 13.9242 21.9352 14.0946 21.8132C14.2651 21.6911 14.3929 21.5186 14.46 21.32L15.09 19.43L16.87 20.32C17.0551 20.4079 17.2628 20.4369 17.4649 20.4029C17.667 20.3689 17.8538 20.2737 18 20.13L20.13 18C20.2779 17.8522 20.3758 17.6618 20.4099 17.4555C20.444 17.2493 20.4125 17.0375 20.32 16.85L19.43 15.07L21.32 14.44C21.517 14.3735 21.6884 14.2472 21.8103 14.0787C21.9321 13.9102 21.9985 13.7079 22 13.5V10.5C22.0005 10.2904 21.9352 10.0858 21.8132 9.91537C21.6911 9.7449 21.5186 9.61709 21.32 9.55ZM20 12.78L18.8 13.18C18.5241 13.2695 18.2709 13.418 18.0581 13.6151C17.8452 13.8122 17.6778 14.0533 17.5675 14.3216C17.4571 14.5899 17.4064 14.879 17.419 15.1688C17.4315 15.4586 17.5069 15.7422 17.64 16L18.21 17.14L17.11 18.24L16 17.64C15.7436 17.5122 15.4627 17.4411 15.1763 17.4313C14.89 17.4215 14.6049 17.4734 14.3403 17.5834C14.0758 17.6934 13.8379 17.8589 13.6429 18.0688C13.4479 18.2787 13.3003 18.5281 13.21 18.8L12.81 20H11.22L10.82 18.8C10.7305 18.5241 10.582 18.2709 10.3849 18.0581C10.1878 17.8452 9.94671 17.6778 9.67842 17.5675C9.41014 17.4571 9.12105 17.4064 8.83123 17.419C8.5414 17.4315 8.25777 17.5069 8 17.64L6.86 18.21L5.76 17.11L6.36 16C6.4931 15.7422 6.56852 15.4586 6.58105 15.1688C6.59358 14.879 6.5429 14.5899 6.43254 14.3216C6.32218 14.0533 6.15478 13.8122 5.94195 13.6151C5.72912 13.418 5.47595 13.2695 5.2 13.18L4 12.78V11.22L5.2 10.82C5.47595 10.7305 5.72912 10.582 5.94195 10.3849C6.15478 10.1878 6.32218 9.94671 6.43254 9.67842C6.5429 9.41014 6.59358 9.12105 6.58105 8.83123C6.56852 8.5414 6.4931 8.25777 6.36 8L5.79 6.89L6.89 5.79L8 6.36C8.25777 6.4931 8.5414 6.56852 8.83123 6.58105C9.12105 6.59358 9.41014 6.5429 9.67842 6.43254C9.94671 6.32218 10.1878 6.15478 10.3849 5.94195C10.582 5.72912 10.7305 5.47595 10.82 5.2L11.22 4H12.78L13.18 5.2C13.2695 5.47595 13.418 5.72912 13.6151 5.94195C13.8122 6.15478 14.0533 6.32218 14.3216 6.43254C14.5899 6.5429 14.879 6.59358 15.1688 6.58105C15.4586 6.56852 15.7422 6.4931 16 6.36L17.14 5.79L18.24 6.89L17.64 8C17.5122 8.25645 17.4411 8.53735 17.4313 8.82369C17.4215 9.11003 17.4734 9.39513 17.5834 9.65969C17.6934 9.92424 17.8589 10.1621 18.0688 10.3571C18.2787 10.5521 18.5281 10.6997 18.8 10.79L20 11.19V12.78ZM12 8C11.2089 8 10.4355 8.2346 9.77772 8.67413C9.11993 9.11365 8.60724 9.73836 8.30448 10.4693C8.00173 11.2002 7.92252 12.0044 8.07686 12.7804C8.2312 13.5563 8.61217 14.269 9.17158 14.8284C9.73099 15.3878 10.4437 15.7688 11.2196 15.9231C11.9956 16.0775 12.7998 15.9983 13.5307 15.6955C14.2616 15.3928 14.8864 14.8801 15.3259 14.2223C15.7654 13.5645 16 12.7911 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17158C14.0783 8.42143 13.0609 8 12 8ZM12 14C11.6044 14 11.2178 13.8827 10.8889 13.6629C10.56 13.4432 10.3036 13.1308 10.1522 12.7654C10.0009 12.3999 9.96126 11.9978 10.0384 11.6098C10.1156 11.2219 10.3061 10.8655 10.5858 10.5858C10.8655 10.3061 11.2219 10.1156 11.6098 10.0384C11.9978 9.96126 12.3999 10.0009 12.7654 10.1522C13.1308 10.3036 13.4432 10.56 13.6629 10.8889C13.8827 11.2178 14 11.6044 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14Z"
                            fill="#565D6C"
                          />
                        </svg>
                        Setting
                      </span>
                    </li>
                  </ul>

                </div>
              </div>
            </div>

            {/* mid-sidebar*/}
            <div className="flex flex-6 flex-col bg-gray-100 overflow-hidden ml-[435px] mr-[464px]">
              {/* Nav bar */}
              <div className="flex flex-row gap-x-10 h-25 pl-5 bg-white fixed w-full">
                {['NewsFeed', 'Q&A', 'Lessons', 'Network'].map(tab => (
                  
                  <p
                    key={tab}
                    className={[
                      "noborder solid rounded-[12px] px-5 py-2 text-[22px] mt-6 mb-5 cursor-pointer text-center",
                      activeTab === tab ? "bg-blue-600 text-white" : "hover:bg-blue-600 hover:text-white"
                    ].join(" ")}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </p>
                  
                ))}
              </div>



              <div className="mt-[100px]"/>
              <div className="ml-2">
                {/* Create Post */}
                {createPost.map((item, index)=> (
                  <CreatePost 
                    key ={index}
                    items={item}
                  />
                ))}
                
                {/* content */}
                <>
                  {getFilteredContent(activeTab).map((item, index) => (
                    <Content 
                      key={index}
                      items={item}
                    />
                  ))}
                </>
              </div>
            </div>

            {/* Right-sidebar */}
            <div className="flex flex-col bg-gray-100 fixed top-0 right-0 z-10 w-[464px] h-full">
              <div className="bg-white h-25">
                {/* navbar */}
                <div className="h-10 w-full mt-8">
                  <div className="">
                    {/* input */}
                    <input
                      placeholder="Searching..."
                      className="absolute ml-1 border-1 border-transparent w-[15em] h-[2.5em] pl-[0.8em] outline-1 overflow-hidden bg-[#ffffff] rounded-[10px] transition-all duration-500 hover:border-[#7e8387] focus:border-[#7e8387] hover:shadow-[0_0_0_2px_rgba(74,157,236,0.2)] focus:shadow-[0_0_0_2px_rgba(74,157,236,0.2)] hover:bg-white focus:bg-white"
                    />
                    <span className="absolute ml-60">
                      <svg
                        className="ml-3 mt-2"
                        width="25"
                        height="25"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1665_495)">
                          <g clipPath="url(#clip1_1665_495)">
                            <path
                              d="M13.125 6.5C13.125 7.93438 12.6594 9.25938 11.875 10.3344L15.8313 14.2937C16.2219 14.6844 16.2219 15.3188 15.8313 15.7094C15.4406 16.1 14.8062 16.1 14.4156 15.7094L10.4594 11.75C9.38438 12.5375 8.05938 13 6.625 13C3.03437 13 0.125 10.0906 0.125 6.5C0.125 2.90937 3.03437 0 6.625 0C10.2156 0 13.125 2.90937 13.125 6.5ZM6.625 11C7.21595 11 7.80111 10.8836 8.34708 10.6575C8.89304 10.4313 9.38912 10.0998 9.80698 9.68198C10.2248 9.26412 10.5563 8.76804 10.7825 8.22208C11.0086 7.67611 11.125 7.09095 11.125 6.5C11.125 5.90905 11.0086 5.32389 10.7825 4.77792C10.5563 4.23196 10.2248 3.73588 9.80698 3.31802C9.38912 2.90016 8.89304 2.56869 8.34708 2.34254C7.80111 2.1164 7.21595 2 6.625 2C6.03405 2 5.44889 2.1164 4.90292 2.34254C4.35696 2.56869 3.86088 2.90016 3.44302 3.31802C3.02516 3.73588 2.69369 4.23196 2.46754 4.77792C2.2414 5.32389 2.125 5.90905 2.125 6.5C2.125 7.09095 2.2414 7.67611 2.46754 8.22208C2.69369 8.76804 3.02516 9.26412 3.44302 9.68198C3.86088 10.0998 4.35696 10.4313 4.90292 10.6575C5.44889 10.8836 6.03405 11 6.625 11Z"
                              fill="#1E3A8A"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_1665_495">
                            <rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="translate(0.125)"
                            />
                          </clipPath>
                          <clipPath id="clip1_1665_495">
                            <path d="M0.125 0H16.125V16H0.125V0Z" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </div>
                  {/* options */}
                  <div className="absolute right-4 h-10 mt-2" >
                    <button onClick={toggleDropdown} className="hover:cursor-pointer">
                      <svg
                        width="22"
                        height="23"
                        viewBox="0 0 4 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.91667 15.3333C1.38958 15.3333 0.9384 15.1457 0.56302 14.7703C0.187641 14.3949 0 13.9437 0 13.4167C0 12.8896 0.187641 12.4384 0.56302 12.063C0.9384 11.6876 1.38958 11.5 1.91667 11.5C2.44375 11.5 2.89493 11.6876 3.27031 12.063C3.64569 12.4384 3.83333 12.8896 3.83333 13.4167C3.83333 13.9437 3.64569 14.3949 3.27031 14.7703C2.89493 15.1457 2.44375 15.3333 1.91667 15.3333ZM1.91667 9.58333C1.38958 9.58333 0.9384 9.39569 0.56302 9.02031C0.187641 8.64493 0 8.19375 0 7.66667C0 7.13958 0.187641 6.6884 0.56302 6.31302C0.9384 5.93764 1.38958 5.75 1.91667 5.75C2.44375 5.75 2.89493 5.93764 3.27031 6.31302C3.64569 6.6884 3.83333 7.13958 3.83333 7.66667C3.83333 8.19375 3.64569 8.64493 3.27031 9.02031C2.89493 9.39569 2.44375 9.58333 1.91667 9.58333ZM1.91667 3.83333C1.38958 3.83333 0.9384 3.64566 0.56302 3.27031C0.187641 2.89496 0 2.44375 0 1.91667C0 1.38958 0.187641 0.938371 0.56302 0.563021C0.9384 0.187671 1.38958 0 1.91667 0C2.44375 0 2.89493 0.187671 3.27031 0.563021C3.64569 0.938371 3.83333 1.38958 3.83333 1.91667C3.83333 2.44375 3.64569 2.89496 3.27031 3.27031C2.89493 3.64566 2.44375 3.83333 1.91667 3.83333Z"
                          fill="#1D1B20"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* User DropDown */}
                  {showDropdown && (
                    <div className="absolute right-4 top-14 z-50">
                      {DropdownAcc.map((item, index) => (
                        <UserDropdown
                          key={index}
                          items={item}
                        />))}
                    </div>
                  )}

                </div>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {/* Event */}
                <EventSection
                  items={accUser}
                  title={"People to Follow"}
                  showAction={true}
                  actionLabel="Follow"
                />

                {/* Opportunity */}
                <OppSection 
                  items={opportuniy} 
                  title="Lastest Opportunity" />

                <NewsSection 
                  items={news} 
                  title="Trending News" />
              </div>

            </div>
          </div>
        </section>

    </section>
  );
}
