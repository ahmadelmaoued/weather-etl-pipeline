/**
 * Fetches hourly temperature data from the Open-Meteo API.
 * @param {number} lat - Latitude coordinates.
 * @param {number} lon - Longitude coordinates.
 * @throws {Error} If the network response is not 2xx.
 */
export async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=GMT`;
    
    const res = await fetch(url);
    
    if (!res.ok) {
        throw new Error(`Weather API error: ${res.status} ${res.statusText}`);
    }
    
    return await res.json();
}