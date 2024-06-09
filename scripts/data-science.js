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

function createTemporalTrendsChart(dataForPlotting) {
  const ctx = document.getElementById("temporal-trends-chart").getContext("2d");

  // Check if dataForPlotting is not null or undefined
  if (dataForPlotting && Object.keys(dataForPlotting).length > 0) {
    // Loop through each site's data
    for (const site in dataForPlotting) {
      if (dataForPlotting.hasOwnProperty(site)) {
        const siteData = dataForPlotting[site];
        // Ensure siteData.co_autocorr is not null or undefined
        if (siteData && siteData.co_autocorr) {
          const labels = Object.keys(siteData.co_autocorr); // Assuming keys are date/time
          const dataValues = Object.values(siteData.co_autocorr);

          new Chart(ctx, {
            type: "line",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "CO Autocorrelation",
                  data: dataValues,
                  borderColor: "rgba(75, 192, 192, 1)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  fill: false,
                  tension: 0.1,
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
          console.error("Site data or CO autocorrelation data is missing.");
        }
      }
    }
  } else {
    console.error("No data for plotting provided.");
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
      if (data && data.site_data) {
        // Store fetched data in local storage for future use
        localStorage.setItem("siteData", JSON.stringify(data.site_data));
        processData(data.site_data, selectedSite);
      } else {
        throw new Error("Invalid data structure");
      }
    }
  } catch (error) {
    console.error("Error fetching or displaying data:", error);
  }
}

function processData(siteData, selectedSite) {
  let selectedData = siteData.find((site) => site.site === selectedSite);
  if (!selectedData) {
    throw new Error("Data not found for the selected site");
  }
  createAirQualityChart(selectedData);
  createPollutionSourceChart(selectedData);
  createTemporalTrendsChart(siteData);
  createSpatialAnalysisChart(selectedData);
  createEnvironmentalImpactChart(selectedData);
}

document.addEventListener("DOMContentLoaded", () => {
  const siteFilter = document.getElementById("site-filter");
  siteFilter.addEventListener("change", handleSiteFilterChange);
  // Initial load
  loadSiteData(siteFilter.value);
});

function handleSiteFilterChange() {
  const selectedSite = document.getElementById("site-filter").value;
  loadSiteData(selectedSite);
}
