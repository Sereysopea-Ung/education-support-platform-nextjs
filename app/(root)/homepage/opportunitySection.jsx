"use client";

import { useState, useEffect } from "react";

export default function OppSection() {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [jobsRes, scholarshipsRes] = await Promise.all([
          fetch("/api/getTopJob"),
          fetch("/api/getTopScholarship"),
        ]);

        if (!jobsRes.ok || !scholarshipsRes.ok)
          throw new Error("Failed to fetch opportunities");

        const jobs = await jobsRes.json();
        const scholarships = await scholarshipsRes.json();

        setOpportunities([...jobs, ...scholarships]);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      }
    })();
  }, []);

  return (
    <div className="opp-section border-1 border-gray-300 bg-white rounded-lg p-4 ml-5 mt-5">
      <h2 className="text-lg font-bold mb-3">Latest Opportunities</h2>
      <div className="space-y-3">
        {opportunities.map((opp) => (
          <div key={opp._id} className="p-3 bg-[#E5E7EB] rounded-lg">
            <p className="font-medium">{opp.jobTitle || opp.scholarshipTitle || "No title"}</p>
            <p className="text-sm text-gray-500">
              {opp.companyName || opp.typeofcoverage || "N/A"}
            </p>
          </div>
        ))}
      </div> 
    </div>
  );
}
