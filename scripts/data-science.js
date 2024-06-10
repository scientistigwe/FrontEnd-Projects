let airQualityChartInstance = null;
let pollutionSourceChartInstance = null;
let temporalTrendsChartInstance = null;
let environmentalImpactChartInstance = null;

function destroyChart(chart) {
  if (chart) {
    chart.destroy();
  }
}

// Air Quality Chart
function createAirQualityChart(siteData) {
  destroyChart(airQualityChartInstance);
  const ctx = document.getElementById("air-quality-chart").getContext("2d");
  airQualityChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["CO", "NOx", "NO2", "SO2", "PM10", "PM2.5"],
      datasets: [
        {
          label: "Pollutant Levels",
          data: [
            siteData.co_agg,
            siteData.nox_agg,
            siteData.no2_agg,
            siteData.so2_agg,
            siteData.pm10_agg,
            siteData.pm25_agg,
          ],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

// Pollution Source Chart
function createPollutionSourceChart(siteData) {
  destroyChart(pollutionSourceChartInstance);
  const ctx = document
    .getElementById("pollution-source-chart")
    .getContext("2d");
  pollutionSourceChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["NO", "NO2"],
      datasets: [
        {
          label: "Pollution Source",
          data: [siteData.no_agg, siteData.no2_agg],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
  });
}

// Temporal Trends Chart
function createTemporalTrendsChart(aggregatedData, correlationData) {
  destroyChart(temporalTrendsChartInstance);
  const ctx = document.getElementById("temporal-trends-chart").getContext("2d");

  if (
    aggregatedData &&
    Array.isArray(aggregatedData) &&
    aggregatedData.length > 0
  ) {
    const siteNames = [];
    const autocorrValues = [];

    aggregatedData.forEach((siteData) => {
      if (!siteData || siteData.co_agg === undefined) {
        console.warn(
          "Skipping site:",
          siteData.site,
          "because CO aggregation data is missing."
        );
        return;
      }

      siteNames.push(siteData.site);
      autocorrValues.push(correlationData[siteData.site]?.co_autocorr || null);
    });

    temporalTrendsChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: siteNames,
        datasets: [
          {
            label: "Carbon Monoxide Autocorrelation",
            data: autocorrValues,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  } else {
    console.error("No aggregated data provided.");
  }
}

// Spatial Analysis Map
function createSpatialAnalysisMap(siteData) {
  const mapElement = document.getElementById("spatial-analysis-map");

  // Remove any existing map instance
  if (mapElement._leaflet_id) {
    mapElement._leaflet_id = null;
    mapElement.innerHTML = "";
  }

  const map = L.map("spatial-analysis-map").setView(
    [siteData.lat_agg, siteData.lon_agg],
    13
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([siteData.lat_agg, siteData.lon_agg])
    .addTo(map)
    .bindPopup(
      `<b>${siteData.site}</b><br>Latitude: ${siteData.lat_agg}<br>Longitude: ${siteData.lon_agg}`
    )
    .openPopup();
}

// Environmental Impact Chart
function createEnvironmentalImpactChart(siteData) {
  destroyChart(environmentalImpactChartInstance);
  const ctx = document
    .getElementById("environmental-impact-chart")
    .getContext("2d");
  environmentalImpactChartInstance = new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["Wind Speed", "Wind Direction", "Air Temperature"],
      datasets: [
        {
          label: "Environmental Factors",
          data: [
            siteData.wind_speed_agg,
            siteData.wind_dir_agg,
            siteData.air_temp_agg,
          ],
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        r: { beginAtZero: true },
      },
    },
  });
}

async function loadSiteData(selectedSite) {
  try {
    // Check if data is already stored in local storage
    const storedData = localStorage.getItem("siteData");
    if (storedData) {
      // If data is already stored, parse and use it directly
      const parsedData = JSON.parse(storedData);
      processData(parsedData, selectedSite);
    } else {
      // If data is not stored, fetch it from the server
      const response = await fetch(
        `http://127.0.0.1:8000/api/sensors/filter_and_aggregate_data/`
      );
      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response");
      }

      const data = await response.json();

      // Check if both site_data and data_for_plotting are present
      if (data && data.site_data && data.data_for_plotting) {
        // Store fetched data in local storage for future use
        localStorage.setItem("siteData", JSON.stringify(data));
        processData(data, selectedSite); // Pass entire data object
      } else {
        throw new Error("Invalid data structure");
      }
    }
  } catch (error) {
    console.error("Error fetching or displaying data:", error);
  }
}

async function processData(siteData, selectedSite) {
  if (!siteData || !siteData.site_data || !siteData.data_for_plotting) {
    throw new Error("Invalid site data structure");
  }

  const aggregatedData = siteData.site_data;
  const correlationData = siteData.data_for_plotting; // Access the entire correlation data object

  const selectedAggregatedData = aggregatedData.find(
    (site) => site.site === selectedSite
  );
  if (!selectedAggregatedData) {
    throw new Error("Aggregated data not found for the selected site");
  }

  const selectedCorrelationData = correlationData[selectedSite];
  if (!selectedCorrelationData) {
    throw new Error("Correlation data not found for the selected site");
  }

  createAirQualityChart(selectedAggregatedData);
  createPollutionSourceChart(selectedAggregatedData);
  createTemporalTrendsChart(aggregatedData, correlationData);
  createSpatialAnalysisMap(selectedAggregatedData);
  createEnvironmentalImpactChart(selectedAggregatedData);
}

document.addEventListener("DOMContentLoaded", () => {
  const siteFilter = document.getElementById("site-filter");
  siteFilter.addEventListener("change", handleSiteFilterChange);
  // Initial load
  loadSiteData(siteFilter.value);
});

async function handleSiteFilterChange() {
  const selectedSite = document.getElementById("site-filter").value;
  loadSiteData(selectedSite);
}
