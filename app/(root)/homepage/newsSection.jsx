import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function NewsSection({ items = [], title = '', propertyNames = {} }) {
    const { university = 'uni', description = 'des', img = 'img', date = 'date', time = 'time', read = 'read' } = propertyNames;

    const [showAll, setShowAll] = useState(false);
    const visibleNews = showAll ? items : items.slice(0, 3);

    const router = useRouter();
    const handleViewMoreClick = () => {
        router.push('/news');
      };

    return (
        <div className="mt-6 ml-10 mr-5 w-full bg-gray-100">
            <div className="w-100">
                <div className="bg-white border-b border-solid overflow-hidden w-full rounded-2xl">
                    <div className="relative">
                        <p className="text-[20px] text-black p-4">{title}</p>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="text-[20px] text-blue-500 p-4 float-right -mt-12 transform transition-transform duration-200 hover:underline"
                        >
                            <p onClick={handleViewMoreClick} className='hover:cursor-pointer'>View More</p>
                        </button>

                        <div
                            className={`relative overflow-y-auto px-4 mt-4 clear-both ${
                                !showAll ? "max-h-[880px]" : "max-h-[880px]"
                            }`}
                        >
                            {visibleNews.map((item, index) => (
                                <div key={index} className="flex items-center py-2 gap-4 mb-4">
                                    <div className="flex-1">
                                        <div className="bg-white w-full p-5 rounded-xl shadow-md">
                                            <div className="flex items-center mb-4">
                                                <img
                                                    src={item[img] || 'logo.png'}
                                                    alt="University Logo"
                                                    className="w-15 h-15 rounded-full mr-3"
                                                />
                                                <h2 className="text-lg">{item[university]}</h2>
                                            </div>
                                            <p className="text-[15px] text-gray-800 leading-relaxed mb-4">
                                                {item[description]}
                                            </p>
                                            <div className="text-xs text-gray-500 mb-2">
                                                <p className='text-[15px]'>{item[date]} • {item[time]}</p>
                                                <p className='text-[15px] mt-[-20px] flex justify-end'>{item[read]} reads</p>
                                            </div>
                                            <button 
                                            onClick={handleViewMoreClick} 
                                            className="text-center justify-center align-middle text-black-600 cursor-pointer ml-35 mt-2"
                                            >
                                            See more
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
