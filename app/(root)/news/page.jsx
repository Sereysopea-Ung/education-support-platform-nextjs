"use client"
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function Section({ title, children }) {
  return (
    <section className="mt-4">
      <h4 className="text-sm font-semibold text-slate-700 mb-2">{title}</h4>
      {children}
    </section>
  );
}

function PillRow({ items, onPick }) {
  if (!items?.length) {
    return <div className="text-slate-400 text-sm">No items yet.</div>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t, i) => (
        <button
          key={i}
          onClick={() => onPick?.(t)}
          className="px-3 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-white text-sm"
        >
          {t}
        </button>
      ))}
    </div>
  );
}

const CATS = [
  { key: "all", label: "All News", count: 8 },
  { key: "rupp", label: "RUPP", count: 1 },
  { key: "ifl", label: "IFL", count: 1 },
  { key: "ite", label: "ITE", count: 1 },
  { key: "bio", label: "BIOLOGY", count: 1 },
  { key: "math", label: "MATH", count: 1 },
  { key: "env", label: "Environment", count: 1 },
  { key: "culture", label: "Culture", count: 1 },
];

const NEWS = [
  {
    id: 1,
    source: "Royal University",
    date: "13.Jun.2025 • 11:09AM",
    title:
      "ឱកាសវឌ្ឍនកម្មនៃការស្រាវជ្រាវជាតិ និងការចូលរួមយុវជនឆ្ពោះទៅកាន់យុទ្ធនាការអប់រំបរិស្ថាន",
    views: 234,
    category: "all",
     badge: "/default_avatar.svg",
  },
  {
    id: 2,
    source: "ITE",
    date: "10.Feb.2025 • 09:30AM",
    title: "ការអប់រំដល់ក្រុមសិស្សឆ្នាំទី២ បច្ចេកវិទ្យាស៊ីវីលស្ថាបត្យកម្ម",
    views: 456,
    category: "ite",
    badge: "/default_avatar.svg",
  },
  {
    id: 3,
    source: "Government News",
    date: "09.Feb.2025 • 02:15PM",
    title:
      "មន្ត្រីជាន់ខ្ពស់ពិនិត្យការអនុវត្តន៍ផែនការផ្ដល់សេវាសម្រាប់ប្រជាកសិករ",
    views: 789,
    category: "env",
    badge: "/default_avatar.svg",
  },
  {
    id: 4,
    source: "Business Today",
    date: "08.Feb.2025 • 04:54PM",
    title: "ដំណើរការអភិវឌ្ឍន៍ឧស្សាហកម្មឆ្លាតវៃក្នុងប្រទេសកម្ពុជា",
    views: 321,
    category: "culture",
    badge: "/default_avatar.svg",
  },
  {
    id: 5,
    source: "Tech Cambodia",
    date: "07.Feb.2025 • 10:40AM",
    title: "ក្រុមហ៊ុនបច្ចេកវិទ្យាថ្មីចូលទីផ្សារកម្ពុជា និងបើកការងារថ្មី",
    views: 567,
    category: "rupp",
    badge: "/default_avatar.svg",
  },
  {
    id: 6,
    source: "IFL",
    date: "06.Feb.2025 • 01:10PM",
    title: "សកម្មភាពសិក្សាភាសាអង់គ្លេសជាក់ស្តែងសម្រាប់និស្សិតឆ្នាំទី១",
    views: 198,
    category: "ifl",
    badge: "/default_avatar.svg",
  },
  {
    id: 7,
    source: "Mathematics",
    date: "05.Feb.2025 • 09:00AM",
    title: "វគ្គបណ្តុះបណ្តាលគណិតវិទ្យាសម្រាប់គ្រូបង្រៀនតាមតំបន់",
    views: 129,
    category: "math",
    badge: "/default_avatar.svg",
  },
  {
    id: 8,
    source: "Biology",
    date: "04.Feb.2025 • 03:45PM",
    title: "សន្និសីទអន្តរជាតិអំពីជីវវិទ្យាសមុទ្រនៅភ្នំពេញ",
    views: 402,
    category: "bio",
    badge: "/default_avatar.svg",
  },
];

const POPULAR = ["ទឹកអប់", "ការសិក្សា", "សេដ្ឋកិច្ច", "បច្ចេកវិទ្យា", "វប្បធម៌", "សុខភាព"];
const RECENT_KEY = "demo.recentSearches";


