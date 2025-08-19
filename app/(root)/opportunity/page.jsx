"use client";
import { useMemo, useState } from "react";
import ApplicationDetailsModal from "./ApplicationDetailsModal.jsx";
import { useRouter } from "next/navigation";

function JobCard({ item, saved, onToggleSave, onApply }) {
  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* hero */}
      <div className="h-40 bg-slate-100 grid place-items-center text-3xl text-slate-400 tracking-wide">
        {item.hero}
      </div>

      {/* body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[20px]">{item.title}</h3>
          <span className="text-[14px] text-slate-500 whitespace-nowrap">
            {item.posted}
          </span>
        </div>

        <div className="mt-3 text-[16px] text-slate-600">
          <div>
            <span className="font-medium">{item.org}</span> • {item.location}
          </div>
          <div className="mt-2">
            {item.employment} • {item.salary}
          </div>
        </div>

        <p className="mt-3 text-[16px] text-slate-600">{item.blurb}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="inline-block rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[15px] text-slate-600"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSave}
              className={[
                "grid place-items-center w-9 h-9 ",
                saved
                  ? "hover:bg-slate-50"
                  : "hover:bg-slate-50",
              ].join(" ")}
              title={saved ? "Saved" : "Save"}
            >
              {saved ? 
                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2827 2.4533C10.5131 1.98637 10.6284 1.7529 10.7848 1.6783C10.9209 1.6134 11.0791 1.6134 11.2152 1.6783C11.3717 1.7529 11.4869 1.98637 11.7174 2.4533L13.9041 6.88327C13.9721 7.02112 14.0061 7.09005 14.0558 7.14356C14.0999 7.19095 14.1527 7.22934 14.2113 7.25661C14.2776 7.28741 14.3536 7.29853 14.5057 7.32076L19.397 8.03569C19.9121 8.11098 20.1696 8.14862 20.2888 8.27443C20.3925 8.38388 20.4412 8.53428 20.4215 8.68376C20.3988 8.85557 20.2124 9.03717 19.8395 9.40037L16.3014 12.8464C16.1912 12.9538 16.136 13.0075 16.1004 13.0715C16.0689 13.128 16.0487 13.1902 16.0409 13.2545C16.0321 13.3271 16.0451 13.403 16.0711 13.5547L16.906 18.4221C16.994 18.9355 17.038 19.1922 16.9553 19.3445C16.8833 19.477 16.7554 19.57 16.6071 19.5975C16.4366 19.6291 16.2061 19.5078 15.7451 19.2654L11.3724 16.9658C11.2361 16.8942 11.168 16.8583 11.0962 16.8443C11.0327 16.8318 10.9673 16.8318 10.9038 16.8443C10.832 16.8583 10.7639 16.8942 10.6277 16.9658L6.25492 19.2654C5.79392 19.5078 5.56341 19.6291 5.39297 19.5975C5.24468 19.57 5.11672 19.477 5.04474 19.3445C4.962 19.1922 5.00603 18.9355 5.09407 18.4221L5.92889 13.5547C5.95491 13.403 5.96793 13.3271 5.95912 13.2545C5.95132 13.1902 5.93111 13.128 5.89961 13.0715C5.86402 13.0075 5.80888 12.9538 5.69859 12.8464L2.16056 9.40037C1.78766 9.03717 1.60121 8.85557 1.57853 8.68376C1.55879 8.53428 1.60755 8.38388 1.71125 8.27443C1.83044 8.14862 2.08797 8.11098 2.60304 8.03569L7.49431 7.32076C7.64642 7.29853 7.72248 7.28741 7.78872 7.25661C7.84736 7.22934 7.90016 7.19095 7.94419 7.14356C7.99391 7.09005 8.02793 7.02112 8.09597 6.88327L10.2827 2.4533Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="yellow"/>
                </svg> 
              : 
                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2827 2.4533C10.5131 1.98637 10.6284 1.7529 10.7848 1.6783C10.9209 1.6134 11.0791 1.6134 11.2152 1.6783C11.3717 1.7529 11.4869 1.98637 11.7174 2.4533L13.9041 6.88327C13.9721 7.02112 14.0061 7.09005 14.0558 7.14356C14.0999 7.19095 14.1527 7.22934 14.2113 7.25661C14.2776 7.28741 14.3536 7.29853 14.5057 7.32076L19.397 8.03569C19.9121 8.11098 20.1696 8.14862 20.2888 8.27443C20.3925 8.38388 20.4412 8.53428 20.4215 8.68376C20.3988 8.85557 20.2124 9.03717 19.8395 9.40037L16.3014 12.8464C16.1912 12.9538 16.136 13.0075 16.1004 13.0715C16.0689 13.128 16.0487 13.1902 16.0409 13.2545C16.0321 13.3271 16.0451 13.403 16.0711 13.5547L16.906 18.4221C16.994 18.9355 17.038 19.1922 16.9553 19.3445C16.8833 19.477 16.7554 19.57 16.6071 19.5975C16.4366 19.6291 16.2061 19.5078 15.7451 19.2654L11.3724 16.9658C11.2361 16.8942 11.168 16.8583 11.0962 16.8443C11.0327 16.8318 10.9673 16.8318 10.9038 16.8443C10.832 16.8583 10.7639 16.8942 10.6277 16.9658L6.25492 19.2654C5.79392 19.5078 5.56341 19.6291 5.39297 19.5975C5.24468 19.57 5.11672 19.477 5.04474 19.3445C4.962 19.1922 5.00603 18.9355 5.09407 18.4221L5.92889 13.5547C5.95491 13.403 5.96793 13.3271 5.95912 13.2545C5.95132 13.1902 5.93111 13.128 5.89961 13.0715C5.86402 13.0075 5.80888 12.9538 5.69859 12.8464L2.16056 9.40037C1.78766 9.03717 1.60121 8.85557 1.57853 8.68376C1.55879 8.53428 1.60755 8.38388 1.71125 8.27443C1.83044 8.14862 2.08797 8.11098 2.60304 8.03569L7.49431 7.32076C7.64642 7.29853 7.72248 7.28741 7.78872 7.25661C7.84736 7.22934 7.90016 7.19095 7.94419 7.14356C7.99391 7.09005 8.02793 7.02112 8.09597 6.88327L10.2827 2.4533Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            </button>
            <button
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              onClick={onApply}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "job", label: "Job" },
  { key: "scholarship", label: "Scholarship" },
];

const DATA = [
{
    id: 1,
    type: "job",
    title: "Senior Frontend Developer",
    org: "TechCorp Inc.",
    location: "San Francisco, CA",
    posted: "2 days ago",
    employment: "Full-time",
    salary: "$120,000 – $150,000",
    blurb:
      "Join our dynamic team to build cutting-edge web applications using React and modern technologies.",
    tags: ["Development"],
    hero: "Frontend Dev",
  },
  {
    id: 2,
    type: "job",
    title: "UX/UI Designer",
    org: "Design Studio",
    location: "New York, NY",
    posted: "1 week ago",
    employment: "Contract",
    salary: "$80,000 – $100,000",
    blurb:
      "Create beautiful and intuitive user experiences for our mobile and web applications.",
    tags: ["Design"],
    hero: "UX Designer",
  },
  {
    id: 3,
    type: "job",
    title: "Data Scientist",
    org: "Analytics Pro",
    location: "Austin, TX",
    posted: "3 days ago",
    employment: "Full-time",
    salary: "$110,000 – $140,000",
    blurb:
      "Analyze complex datasets and build machine learning models to drive business insights.",
    tags: ["Data Science"],
    hero: "Data Scientist",
  },
  {
    id: 4,
    type: "scholarship",
    title: "AI Engineer",
    org: "Future Tech",
    location: "Seattle, WA",
    posted: "5 days ago",
    employment: "Full-time",
    salary: "$130,000 – $160,000",
    blurb:
      "Develop and deploy artificial intelligence solutions for next-generation products.",
    tags: ["AI/ML"],
    hero: "AI Engineer",
  },
  {
    id: 5,
    type: "job",
    title: "Senior Frontend Developer",
    org: "TechCorp Inc.",
    location: "San Francisco, CA",
    posted: "2 days ago",
    employment: "Full-time",
    salary: "$120,000 – $150,000",
    blurb:
      "Join our dynamic team to build cutting-edge web applications using React and modern technologies.",
    tags: ["Development"],
    hero: "Frontend Dev",
  },
  {
    id: 6,
    type: "job",
    title: "UX/UI Designer",
    org: "Design Studio",
    location: "New York, NY",
    posted: "1 week ago",
    employment: "Contract",
    salary: "$80,000 – $100,000",
    blurb:
      "Create beautiful and intuitive user experiences for our mobile and web applications.",
    tags: ["Design"],
    hero: "UX Designer",
  },
  {
    id: 7,
    type: "job",
    title: "Data Scientist",
    org: "Analytics Pro",
    location: "Austin, TX",
    posted: "3 days ago",
    employment: "Full-time",
    salary: "$110,000 – $140,000",
    blurb:
      "Analyze complex datasets and build machine learning models to drive business insights.",
    tags: ["Data Science"],
    hero: "Data Scientist",
  },
  {
    id: 8,
    type: "scholarship",
    title: "AI Engineer",
    org: "Future Tech",
    location: "Seattle, WA",
    posted: "5 days ago",
    employment: "Full-time",
    salary: "$130,000 – $160,000",
    blurb:
      "Develop and deploy artificial intelligence solutions for next-generation products.",
    tags: ["AI/ML"],
    hero: "AI Engineer",
  },
]

export default function OpportunityPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [saved, setSaved] = useState(() => new Set());
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();

  const results = useMemo(() => {
    let list = DATA.slice();
    if (filter !== "all") list = list.filter((x) => x.type === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (x) =>
          x.title.toLowerCase().includes(q) ||
          x.org.toLowerCase().includes(q) ||
          x.location.toLowerCase().includes(q) ||
          x.tags.join(" ").toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, filter]);

  const toggleSave = (id) =>
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // Handler for contact button in modal
  const handleContact = (item) => {
    setSelectedItem(null); // Close modal
    router.push(`/opportunity/contact/${item.id}`);
  };

  return (
    <div className=" bg-slate-50">
      <header className="max-w-6xl mx-auto px-4 pt-6 flex items-center justify-between">
        <title>S3TUDY | Opportunity</title>
        <h1 className="text-2xl md:text-3xl">
          Jobs & Scholarships
        </h1>
        
      </header>

      <div className="flex items-center gap-3 text-slate-500 mb-10 -mt-10">
        <button onClick={() => router.push("/homepage")} className="text-[#1E3A8A] ">
          <img src="/favicon.ico" alt="S3TUDY" className='w-[55px] h-[55px] ml-[1450px]' />
          <p className='ml-[1300px] -mt-[40px] hover:cursor-pointer text-[20px]'>← Back</p>
        </button>
      </div>

      <main className="max-w-6xl mx-auto px-4 mt-4 pb-16">
        {/* Search */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 13L9 9M10.3333 5.66667C10.3333 6.2795 10.2126 6.88634 9.97811 7.45252C9.74358 8.01871 9.39984 8.53316 8.9665 8.9665C8.53316 9.39984 8.01871 9.74358 7.45252 9.97811C6.88634 10.2126 6.2795 10.3333 5.66667 10.3333C5.05383 10.3333 4.447 10.2126 3.88081 9.97811C3.31462 9.74358 2.80018 9.39984 2.36683 8.9665C1.93349 8.53316 1.58975 8.01871 1.35523 7.45252C1.12071 6.88634 1 6.2795 1 5.66667C1 4.42899 1.49167 3.242 2.36683 2.36683C3.242 1.49167 4.42899 1 5.66667 1C6.90434 1 8.09133 1.49167 8.9665 2.36683C9.84167 3.242 10.3333 4.42899 10.3333 5.66667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs and scholarships..."
            className="w-full rounded-xl border border-slate-200 bg-white shadow-sm py-3 pl-11 pr-4"
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mt-4">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={[
                "px-3 py-1.5 rounded-lg text-sm border",
                filter === f.key
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <section className="grid md:grid-cols-2 gap-6 mt-4">
          {results.map((item) => (
            <JobCard
              key={item.id}
              item={item}
              saved={saved.has(item.id)}
              onToggleSave={() => toggleSave(item.id)}
              onApply={() => setSelectedItem(item)}
            />
          ))}
          {results.length === 0 && (
            <div className="col-span-full text-center text-slate-500 py-16">
              No results. Try a different keyword or filter.
            </div>
          )}
        </section>
        {/* Modal for application details */}
        <ApplicationDetailsModal
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          item={selectedItem}
          onContact={handleContact}
        />
      </main>
    </div>
  );
}

