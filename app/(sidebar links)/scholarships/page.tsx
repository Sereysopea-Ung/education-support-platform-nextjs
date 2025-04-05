'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ScholarshipsPage() {
    const [allScholarships, setAllScholarships] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAllScholarships = async () => {
            try {
                const res = await fetch('/api/getAllScholarships');
                if (!res.ok) {
                    throw new Error('Failed to fetch all scholarships');
                }
                const data = await res.json();
                setAllScholarships(data);
            } catch (err) {
                setError('Error fetching all scholarships');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllScholarships();
    }, []);

    const { data: session, status } = useSession();

    if (loading) {
        return <div className="lg:mt-16 lg:ml-54 px-5">Loading scholarships...</div>;
    }

    if (error) {
        return <div className="mt-16 px-5 text-red-500">{error}</div>;
    }

    return (
        <div className="lg:mt-20 px-5 grid grid-cols-12">
            <div className={session?.user ? "lg:col-span-10 col-span-12 lg:col-start-3 gap-5" : "mt-16 lg:mt-0 col-span-12"}>
                {/* Adjusting the grid layout for scholarships */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                    {allScholarships.map((scholarship: any) => (
                        <li
                            key={scholarship._id}
                            className="flex flex-col justify-between items-start rounded-xl border shadow-md border-gray-100 h-full w-full mb-4 p-5"
                        >
                            <div className="flex w-full justify-between">
                                <div className="flex flex-col">
                                    <div className="font-bold">{scholarship.scholarshipTitle}</div>
                                    <div className="text-gray-600">{scholarship.forApplicant}</div>
                                </div>
                                <div className="bg-green-500 text-white rounded-[10px] min-w-[80px] text-center h-1/2 px-2">
                                    {scholarship.amountOfMoney} $
                                </div>
                            </div>
                            <div className="text-blue-600 cursor-pointer">Apply Now</div>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
}
