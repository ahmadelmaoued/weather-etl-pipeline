/**
 * Formats API weather data for a 24-hour UI display.
 * Handles UTC to local time conversion and rounds temperature values.
 */
export function transformData(rawData) {
    // Process only the first 24 hours of data
    return rawData.hourly.time.slice(0, 24).map((t, i) => {
        
        // Ensure UTC interpretation by appending 'Z'
        const utcDate = new Date(t + "Z"); 
        
        const localTime = utcDate.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });

        return {
            time: localTime,
            temp: parseFloat(rawData.hourly.temperature_2m[i].toFixed(1))
        };
    });
}