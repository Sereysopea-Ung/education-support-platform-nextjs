import { useState } from "react";
import EditDescriptionCard from "./editDescription"

export default function MenuOptions (){

    const [showEditCard, setShowEditCard] = useState(false);
    const toggleEditCard = () => {setShowEditCard(!showEditCard);};

  return (
    <div className="absolute">
        <div className="w-48 rounded-lg shadow-lg border bg-white p-3 space-y-4 ml-[360px]">
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded" onClick = {toggleEditCard}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.33268 3.33336H2.99935C2.64573 3.33336 2.30659 3.47384 2.05654 3.72388C1.80649 3.97393 1.66602 4.31307 1.66602 4.66669V12C1.66602 12.3536 1.80649 12.6928 2.05654 12.9428C2.30659 13.1929 2.64573 13.3334 2.99935 13.3334H10.3327C10.6863 13.3334 11.0254 13.1929 11.2755 12.9428C11.5255 12.6928 11.666 12.3536 11.666 12V8.66669M10.7234 2.39069C10.8463 2.26335 10.9935 2.16177 11.1561 2.09189C11.3188 2.02201 11.4938 1.98523 11.6708 1.98369C11.8479 1.98215 12.0234 2.01589 12.1873 2.08293C12.3512 2.14997 12.5 2.24898 12.6252 2.37417C12.7504 2.49936 12.8494 2.64823 12.9164 2.81209C12.9835 2.97595 13.0172 3.15152 13.0157 3.32856C13.0141 3.5056 12.9774 3.68056 12.9075 3.84323C12.8376 4.0059 12.736 4.15303 12.6087 4.27603L6.88468 10H4.99935V8.11469L10.7234 2.39069Z" stroke="#3763AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-800 font-medium">Edit</span>
            </div>
                
            {showEditCard && (
                <EditDescriptionCard onClose={() => setShowEditCard(false)} 
                onSave={(newDesc) => {
                        console.log("Saved desc in parent:", newDesc);
                        // send to API or update state
                    }}
                />
            )}

            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6667 6.33333H2.33333M11.6667 6.33333C12.0203 6.33333 12.3594 6.47381 12.6095 6.72386C12.8595 6.97391 13 7.31304 13 7.66667V11.6667C13 12.0203 12.8595 12.3594 12.6095 12.6095C12.3594 12.8595 12.0203 13 11.6667 13H2.33333C1.97971 13 1.64057 12.8595 1.39052 12.6095C1.14048 12.3594 1 12.0203 1 11.6667V7.66667C1 7.31304 1.14048 6.97391 1.39052 6.72386C1.64057 6.47381 1.97971 6.33333 2.33333 6.33333M11.6667 6.33333V5C11.6667 4.64638 11.5262 4.30724 11.2761 4.05719C11.0261 3.80714 10.687 3.66667 10.3333 3.66667M2.33333 6.33333V5C2.33333 4.64638 2.47381 4.30724 2.72386 4.05719C2.97391 3.80714 3.31304 3.66667 3.66667 3.66667M10.3333 3.66667V2.33333C10.3333 1.97971 10.1929 1.64057 9.94281 1.39052C9.69276 1.14048 9.35362 1 9 1H5C4.64638 1 4.30724 1.14048 4.05719 1.39052C3.80714 1.64057 3.66667 1.97971 3.66667 2.33333V3.66667M10.3333 3.66667H3.66667" stroke="#56D88E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-800 font-medium">Collection</span>
            </div>

            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded">
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99936 5.00008V6.33341M6.99936 9.00008H7.00603M2.38069 11.6667H11.618C12.6447 11.6667 13.286 10.5554 12.7727 10.0001L8.15403 1.66674C7.64069 1.11141 6.84469 1.11141 6.33269 1.66674L1.48736 10.0001C0.974025 10.5554 1.61536 11.6667 2.64203 11.6667H2.38069Z" stroke="#E01B1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-800 font-medium">Report</span>
            </div>
        </div>
    </div>
  );
};

