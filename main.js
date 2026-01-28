import { fetchWeather } from './modules/api.js';
import { transformData } from './modules/transform.js';
import { log, updateChart, clearChart } from './modules/ui.js';

// Default coordinates (Beirut)
const CONFIG = { lat: 33.89, lon: 35.50 };

/**
 * Orchestrates the ETL pipeline: 
 * 1. Extract (API) -> 2. Transform (Format) -> 3. Load (Storage/UI)
 */
async function runPipeline() {
    const runBtn = document.getElementById('runBtn');
    
    // UI Feedback: Prevent concurrent clicks and show loading state
    runBtn.disabled = true;
    runBtn.innerText = "Processing...";

    try {
        log("EXTRACTION: Fetching UTC data from Open-Meteo...", "extract");
        const rawData = await fetchWeather(CONFIG.lat, CONFIG.lon);

        log("TRANSFORMATION: Converting UTC to browser local time...", "transform");
        const cleanData = transformData(rawData);

        log("LOADING: Synchronizing local storage and UI...", "load");
        
        // Persist data for offline/session availability
        localStorage.setItem('pipeline_db', JSON.stringify(cleanData));
        updateChart(cleanData);

    } catch (err) {
        // Centralized error handling for the entire pipeline
        log(`CRITICAL: ${err.message}`, "error");
    } finally {
        // Always restore UI state regardless of success or failure
        runBtn.disabled = false;
        runBtn.innerText = "Run Pipeline";
    }
}

// Event Listeners
document.getElementById('runBtn').addEventListener('click', runPipeline);

document.getElementById('clearBtn').addEventListener('click', () => {
    localStorage.removeItem('pipeline_db');
    clearChart();
    log("WAREHOUSE: Data cleared.", "error");
});



