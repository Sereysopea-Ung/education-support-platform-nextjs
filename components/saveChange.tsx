import React from 'react';
import { useState } from 'react';

export default function SaveChange() {
    
    const [isSaved, setIsSaved] = useState(false);
    const handleSaved = () => {
        setIsSaved(!isSaved);
    };

    return (
        <div>
            {/* Save Changes Button */}
            <button
                type="submit"
                className="w-full sm:w-[200px] bg-blue-600 text-white font-medium py-3 px-6 
                            rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none 
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 
                            transition-colors disabled:opacity-50 hover:cursor-pointer"
                onClick={handleSaved} 
                disabled={isSaved} 
                >
                {isSaved ? "Saved..." : "Save Changes"}
            </button>
        </div>
    );
}

