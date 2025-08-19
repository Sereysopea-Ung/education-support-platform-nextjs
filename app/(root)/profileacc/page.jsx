"use client";
import { useMemo, useState } from "react";
import ProfileInfo from "../homepage/profile";
import { useRouter } from "next/navigation";

const ICONS = {
  verified: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15.5 9.5M17.9012 4.99851C18.1071 5.49653 18.5024 5.8924 19.0001 6.09907L20.7452 6.82198C21.2433 7.02828 21.639 7.42399 21.8453 7.92206C22.0516 8.42012 22.0516 8.97974 21.8453 9.47781L21.1229 11.2218C20.9165 11.7201 20.9162 12.2803 21.1236 12.7783L21.8447 14.5218C21.9469 14.7685 21.9996 15.0329 21.9996 15.2999C21.9997 15.567 21.9471 15.8314 21.8449 16.0781C21.7427 16.3249 21.5929 16.549 21.4041 16.7378C21.2152 16.9266 20.991 17.0764 20.7443 17.1785L19.0004 17.9009C18.5023 18.1068 18.1065 18.5021 17.8998 18.9998L17.1769 20.745C16.9706 21.2431 16.575 21.6388 16.0769 21.8451C15.5789 22.0514 15.0193 22.0514 14.5212 21.8451L12.7773 21.1227C12.2792 20.9169 11.7198 20.9173 11.2221 21.1239L9.47689 21.8458C8.97912 22.0516 8.42001 22.0514 7.92237 21.8453C7.42473 21.6391 7.02925 21.2439 6.82281 20.7464L6.09972 19.0006C5.8938 18.5026 5.49854 18.1067 5.00085 17.9L3.25566 17.1771C2.75783 16.9709 2.36226 16.5754 2.15588 16.0777C1.94951 15.5799 1.94923 15.0205 2.1551 14.5225L2.87746 12.7786C3.08325 12.2805 3.08283 11.7211 2.8763 11.2233L2.15497 9.47678C2.0527 9.2301 2.00004 8.96568 2 8.69863C1.99996 8.43159 2.05253 8.16715 2.15472 7.92043C2.25691 7.67372 2.40671 7.44955 2.59557 7.26075C2.78442 7.07195 3.00862 6.92222 3.25537 6.8201L4.9993 6.09772C5.49687 5.89197 5.89248 5.4972 6.0993 5.00006L6.82218 3.25481C7.02848 2.75674 7.42418 2.36103 7.92222 2.15473C8.42027 1.94842 8.97987 1.94842 9.47792 2.15473L11.2218 2.87712C11.7199 3.08291 12.2793 3.08249 12.7771 2.87595L14.523 2.15585C15.021 1.94966 15.5804 1.9497 16.0784 2.15597C16.5763 2.36223 16.972 2.75783 17.1783 3.25576L17.9014 5.00153L17.9012 4.99851Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chevronDown: (props) => (
    <svg viewBox="0 0 24 24" {...props}><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  eye: (props) => (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.8 8L8 5.2M8 5.2L5.2 8M8 5.2V10.8M1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  comment: (props) => (
    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.8385 5.85094H7.52551M4.8385 8.42447H9.54077M7.86139 13.5715C11.0149 13.5715 13.5713 10.7733 13.5713 7.32153C13.5713 3.86975 11.0149 1.07153 7.86139 1.07153C4.70789 1.07153 2.15148 3.86975 2.15148 7.32153C2.15148 8.02006 2.25618 8.69182 2.44932 9.31904C2.522 9.55508 2.55834 9.67309 2.5649 9.76376C2.57137 9.8533 2.56648 9.91607 2.54624 10.0031C2.52575 10.0913 2.48051 10.1829 2.39002 10.3663L1.29126 12.5924C1.13453 12.9099 1.05617 13.0687 1.07371 13.1912C1.08898 13.2979 1.14637 13.3919 1.23063 13.4482C1.32736 13.5128 1.49135 13.4942 1.81933 13.4571L5.25939 13.0679C5.36357 13.0561 5.41566 13.0502 5.46313 13.0522C5.50983 13.0541 5.54279 13.0589 5.58833 13.0704C5.63463 13.0821 5.69285 13.1066 5.80928 13.1558C6.44614 13.4243 7.13806 13.5715 7.86139 13.5715Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  ),
  cap: (props) => (
    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 9V1M4 1L7 4M4 1L1 4" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  book: (props) => (
    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 17.5C1 16.1193 2.11929 15 3.5 15H17M1 17.5C1 18.8807 2.11929 20 3.5 20H17V15M1 17.5V3C1 1.89543 1.89543 1 3 1H17V15" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  calendar: (props) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 6V10L13 13M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  mail: (props) => (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4L8.8906 9.2604C9.5624 9.7083 10.4376 9.7083 11.1094 9.2604L19 4M3 15H17C18.1046 15 19 14.1046 19 13V3C19 1.89543 18.1046 1 17 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  phone: (props) => (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 3C1 1.89543 1.89543 1 3 1H6.27924C6.70967 1 7.09181 1.27543 7.22792 1.68377L8.7257 6.17721C8.8831 6.64932 8.7059 7.16531 8.2814 7.43L5.99765 8.8453C7.14294 11.2264 9.0949 13.1783 11.476 14.3236L12.8913 12.0399C13.156 11.6154 13.672 11.4382 14.1441 11.5956L18.6375 13.0934C19.0459 13.2295 19.3213 13.6116 19.3213 14.0421V17.321C19.3213 18.4256 18.4259 19.321 17.3213 19.321H16C7.71573 19.321 1 12.6053 1 4.32104V3Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  linkedin: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 17V13.5V10" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 17V13.75M11 13.75V10M11 13.75C11 10 17 10 17 13.75V17" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 7.00989L7.01 6.99878" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  twitter: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 4.00995C21 4.49995 20.02 4.68995 19 4.81995C20.07 4.26995 20.92 3.32995 21.32 2.15995C20.34 2.74995 19.26 3.14995 18.1 3.35995C16.37 1.40995 13.49 1.10995 11.43 2.63995C9.37 4.16995 8.66 6.83995 9.76 9.10995C6.26 8.94995 3.01 7.33995 0.75 4.65995C0.37 5.37995 0.17 6.18995 0.17 7.01995C0.17 8.60995 0.99 10.0699 2.23 10.9299C1.34 10.9099 0.47 10.6699 -0.31 10.2399V10.2899C-0.31 12.8899 1.52 15.1099 4.07 15.5899C3.62 15.7099 3.16 15.7699 2.69 15.7699C2.36 15.7699 2.03 15.7399 1.71 15.6799C2.37 17.8699 4.41 19.42 6.77 19.45C4.87 20.94 2.51 21.74 0.08 21.74C-0.28 21.74 -0.64 21.72 -1 21.67C1.39 23.24 4.16 24.08 7 24.08C15.69 24.08 20.51 16.9299 20.51 10.7299C20.51 10.5399 20.51 10.3599 20.5 10.1699C21.47 9.53995 22.34 8.74995 23.06 7.82995C22.15 8.19995 21.19 8.44995 20.21 8.56995L22 4.00995Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

function Icon({ name, className, ...rest }) {
  const C = ICONS[name];
  return C ? <C className={className} {...rest} /> : null;
}

const TABS = ["All Posts", "Q&A", "Lesson", "Collections"];
const SORTS = ["Popular", "Oldest", "Recently"];

const samplePosts = [
  { id: 1, author: "Celine Celine", type: "Q&A", createdAt: "2025-07-20T23:11:00Z", views: 24, comments: 12,
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=800&auto=format&fit=crop",
    excerpt: "Just my! Here’s what I learned about neural networks and deep learning..." },
  { id: 2, author: "Celine Celine", type: "Lesson", createdAt: "2025-07-20T23:11:00Z", views: 24, comments: 12,
    image: null, excerpt: "Lorem ipsum dolor sit amet consectetur. Viverra risus quis viverra aliquam..." },
  { id: 3, author: "Celine Celine", type: "Q&A", createdAt: "2025-07-18T21:03:00Z", views: 11, comments: 5,
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=800&auto=format&fit=crop",
    excerpt: "Just my! Here’s what I learned about neural networks and deep learning..." },
  { id: 4, author: "Celine Celine", type: "Lesson", createdAt: "2025-07-18T21:03:00Z", views: 19, comments: 7,
    image: null, excerpt: "Lorem ipsum dolor sit amet consectetur. Viverra risus quis viverra aliquam..." },
];

function InfoRow({ icon, label, value }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );
}

function ContactBtn({ icon, label }) {
  return (
    <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300">
      <Icon name={icon} className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function formatDateTime(iso) {
  const d = new Date(iso);
  const date = d.toLocaleDateString(undefined, { day: "2-digit", month: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: true });
  return `${date} • ${time}`;
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("All Posts");
    const [sortBy, setSortBy] = useState("Recently");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const router = useRouter();

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

  const filtered = useMemo(() => {
    let rows = activeTab === "All Posts"
      ? samplePosts
      : samplePosts.filter((p) => p.type === activeTab);

    if (sortBy === "Popular") rows = [...rows].sort((a, b) => b.views - a.views);
    else if (sortBy === "Oldest") rows = [...rows].sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
    else rows = [...rows].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

    return rows;
  }, [activeTab, sortBy]);

  return (
    <div className="h-full ml-60 text-slate-900">

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
                    <li className="p-2 hover:bg-gray-200 hover:cursor-pointer" onClick={() => router.push("/homepage")}>
                      <span className="flex items-center gap-x-5">
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

                    <li className="p-2 hover:bg-gray-200 hover:cursor-pointer" onClick={() => router.push("/mynetwork")}>
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

                    <li className="p-2 hover:bg-gray-200">
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

                    <li className="p-2 hover:bg-gray-200 hover:cursor-pointer">
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

                    <li className="p-2 hover:bg-gray-200 hover:cursor-pointer">
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

                    <li className="p-2 hover:bg-gray-200 hover:cursor-pointer">
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

                    <li className="p-2 hover:bg-gray-200 hover:cursor-pointer">
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

        <div className="ml-5 overflow-x-hidden">
            {/* Header */}
            <div className="mx-auto w-[1220px] ml-60 px-4 pt-6 pb-4">
                <div className="flex gap-4">
                    <img src="https://scontent.fpnh20-1.fna.fbcdn.net/v/t39.30808-1/506094965_1506415967011960_7949380384331048764_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Zg5pNowSTccQ7kNvwEVmPdP&_nc_oc=AdkNWx0yGnqiVAMNxsYwVwjR3UDbKGsIBZJ18r5Jw0RcQf6trLW-Q5NvZyJqIUK7dQc&_nc_zt=24&_nc_ht=scontent.fpnh20-1.fna&_nc_gid=Ky5B6aWQuZjOYcqASv1HeA&oh=00_AfUSNMJnq_zznV2S9IFwzFqHqMEAXVTiz1SiK7QauIJFAg&oe=68A0EE41" alt="Celine avatar"
                    className="h-40 w-40 rounded-full object-cover ring-2 ring-white" 
                    onClick={() => window.open('https://scontent.fpnh20-1.fna.fbcdn.net/v/t39.30808-1/506094965_1506415967011960_7949380384331048764_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Zg5pNowSTccQ7kNvwEVmPdP&_nc_oc=AdkNWx0yGnqiVAMNxsYwVwjR3UDbKGsIBZJ18r5Jw0RcQf6trLW-Q5NvZyJqIUK7dQc&_nc_zt=24&_nc_ht=scontent.fpnh20-1.fna&_nc_gid=Ky5B6aWQuZjOYcqASv1HeA&oh=00_AfUSNMJnq_zznV2S9IFwzFqHqMEAXVTiz1SiK7QauIJFAg&oe=68A0EE41', '_blank')}
                    />

                    <div className="flex-1">
                      <div className="ml-1">
                        <div className="flex items-center gap-2">
                          <h1 className="text-[28px] font-semibold">Celine Celine</h1>
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-white">
                              <Icon name="verified" className="h-3.5 w-3.5" />
                          </span>
                        </div>

                        <p className="mt-2 text-[18px] w-full text-slate-600 max-w-3xl">
                          Flowers bloom and wither in their own time, just as life is like a flower—cherish it while you can.
                        </p>

                        <div className="mt-3 flex items-center gap-6 text-[18px]">
                          <span><strong className="font-semibold">891</strong> Following</span>
                          <span><strong className="font-semibold">156</strong> Posts</span>
                        </div>
                      </div>
                    </div>
                </div>

                <div className="relative mt-15 ml-45 mb-10">
                    <button
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`flex items-center justify-center px-5 py-2 -mt-[50px] rounded-[10px] text-white font-medium transition
                            ${
                                isFollowing
                                ? "bg-gray-300 text-gray-800"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                        {isFollowing ? "Following" : "Follow"}
                    </button>
                </div>
            </div>

            <hr className="border-slate-200 mb-1" />
            {/* Tabs */}
            <div className="mx-auto ml-60 w-full px-4" role="tablist" aria-label="Profile sections">
                <div className="flex gap-10 overflow-x-auto">
                {TABS.map((tab) => {
                    const active = activeTab === tab;
                    return (
                    <button
                        key={tab}
                        role="tab"
                        aria-selected={active}
                        onClick={() => setActiveTab(tab)}
                        className={[
                        "mt-3 rounded-lg px-4 py-2 text-[18px] transition hover:cursor-pointer",
                        active ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-blue-50",
                        ].join(" ")}
                    >
                        {tab}
                    </button>
                    );
                })}
                </div>
            </div>
            <hr className="border-slate-200 mt-4" />

            <div className="mx-auto mt-6 grid w-[1220px] ml-60 grid-cols-1 gap-6 px-4 lg:grid-cols-[1fr_320px]">
                {/* Left: Posts + Sort */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                      <div className="text-[16px] text-slate-500">
                        {filtered.length} {filtered.length === 1 ? "post" : "posts"}
                      </div>

                      <div className="relative mb-3">
                        <button
                            className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            aria-haspopup="menu"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((v) => !v)}
                          >
                            Filter
                            <Icon name="chevronDown" className="h-4 w-4" />
                        </button>

                        {menuOpen && (
                            <ul role="menu" className="absolute right-0 z-10 mt-1 w-40 overflow-hidden rounded-md border border-slate-200 bg-white shadow-md">
                              {SORTS.map((s) => (
                                  <li key={s}>
                                    <button
                                        role="menuitem"
                                        className={[
                                        "w-full px-3 py-2 text-left text-sm",
                                        sortBy === s ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50",
                                        ].join(" ")}
                                        onClick={() => { setSortBy(s); setMenuOpen(false); }}
                                    >
                                        {s}
                                    </button>
                                  </li>
                              ))}
                            </ul>
                        )}
                      </div>
                  </div>

                  {/* Posts grid */}
                  <div className="grid gap-6 md:grid-cols-2">
                      {filtered.map((p) => (
                        <article key={p.id} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                            <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img src="https://i.pravatar.cc/40?img=12" alt="" className="h-11 w-11 rounded-full object-cover" />
                                <span className="text-[18px] font-medium">{p.author}</span>
                            </div>
                            <span className={`rounded-md px-2 py-0.5 text-[15px] ${p.type === "Q&A" ? "bg-[#C7FFDE] text-[#27AE60]" : "bg-[#FFBCA3] text-[#9D2E04]"}`}>
                                {p.type}
                            </span>
                            </div>

                            {p.image ? (
                              <img src={p.image} alt="" className="mb-3 h-44 w-full rounded-lg object-cover" />
                            ) : (
                              <p className="mb-3 h-44 w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                                  {p.excerpt}
                              </p>
                            )}

                            <div className="mt-2 flex items-center justify-between text-[16px] text-slate-500">
                              <time dateTime={p.createdAt}>{formatDateTime(p.createdAt)}</time>
                              <div className="flex items-center gap-4">
                                  <span className="inline-flex items-center gap-1">
                                    <Icon name="eye"/> {p.views}
                                  </span>
                                  <span className="inline-flex items-center gap-1">
                                    <Icon name="comment"/> {p.comments}
                                  </span>
                              </div>
                            </div>
                        </article>
                      ))}
                  </div>
                </div>

                {/* Right: About & Contact */}
                <aside className="space-y-6">
                  <section className="rounded-xl border border-slate-200 bg-white p-4">
                      <h2 className="mb-4 text-[16px] gap-y-2 font-semibold">About</h2>
                      <InfoRow icon="cap" label="Student" value="Year 3" />
                      <InfoRow icon="book" label="Major" value="Computer Science" />
                      <InfoRow icon="calendar" label="Joined" value="September 2023" />
                  </section>

                  <section className="rounded-[16px] border border-slate-200 bg-white p-4">
                      <h2 className="mb-4 text-xl font-semibold">Contact</h2>
                      <div className="grid grid-cols-2 gap-3">
                      <ContactBtn icon="mail" label="Email" />
                      <ContactBtn icon="phone" label="Phone" />
                      <ContactBtn icon="linkedin" label="LinkedIn" />
                      <ContactBtn icon="twitter" label="Twitter" />
                      </div>
                  </section>
                </aside>
            </div>
        </div>
    </div>
  );
}

