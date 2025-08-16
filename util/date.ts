import { format } from 'date-fns';

const formatDate = (date: string | Date): string => {
    console.log("Date input:", date); // Log the date to check its value
    const parsedDate = new Date(date);

    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
        console.error("Invalid date:", date);
        return "Invalid Date"; // Return an error message or a fallback value
    }

    return format(parsedDate, "dd.MMM.yy • h:mma");
};

export default formatDate;