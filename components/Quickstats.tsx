'use client';

const QuickStats = () => {
    return (
        <div className="fixed mt-125 l-0 m-2 bg-[#E5E7EB] rounded-lg w-2/13">
            <h4 className="text-sm font-extrabold p-2">Quick Stats</h4>
            <div className="flex justify-items-stretch text-sm border-b border-gray-100">
                <menu className="w-full ">
                    <p className="flex justify-between text-sm p-2">
                        <span>Posts</span> <span className="text-black">89</span>
                    </p>
                    <p className="flex justify-between text-sm p-2">
                        <span>Followers</span> <span className="text-black">156</span>
                    </p>
                    <p className="flex justify-between text-sm p-2">
                        <span>Following</span> <span className="text-black">23</span>
                    </p>
                </menu>
            </div>
        </div>
    );
}

export default QuickStats;
