'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function JobsPage() {
    const [mostApplyJobs, setMostApplyJobs] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMostApplyJobs = async () => {
            try {
                const res = await fetch('/api/getAllJobs');
                if (!res.ok) {
                    throw new Error('Failed to fetch most applied jobs');
                }
                const data = await res.json();
                setMostApplyJobs(data);
            } catch (err) {
                setError('Error fetching most applied jobs');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMostApplyJobs();
    }, []);

    const { data: session, status } = useSession();

    if (loading) {
        return <div className="lg:mt-16 lg:ml-54 px-5">Loading jobs...</div>;
    }

    if (error) {
        return <div className="mt-16 px-5 text-red-500">{error}</div>;
    }

    return (
        <div className="lg:mt-16 pt-4 bg-white text-black px-5 grid grid-cols-12 w-full min-w-screen min-h-screen">
            <div className={session?.user ? "lg:col-span-10 col-span-12 lg:col-start-3 gap-5" : "mt-16 lg:mt-0 col-span-12"}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                    {mostApplyJobs.map((job: any) => (
                        <li
                            key={job._id}
                            className="flex flex-col justify-between items-start rounded-xl border shadow-md border-gray-100 h-full w-full mb-4 p-5"
                        >
                            <div className="flex w-full justify-between">
                                <div className="flex flex-col">
                                    <div className="font-bold">{job.jobTitle}</div>
                                    <div className="text-gray-600">{job.companyName}</div>
                                </div>
                                <div className="bg-green-500 text-white rounded-[10px] min-w-[80px] text-center h-1/2 px-2">
                                    {job.numberOfApplication} applied
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