export default function NewsPage() {

  const [activeCat, setActiveCat] = useState("all");
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | popular
  const [q, setQ] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [overlayQ, setOverlayQ] = useState("");
  const [recent, setRecent] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // Track selected news item

  // load recent searches
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      setRecent(stored.slice(0, 8));
    } catch {}
  }, []);

  // derived list
  const filtered = useMemo(() => {
    let data = NEWS.slice();
    if (activeCat !== "all") data = data.filter((n) => n.category === activeCat);
    if (q.trim()) {
      const t = q.toLowerCase();
      data = data.filter(
        (n) => (n.title + " " + n.source).toLowerCase().includes(t)
      );
    }
    if (sortBy === "popular") data.sort((a, b) => b.views - a.views);
    else if (sortBy === "oldest") data.sort((a, b) => a.id - b.id);
    else data.sort((a, b) => b.id - a.id);
    return data;
  }, [activeCat, sortBy, q]);

  // overlay search results (simple text echo)
  const overlayResults = useMemo(() => {
    const t = overlayQ.trim().toLowerCase();
    if (!t) return [];
    return NEWS.filter((n) =>
      (n.title + " " + n.source).toLowerCase().includes(t)
    );
  }, [overlayQ]);

  const openOverlay = () => {
    setOverlayQ("");
    setShowSearch(true);
    setTimeout(() => document.getElementById("overlay-input")?.focus(), 0);
  };
  const closeOverlay = () => setShowSearch(false);

  const pushRecent = (term) => {
    if (!term) return;
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 8);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {}
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header>
        <title>
          S3TUDY | News
        </title>
      </header>

      <div className="bg-white h-30">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <div className="flex items-center gap-3 text-slate-500 mb-1">
            <button onClick={() => router.push("/homepage")} className="text-[#1E3A8A] ">
                <img src="/favicon.ico" alt="S3TUDY" className='w-[55px] h-[55px] ml-[1060px]' />
                <p className='ml-[900px] -mt-[40px] hover:cursor-pointer text-[20px]'>← Back</p>
            </button>
          </div>
          <h1 className="text-2xl md:text-3xl mb-10 -mt-7.5">All News</h1>
        </div>
      </div>

      {/* filter button */}
      <button
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
          className="flex items-center mt-2 ml-[1380px] px-3 py-2 rounded-lg border border-slate-200 bg-[#E5E7EB] text-[16px] hover:bg-slate-50 hover:cursor-pointer"
          title="Filters"
        >
        <span className="inline-block mr-4">Filters</span> 
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.66667C1 1.48986 1.07024 1.32029 1.19526 1.19526C1.32029 1.07024 1.48986 1 1.66667 1H12.3333C12.5101 1 12.6797 1.07024 12.8047 1.19526C12.9298 1.32029 13 1.48986 13 1.66667V3.39067C13 3.56746 12.9297 3.73701 12.8047 3.862L8.52867 8.138C8.40363 8.263 8.33337 8.43254 8.33333 8.60933V10.3333L5.66667 13V8.60933C5.66663 8.43254 5.59637 8.263 5.47133 8.138L1.19533 3.94267C1.0703 3.81767 1.00004 3.64813 1 3.47133V1.66667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
      </button>
      
      {showFilters && (
        <div className="max-w-6xl mx-auto px-4 mt-4">
        <div className="rounded-xl border border-slate-200 bg-gray-50 shadow-sm p-3 flex flex-wrap items-center justify-between gap-3">

          {/* Toolbar */}
          <div className="flex flex-wrap gap-x-5">
            <span className="ml-2 mt-2 text-slate-500 text-[16px]">Category</span>
            {CATS.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveCat(c.key)}
                className={[
                  "px-3 py-2 text-[16px]",
                  activeCat === c.key
                    ? "rounded-[10px] bg-[#1E3A8A] text-white"
                    : "rounded-[10px] border-1 bg-white text-black hover:bg-slate-50",
                ].join(" ")}
              >
                {c.label} <sup className="ml-1 text-xs text-slate-500">({c.count})</sup>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-x-5">
              <span className="ml-2 text-slate-500 text-[16px]">Sort by</span>
              {[
                { k: "newest", label: "Newest" },
                { k: "oldest", label: "Oldest" },
                { k: "popular", label: "Most Popular" },
              ].map((s) => (
                <button
                  key={s.k}
                  onClick={() => setSortBy(s.k)}
                  className={[
                    "px-3 py-2 text-sm",
                    sortBy === s.k
                      ? "rounded-[10px] bg-[#1E3A8A] text-white"
                      : "rounded-[10px] border-1 bg-white text-black hover:bg-slate-50",
                  ].join(" ")}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Search bar */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 13L9 9M10.3333 5.66667C10.3333 6.2795 10.2126 6.88634 9.97811 7.45252C9.74358 8.01871 9.39984 8.53316 8.9665 8.9665C8.53316 9.39984 8.01871 9.74358 7.45252 9.97811C6.88634 10.2126 6.2795 10.3333 5.66667 10.3333C5.05383 10.3333 4.447 10.2126 3.88081 9.97811C3.31462 9.74358 2.80018 9.39984 2.36683 8.9665C1.93349 8.53316 1.58975 8.01871 1.35523 7.45252C1.12071 6.88634 1 6.2795 1 5.66667C1 4.42899 1.49167 3.242 2.36683 2.36683C3.242 1.49167 4.42899 1 5.66667 1C6.90434 1 8.09133 1.49167 8.9665 2.36683C9.84167 3.242 10.3333 4.42899 10.3333 5.66667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search news…"
            onFocus={openOverlay}
            className="w-full rounded-[12px] border bg-white py-3 pl-11 pr-12 text-[15px] placeholder:text-black"
          />
          {!!q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              aria-label="Clear"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="max-w-6xl text-[18px] mx-auto px-4 mt-4 mb-4 text-black">
        Results: <span className="text-[16px] text-gray-600">{filtered.length} articles</span>
      </div>

      {/* List or Detail View */}
      <div className="max-w-6xl mx-auto px-4 mt-3 space-y-3 pb-24">
        {selectedId === null ? (
          filtered.map((n) => (
            <article
              key={n.id}
              className="bg-white border border-slate-200 rounded-[12px] p-6 flex gap-3"
            >
              {n.badge ? (
                <img
                  src={n.badge}
                  alt="User badge"
                  className="w-16 h-16 rounded-full border border-indigo-100 bg-indigo-50 shrink-0 overflow-hidden"
                />
              ) : (
                <div className="w-16 h-16 rounded-full border border-indigo-100 bg-indigo-50 text-indigo-700 font-extrabold grid place-items-center shrink-0 overflow-hidden">
                  <span className="text-[16px]">RU</span>
                </div>
              )}

              <div className="flex-1 min-w-0 ml-3 ">
                <div className="flex items-center gap-2 text-[20px] text-black">
                  <span>{n.source}</span>
                  <span>•</span>
                  <span className="text-[14px] text-slate-500">{n.date}</span>
                </div>

                <h3 className="mt-2">{n.title}</h3>
                <div className="mt-2 flex items-center gap-4 text-[14px] text-slate-500">
                  <span>{n.views.toLocaleString()} reads</span>
                  <span>
                    <svg width="20" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.42012 8.71318C1.28394 8.49754 1.21584 8.38972 1.17772 8.22342C1.14909 8.0985 1.14909 7.9015 1.17772 7.77658C1.21584 7.61028 1.28394 7.50246 1.42012 7.28682C2.54553 5.50484 5.8954 1 11.0004 1C16.1054 1 19.4553 5.50484 20.5807 7.28682C20.7169 7.50246 20.785 7.61028 20.8231 7.77658C20.8517 7.9015 20.8517 8.0985 20.8231 8.22342C20.785 8.38972 20.7169 8.49754 20.5807 8.71318C19.4553 10.4952 16.1054 15 11.0004 15C5.8954 15 2.54553 10.4952 1.42012 8.71318Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.0004 11C12.6573 11 14.0004 9.65685 14.0004 8C14.0004 6.34315 12.6573 5 11.0004 5C9.34355 5 8.0004 6.34315 8.0004 8C8.0004 9.65685 9.34355 11 11.0004 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="self-center">
                <button className="text-black mt-10 hover:underline" onClick={() => setSelectedId(n.id)}>
                  See more
                </button>
              </div>
            </article>
          ))
        ) : (
          (() => {
            const article = NEWS.find((n) => n.id === selectedId);
            if (!article) {
              return (
                <div className="max-w-3xl mx-auto p-4">
                  <p className="text-red-500">Article not found.</p>
                  <button className="text-indigo-600 hover:underline" onClick={() => setSelectedId(null)}>
                    ← Back to All News
                  </button>
                </div>
              );
            }
            return (
              <div className="max-w-6xl mx-auto p-4">
                
                <div>
                  <button className="text-[#1E3A8A]  hover:underline mb-3" onClick={() => setSelectedId(null)}>
                    <p className='ml-[1000px] -mt-[40px] hover:cursor-pointer text-[20px]'>← Back</p>
                  </button> 
                </div>
                
                <div className="">
                  <h1 className="text-3xl font-bold mt-4">{article.title}</h1>
                  <div className="mt-2 text-sm text-slate-500">
                    {article.source} • {article.date} • {article.views} reads
                  </div>
                  <div className="mt-6 prose max-w-none">
                    <p>
                      {/* Here you can fetch and render the full content of the news item */}
                      This is the detailed content for <strong>{article.title}</strong>.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus
                      ante sed ligula facilisis, et aliquam risus egestas. 
                    </p>
                  </div>
                </div>

              </div>
            );
          })()
        )}
      </div>

      {/* To top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-13 h-13 rounded-full bg-[#1E3A8A] hover:cursor-pointer text-white grid place-items-center shadow-lg"
        title="Back to top"
      >
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.16602 7.33333L6.99935 1.5M6.99935 1.5L12.8327 7.33333M6.99935 1.5V16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

      </button>

      {/* Search Overlay (matches your second screen) */}
      {showSearch && (
        <div
          className="fixed inset-0 bg-slate-50/95 backdrop-blur-sm z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
                <button
                  onClick={closeOverlay}
                  className="rounded-full w-6 h-6 hover:bg-gray-200 -mt-1"
                  aria-label="Back"
                >
                  <svg width="20" height="20" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.87561 13.0415L1.33398 7.49992L6.87561 1.95825" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                </button>
                <p className="mb-2 text-[30px] font-medium">Search</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 13L9 9M10.3333 5.66667C10.3333 6.2795 10.2126 6.88634 9.97811 7.45252C9.74358 8.01871 9.39984 8.53316 8.9665 8.9665C8.53316 9.39984 8.01871 9.74358 7.45252 9.97811C6.88634 10.2126 6.2795 10.3333 5.66667 10.3333C5.05383 10.3333 4.447 10.2126 3.88081 9.97811C3.31462 9.74358 2.80018 9.39984 2.36683 8.9665C1.93349 8.53316 1.58975 8.01871 1.35523 7.45252C1.12071 6.88634 1 6.2795 1 5.66667C1 4.42899 1.49167 3.242 2.36683 2.36683C3.242 1.49167 4.42899 1 5.66667 1C6.90434 1 8.09133 1.49167 8.9665 2.36683C9.84167 3.242 10.3333 4.42899 10.3333 5.66667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input
                  id="overlay-input"
                  value={overlayQ}
                  onChange={(e) => setOverlayQ(e.target.value)}
                  placeholder="Search news…"
                  className="w-full rounded-[12px] border border-slate-200 bg-white shadow-sm py-2.5 pl-10 pr-24"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setQ(overlayQ);
                      pushRecent(overlayQ.trim());
                      closeOverlay();
                    }
                  }}
                />
              </div>
              <button
                onClick={() => setOverlayQ("")}
                className="text-slate-600 hover:text-slate-800"
              >
                Clear
              </button>
            </div>

            {/* Recent */}
            {!overlayQ && (
              <>
                <Section title="Recent Searches">
                  <PillRow
                    items={recent}
                    onPick={(t) => {
                      setOverlayQ(t);
                      setQ(t);
                      pushRecent(t);
                      closeOverlay();
                    }}
                  />
                </Section>

                <Section title="Popular Searches">
                  <PillRow
                    items={POPULAR}
                    onPick={(t) => {
                      setOverlayQ(t);
                      setQ(t);
                      pushRecent(t);
                      closeOverlay();
                    }}
                  />
                </Section>
              </>
            )}

            {/* Results */}
            {overlayQ ? (
              <div className="mt-3">
                {overlayResults.length === 0 ? (
                  <div className="py-10 text-center text-slate-500">
                    No results for “{overlayQ}”.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {overlayResults.map((n) => (
                      <article
                        key={n.id}
                        className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex gap-3"
                        onClick={() => {
                          setQ(overlayQ);
                          pushRecent(overlayQ.trim());
                          closeOverlay();
                        }}
                      >
                        <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 grid place-items-center text-indigo-700 text-xs font-bold">
                          {n.badge ?? "RU"}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-slate-500">
                            {n.source} • {n.date}
                          </div>
                          <div className="font-semibold">{n.title}</div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="pt-8 pb-10 text-center text-slate-500">
                Start typing to search.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

