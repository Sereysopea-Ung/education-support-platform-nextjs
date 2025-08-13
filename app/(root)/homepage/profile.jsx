import { useRouter } from "next/navigation";
export default function ProfileInfo (
{
    items = {},
    propertyNames = {}
}) {
    const router = useRouter();
    
    const {
        profile = "img",
        label = 'name',
        course = 'course',
        year = 'year'
    } = propertyNames;


    return(
        <div className="mt-18 ml-5 pt-5 flex items-center gap-5 hover:cursor-pointer" onClick={() => router.push('/profileacc')}>
            <div className="w-18 h-18 border-1 border-solid border-black-50 rounded-full overflow-hidden">
                <img
                    src={items[profile] || '/default_avatar.svg'}
                    alt={items[label]}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-2">
                <span className="block text-[20px]">
                    {items[label] || 'Unknown'}
                </span>                    
                <span className="block text-gray-600">
                    {items[course] || 'N/A'} <br /> ● {items[year] || 'N/A'}
                </span>
            </div>
        </div>
    )
}