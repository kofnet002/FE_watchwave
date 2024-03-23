import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// const time_stamp = new Date();

export const formattedTime = (time_stamp: any) => {
    // Convert the timestamp string to a Date object
    const timeObject = new Date(time_stamp);

    // Get the current time
    const hours = timeObject.getHours();
    const minutes = timeObject.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${amOrPm}`
    // console.log(`Current Time: ${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${amOrPm}`);

}

export const formattedDate = (time_stamp: string) => {
    // Convert the timestamp string to a Date object
    const dateObject = new Date(time_stamp);

    // Get the current date
    const day = dateObject.getUTCDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[dateObject.getUTCMonth()];
    const year = dateObject.getUTCFullYear();

    // Function to get the ordinal suffix for the day
    const getOrdinalSuffix = (number: number) => {
        if (number >= 11 && number <= 13) {
            return 'th';
        }
        const lastDigit = number % 10;
        switch (lastDigit) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };

    const ordinalSuffix = getOrdinalSuffix(day);
    return `${day}${ordinalSuffix} ${month}, ${year}`;
}