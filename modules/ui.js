// Persistent chart instance to prevent memory leaks and canvas collisions
let chartInstance = null;

/**
 * Appends messages to the UI console with basic sanitization.
 */
export function log(message, type) {
    const consoleBox = document.getElementById('logConsole');
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    
    const timestamp = new Date().toLocaleTimeString([], { hour12: false });
    
    // Using textContent to sanitize input and prevent XSS injection
    entry.textContent = `[${timestamp}] ${message}`;
    
    consoleBox.appendChild(entry);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

/**
 * Renders the weather trend chart. 
 * Cleans up existing instances to ensure smooth re-renders.
 */
export function updateChart(data) {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    
    // Destroy previous instance to clear the canvas context
    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.time),
            datasets: [{
                label: 'Temperature (°C)',
                data: data.map(d => d.temp),
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: { 
            responsive: true,
            plugins: {
                legend: { labels: { color: '#94a3b8' } }
            },
            scales: {
                y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
                x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
            }
        }
    });
}

/**
 * Resets the chart state for clean UI transitions.
 */
export function clearChart() {
    if (chartInstance) chartInstance.destroy();
}

