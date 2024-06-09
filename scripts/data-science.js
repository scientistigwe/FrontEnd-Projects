const charts = {
  airQualityChart: null,
  pollutionSourceChart: null,
  temporalTrendsCharts: [],
  spatialAnalysisChart: null,
  environmentalImpactChart: null,
};

function createAirQualityChart(siteData) {
  destroyChart(charts.airQualityChart);
  const ctx = document.getElementById("air-quality-chart").getContext("2d");
  charts.airQualityChart = new Chart(ctx, {
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
        y: { beginAtZero: true },
      },
    },
  });
}

function createPollutionSourceChart(siteData) {
  destroyChart(charts.pollutionSourceChart);
  const ctx = document
    .getElementById("pollution-source-chart")
    .getContext("2d");
  charts.pollutionSourceChart = new Chart(ctx, {
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

function createTemporalTrendsChart(aggregatedData, correlationData) {
  const ctx = document.getElementById("temporal-trends-chart").getContext("2d");
  console.log("Aggregated Data:", aggregatedData);
  console.log("Correlation Data:", correlationData);

  // Check if aggregatedData is not null or undefined
  if (
    aggregatedData &&
    Array.isArray(aggregatedData) &&
    aggregatedData.length > 0
  ) {
    // Create arrays to store site names and autocorrelation values
    const siteNames = [];
    const autocorrValues = [];

    // Loop through each site's data
    aggregatedData.forEach((siteData) => {
      if (!siteData || siteData.co_agg === undefined) {
        console.warn(
          "Skipping site:",
          siteData.site,
          "because CO aggregation data is missing."
        );
        return; // Skip this site and move to the next one
      }

      // Add site name and autocorrelation value to the arrays
      siteNames.push(siteData.site);
      autocorrValues.push(correlationData[siteData.site]?.co_autocorr || null);
    });

    // Create the chart using the aggregated data and correlation data
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: siteNames,
        datasets: [
          {
            label: "CO Autocorrelation",
            data: autocorrValues,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  } else {
    console.error("No aggregated data provided.");
  }
}

function createSpatialAnalysisChart(siteData) {
  destroyChart(charts.spatialAnalysisChart);
  const ctx = document
    .getElementById("spatial-analysis-chart")
    .getContext("2d");
  charts.spatialAnalysisChart = new Chart(ctx, {
    type: "scatter",
    data: {
      labels: ["Latitude", "Longitude"],
      datasets: [
        {
          label: "Geographical Coordinates",
          data: [{ x: siteData.latitude, y: siteData.longitude }],
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: { type: "linear", position: "bottom" },
        y: { beginAtZero: true },
      },
    },
  });
}

function createEnvironmentalImpactChart(siteData) {
  destroyChart(charts.environmentalImpactChart);
  const ctx = document
    .getElementById("environmental-impact-chart")
    .getContext("2d");
  charts.environmentalImpactChart = new Chart(ctx, {
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

// Function to destroy a chart
function destroyChart(chart) {
  if (chart) {
    chart.destroy();
    chart = null;
  }
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
  console.log("Site Data:", siteData);
  console.log("Selected Site:", selectedSite);

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

  console.log("Aggregated Data:", selectedAggregatedData);
  console.log("Correlation Data:", selectedCorrelationData);

  createAirQualityChart(selectedAggregatedData);
  createPollutionSourceChart(selectedAggregatedData);
  createTemporalTrendsChart(aggregatedData, correlationData); // Pass both aggregated and correlation data
  createSpatialAnalysisChart(selectedAggregatedData);
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
