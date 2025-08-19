// src/components/ApplicationDetailsModal.jsx
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplicationDetailsModal({
  open,
  onClose,
  item,              // job/scholarship object
  onContact,         // optional callback
}) {
  const [idx, setIdx] = useState(0);

  // close on ESC
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose?.();
    if (open) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  useEffect(() => { setIdx(0); }, [item?.id]); // reset slide when item changes

  // Demo images for carousel
  const DEMO_IMAGES = [
    "https://via.placeholder.com/400x200?text=Demo+Image+1",
    "https://via.placeholder.com/400x200?text=Demo+Image+2",
    "https://via.placeholder.com/400x200?text=Demo+Image+3",
    "https://via.placeholder.com/400x200?text=Demo+Image+4",
    "https://via.placeholder.com/400x200?text=Demo+Image+5",
  ];
  // Always call hooks before any return
  const slides = item?.images?.length
    ? item.images
    : DEMO_IMAGES;
  const goto = (n) => setIdx((p) => (n + slides.length) % slides.length);
  const prev = () => goto(idx - 1);
  const next = () => goto(idx + 1);
  const deadline = useMemo(() => {
    if (!item?.deadline) return null;
    try { return new Date(item.deadline).toLocaleDateString(); }
    catch { return String(item.deadline); }
  }, [item?.deadline]);
  const router = useRouter();
  const contact = () => {
    router.push(`/opportunity/contact/${item.id}`);
  };

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative h-full overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-5xl rounded-xl bg-white shadow-xl">
          {/* header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-lg font-semibold">Application Details</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-700"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* carousel */}
          <div className="relative p-3">
            <div className="h-48 md:h-60 rounded-lg bg-indigo-600 text-white grid place-items-center text-3xl font-semibold select-none">
              {/* If slides are URLs to images, show image, else show text */}
              {slides[idx].startsWith("http") ? (
                <img src={slides[idx]} alt={`Demo ${idx + 1}`} className="h-full w-full object-cover rounded-lg" />
              ) : (
                <span className="opacity-90">{String(slides[idx])}</span>
              )}
            </div>

            {/* arrows */}
            {slides.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white grid place-items-center"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white grid place-items-center"
                  aria-label="Next"
                >
                  ›
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 flex gap-2">
                  {slides.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i === idx ? "bg-white" : "bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* content */}
          <div className="h-[500px] grid md:grid-cols-2 gap-6 px-4 md:px-6 pb-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <div className="mt-1 text-sm text-slate-600">
                  <span className="font-medium">{item.org}</span> • {item.location}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {item.employment} • {item.salary}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Posted {item.posted}
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Application Deadline</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Applications must be submitted by{" "}
                  <span className="text-indigo-600 font-medium">{deadline ?? "—"}</span>
                </p>
                {item.notifyBy && (
                  <p className="mt-2 text-xs text-slate-400">
                    Winners will be notified by {item.notifyBy}
                  </p>
                )}
              </div>
            </div>

            <div className="md:border-l md:pl-6">
              <h4 className="font-semibold">Description</h4>
              <p className="mt-2 text-sm leading-6 text-slate-700 whitespace-pre-line">
                {item.description}
              </p>
            </div>
          </div>

          {/* footer */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 px-4 md:px-6 pb-6">
            <div className="flex-1">
              <h4 className="font-semibold">Application Deadline</h4>
              <p className="mt-1 text-sm text-slate-600">
                Applications must be submitted by{" "}
                <span className="text-indigo-600 font-medium">{deadline ?? "—"}</span>
              </p>
            </div>
            <div className="flex items-center gap-3 md:justify-end">
              <button
                onClick={onClose}
                className="h-11 rounded-lg border border-slate-200 px-6 text-slate-700 bg-white hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={contact}
                className="h-11 rounded-lg bg-indigo-600 px-8 text-white hover:bg-indigo-700"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
