import { type } from "os";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OppSection({
  items = [],
  title = "",
  propertyName = {},
}) {
  const [showAll, setShowAll] = useState(false);
  const visibleOpp = showAll ? items : items?.slice?.(0, 3);

  const {category = "type", position = "pos" } = propertyName;

  const router = useRouter();
  const handleOpportunityClick = () => {
    router.push("/opportunity");
  };

  return (
    <div className="mt-6 ml-10 mr-5 w-full bg-gray-100">
      <div className="w-100">
        <div className="bg-white border-b-1 border-solid overflow-hidden w-full rounded-2xl">
          <div className="relative">
            <p className="text-[20px] text-black p-4">{title}</p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[20px] text-blue-500 p-4 float-right -mt-12 transform transition-transform duration-200 hover:underline"
            >
              <p onClick = {handleOpportunityClick} className="hover:cursor-pointer">View More</p>
            </button>

            <div
              className={`relative ${
                !showAll ? "max-h-[280px]" : "max-h-[280px]"
              } `}
            >
              {visibleOpp.map((item, index) => (
                <div key={index} className="flex items-center py-2 gap-4 mb-4">
                  <div className="flex-1 ml-5">
                    <p className="text-[20px] mt-2 mb-1">
                      {item[category] || "N/A"}
                    </p>
                    <p className="text-[15px] text-gray-500 ">
                      {item[position] || "N/A"}
                    </p>
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
