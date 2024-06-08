// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch("/api/sensordata/filter_and_aggregate_data/");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // You might want to handle this error in your application
  }
}

// Function to create a bar chart for core sensor data
function createCoreSensorChart(data) {
  const ctx = document.getElementById("core-sensor-chart").getContext("2d");
  const labels = data.device_aggregation.map((item) => item.device);
  const coData = data.device_aggregation.map((item) => item.avg_co);
  const humidityData = data.device_aggregation.map((item) => item.avg_humidity);
  const tempData = data.device_aggregation.map((item) => item.avg_temp);
  const lpgData = data.device_aggregation.map((item) => item.avg_lpg);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Average CO",
          data: coData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Average Humidity",
          data: humidityData,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Average Temp",
          data: tempData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Average LPG",
          data: lpgData,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Function to create a line chart for hourly aggregation data
function createHourlyAggregationChart(data) {
  const ctx = document
    .getElementById("hourly-aggregation-chart")
    .getContext("2d");
  const labels = data.hourly_aggregation.map((item) => item.hour);
  const coData = data.hourly_aggregation.map((item) => item.avg_co);
  const humidityData = data.hourly_aggregation.map((item) => item.avg_humidity);
  const tempData = data.hourly_aggregation.map((item) => item.avg_temp);
  const lpgData = data.hourly_aggregation.map((item) => item.avg_lpg);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Average CO",
          data: coData,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: false,
          tension: 0.1,
        },
        {
          label: "Average Humidity",
          data: humidityData,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: false,
          tension: 0.1,
        },
        {
          label: "Average Temp",
          data: tempData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
          tension: 0.1,
        },
        {
          label: "Average LPG",
          data: lpgData,
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          fill: false,
          tension: 0.1,
        },
      ],
    },
  });
}
