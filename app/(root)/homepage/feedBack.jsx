import React, { useState } from 'react';

export default function FeedbackForm({onClose}) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        if (!rating || !feedback.trim()) {
            alert("Please provide a rating and feedback.");
        return;
        }

        // Handle your submit logic here (API or console)
        console.log("Rating:", rating);
        console.log("Feedback:", feedback);
        alert("Thank you for your feedback!");
        
        // Reset
        setRating(0);
        setFeedback('');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"
                onClick={onClose}
            />

            <div className="w-[700px] mx-auto h-[600px] bg-white shadow-lg rounded-xl p-6 mt-10 z-[9999]">
                <h2 className="text-[35px] font-semibold text-center mb-16">How was your experience?</h2>

                {/* Stars */}
                <div className="flex justify-center mb-16 gap-x-5">
                    {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        className={`w-10 h-10 cursor-pointer transition ${
                        (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(star)}
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.259 3.888a1 1 0 00.95.69h4.1c.969 0 1.371 1.24.588 1.81l-3.32 2.41a1 1 0 00-.364 1.118l1.259 3.888c.3.921-.755 1.688-1.538 1.118L10 13.347l-3.32 2.41c-.783.57-1.838-.197-1.538-1.118l1.259-3.888a1 1 0 00-.364-1.118l-3.32-2.41c-.783-.57-.38-1.81.588-1.81h4.1a1 1 0 00.95-.69l1.259-3.888z" />
                    </svg>
                    ))}
                </div>

                {/* Feedback Textarea */}
                <textarea
                    className="w-[90%] ml-8 h-45 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                    placeholder="Write your feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />

                {/* Submit Button */}
                <button
                    className={`w-[90%] ml-8 h-[50px] mt-12 py-2 text-white text-[20px] rounded-md transition ${
                    rating && feedback.trim()
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                    onClick={handleSubmit}
                    disabled={!rating || !feedback.trim()}
                >
                    Submit Feedback
                </button>
            </div>
        </div>
    );
}
