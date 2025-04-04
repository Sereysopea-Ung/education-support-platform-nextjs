'use client';

const QuickStats = () => {
    return (
        <div className="lg:fixed lg:mt-125 lg:left-0 lg:w-2/13 lg:m-2 bg-[#E5E7EB] rounded-lg w-25 sm:w-30">
            <h4 className="font-extrabold p-2 lg:text-lg md:text-md sm:text-sm text-xs">Quick Stats</h4>
            <div className="flex justify-items-stretch lg:text-lg md:text-md sm:text-sm text-xs border-b border-gray-100">
                <menu className="w-full ">
                    <p className="flex justify-between lg:text-lg md:text-md sm:text-sm text-xs p-2">
                        <span>Posts</span> <span className="text-black">89</span>
                    </p>
                    <p className="flex justify-between lg:text-lg md:text-md sm:text-sm text-xs p-2">
                        <span>Followers</span> <span className="text-black">156</span>
                    </p>
                    <p className="flex justify-between lg:text-lg md:text-md sm:text-sm text-xs p-2">
                        <span>Following</span> <span className="text-black">23</span>
                    </p>
                </menu>
            </div>
        </div>
    );
}

export default QuickStats;
