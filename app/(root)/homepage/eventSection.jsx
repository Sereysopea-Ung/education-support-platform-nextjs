import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function EventSection({
    items = [],
    title = '',
    propertyNames = {},
    showAction = true,
    actionLabel = 'Follow'
}) {
    const [showAll, setShowAll] = useState(false) || [];
    const visibleItems = showAll ? items : items.slice(0, 6);
    const [followStates, setFollowStates] = useState(items.map(() => false));
    

    const {
        image = 'img',
        label = 'name',
        course = 'course',
        year = 'year',
    } = propertyNames;

    const toggleFollow = (e, index) => {
        e.stopPropagation(); 
        setFollowStates((prev) => prev.map((state, i) => (i === index ? !state : state)));
    }

    const router = useRouter();
    const handleCLickedPeopleToFollow = () => {
        router.push('/peopleTofollow');
    };


    return (
            <div className="mt-3 ml-10 mr-5 w-full bg-gray-100 hover:cursor-pointer" onClick = {handleCLickedPeopleToFollow}>
              <div className='w-100'>
                <div className='bg-white border-b-1 border-solid overflow-hidden w-full rounded-2xl'>

                    <div className='relative'>
                        <p className="text-[20px] text-black p-4">{title}</p>
                    </div>

                    <div className='relative -mt-[50px]'>
                        <button onClick={(e) => {e.stopPropagation(); setShowAll(!showAll)}} className='text-[20px] text-blue-500 p-4 float-right transform transition-transform duration-200 hover:underline'>
                            {!showAll ? 'View More' : 'View Less'}
                        </button>

                        <hr className='border-b-1 border-gray-300 w-full clear-both'/>
                        <div className={`relative ${!showAll ? 'max-h-[280px]' : 'overflow-hidden'} overflow-y-auto px-4 mt-4`}>
                            {visibleItems.map((item, index) => (
                            <div key={index} className="flex items-center py-2 gap-4 mb-4">
                                <div className="w-15 h-15 border-1 border-black-50 rounded-full overflow-hidden">
                                    <img src={item[image]} alt={item[label]} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{item[label]}</p>
                                    <p className="text-sm text-gray-500">{item[course]} • {item[year] || 'N/A • N/A'}</p>
                                </div>
                                {showAction && (
                                    <button
                                        onClick={(e) => toggleFollow(e, index)}
                                        type="button"
                                        className={`border mr-1 rounded ${
                                                followStates[index]
                                                        ? 'bg-blue-500 text-white border-blue-500 px-2 py-2'
                                                        : 'border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white px-2 py-2'
                                            }
                                        `}
                                    >
                                        {followStates[index] ? 'Following' : actionLabel || 'Unknown Action'}
                                    </button>
                                )}
                            </div>
                            ))}
                        </div>
                    </div>
                </div>    
            </div>
        </div>    
    )
}
            
            