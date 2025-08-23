import React from 'react';

type Props = {
    loading?: boolean;
    disabled?: boolean;
};

export default function SaveChange({ loading, disabled }: Props) {
    return (
        <div>
            {/* Save Changes Button */}
            <button
                type="submit"
                className="w-full sm:w-[200px] bg-blue-600 text-white font-medium py-3 px-6 
                            rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none 
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 
                            transition-colors disabled:opacity-50 hover:cursor-not-allowed"
                disabled={disabled}
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
}

