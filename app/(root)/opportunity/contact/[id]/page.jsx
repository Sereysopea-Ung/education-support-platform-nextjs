"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

// TODO: Replace with your actual data fetching (server action, API route, or store)
async function fetchOpportunityById(id) {
  if (!id) return null;
  try {
    const res = await fetch(`/api/opportunities/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch opportunity");
    return await res.json();
  } catch (err) {
    // Fallback stub while API is not ready
    return {
      id,
      title: "Sample Opportunity",
      type: "opportunity",
      contact: {
        email: "scholarships@techfoundation.org",
        phone: "(555) 123-4567",
        address: "123 Tech Foundation Blvd\nInnovation City, CA 94105",
        hours:
          "Monday - Friday: 9:00 AM – 5:00 PM PST\nSaturday: 10:00 AM – 2:00 PM PST",
        process:
          "Send your application materials to scholarships@techfoundation.org with the subject line 'CS Excellence Scholarship Application - [Your Name]'. Include your resume, transcript, and a personal statement explaining your academic goals and financial need.",
      },
    };
  }
}

// Helpers
const Ic = ({ children }) => (
  <div className="w-9 h-9 grid place-items-center rounded-md bg-indigo-600 text-white">
    {children}
  </div>
);

function Row({ icon, label, body }) {
  return (
    <div className="flex gap-3 items-start rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <Ic>{icon}</Ic>
      <div className="flex-1">
        <div className="text-sm font-semibold">{label}</div>
        <div className="mt-0.5 text-sm text-slate-700">{body}</div>
      </div>
    </div>
  );
}

function telHref(phone) {
  // Strip spaces and punctuation for a valid tel: link
  return "tel:" + String(phone || "").replace(/[^\d+]/g, "");
}

// Contact overlay UI (no routing concerns)
function ContactOverlay({ item, onClose }) {
  if (!item) return null;

  const c = {
    email: item.contact?.email || "scholarships@techfoundation.org",
    phone: item.contact?.phone || "(555) 123-4567",
    address:
      item.contact?.address ||
      "123 Tech Foundation Blvd\nInnovation City, CA 94105",
    hours:
      item.contact?.hours ||
      "Monday - Friday: 9:00 AM – 5:00 PM PST\nSaturday: 10:00 AM – 2:00 PM PST",
    process:
      item.contact?.process ||
      "Send your application materials to scholarships@techfoundation.org with the subject line 'CS Excellence Scholarship Application - [Your Name]'. Include your resume, transcript, and a personal statement explaining your academic goals and financial need.",
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      {/* panel */}
      <div className="relative h-full overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-2xl">
          {/* header */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="text-xl font-semibold lowercase">contact</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-700"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* icon + title */}
          <div className="px-6 pt-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 grid place-items-center text-indigo-600 text-2xl">
              ✉️
            </div>
            <h3 className="mt-4 text-lg font-semibold">Contact Information</h3>
            <p className="mt-1 text-sm text-slate-500">
              Get in touch with us to apply for this {item.type || "opportunity"}.
            </p>
          </div>

          {/* cards */}
          <div className="px-6 pb-6 space-y-3 mt-5">
            <Row
              icon="📧"
              label="Email"
              body={
                <a
                  className="text-indigo-600 hover:underline"
                  href={`mailto:${c.email}?subject=${encodeURIComponent(
                    `[Application] ${item.title || "Opportunity"}`
                  )}`}
                >
                  {c.email}
                </a>
              }
            />
            <Row
              icon="📞"
              label="Phone"
              body={
                <a className="text-indigo-600 hover:underline" href={telHref(c.phone)}>
                  {c.phone}
                </a>
              }
            />
            <Row
              icon="📍"
              label="Address"
              body={<pre className="whitespace-pre-wrap font-sans">{c.address}</pre>}
            />
            <Row
              icon="⭐"
              label="Office Hours"
              body={<pre className="whitespace-pre-wrap font-sans">{c.hours}</pre>}
            />

            {/* process box */}
            <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-4">
              <div className="font-semibold text-slate-700">Application Process</div>
              <p className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">
                {c.process}
              </p>
            </div>

            {/* footer */}
            <div className="pt-3 pb-4 flex justify-center">
              <button
                onClick={onClose}
                className="h-11 w-40 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page({ params }) {
  const router = useRouter();

  const resolvedParams = React.use(params);
  const id = resolvedParams?.id;

  const [item, setItem] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;

    if (!id) {
      setItem(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchOpportunityById(id)
      .then((data) => {
        if (active) setItem(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const onClose = React.useCallback(() => {
    router.back();
  }, [router]);

  // Loading overlay
  if (loading) {
    return (
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/50" aria-hidden />
        <div className="relative h-full overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-2xl p-6">
            <div className="text-center text-slate-600">Loading…</div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={onClose}
                className="h-10 rounded-md border border-slate-200 px-4 text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error/fallback overlay
  if (!item) {
    return (
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/50" aria-hidden />
        <div className="relative h-full overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-2xl p-6">
            <div className="text-center text-red-600">Unable to load opportunity.</div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={onClose}
                className="h-10 rounded-md border border-slate-200 px-4 text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <header>
        <title>S3TUDY | Contact</title>
      </header>
      <ContactOverlay item={item} onClose={onClose} />
    </>
  );
}