# Weather Data ETL Pipeline

A lightweight JavaScript application that demonstrates a professional **Extract, Transform, Load (ETL)** workflow using the Open-Meteo API.

## 🚀 Key Features
- **Data Orchestration:** Managed pipeline that handles asynchronous API fetching, data cleaning, and UI rendering.
- **Security First:** Implements XSS protection by sanitizing data inputs via `textContent`.
- **Responsive Visualization:** Dynamic data rendering using **Chart.js**.
- **State Management:** Persists data to `localStorage` and manages UI loading states to prevent race conditions.

## 🛠️ Tech Stack
- **HTML5
- **JavaScript (ES6+ Modules)** - Clean, modular code structure.
- **Chart.js** - For trend visualization.
- **Open-Meteo API** - High-resolution meteorological data.
- **CSS3** - Custom dashboard styling.

## 🏗️ Architecture: The ETL Process
1. **Extract:** Fetches raw hourly UTC data from a REST API.
2. **Transform:** Normalizes ISO timestamps to browser-local time and rounds metrics for UI consistency.
3. **Load:** Stores the processed dataset in `localStorage` and updates the chart instance.

## 🚥 Getting Started
Simply clone the repo and open `index.html` in any modern browser. No build steps required!

