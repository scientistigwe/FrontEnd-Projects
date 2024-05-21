//New web worker
self.onmessage = function (event) {
  const { task, data } = event.data;

  switch (task) {
    case "createAndMessage":
      createAndMessage(data);
      break;
    case "processCSV":
      processCSV(data);
      break;
    default:
      self.postMessage({ error: "Unknown Task" });
  }
};

function createAndMessage(data) {
  console.log(`New message received from main thread ${data}`); //worker confirms task received
  if (
    Array.isArray(data) &&
    (data.length === 2) & !isNaN(data[0]) &&
    !isNaN(data[1])
  ) {
    const result = data[0] * data[1]; //worker computes the task
    self.postMessage(result); //worker sends result to main
  } else {
    self.postMessage({ error: "Invalid data" }); //worker sends result to main
  }
}

function processCSV(data) {
  console.log(`processCSV function initialized successfully`);
  const rows = data.split("\n");
  const headers = rows[0].split(",");
  headers = headers.map((header) => header.toLowerCase());

  const quantityIndex = lowercase.headers.indexOf("quantity");
  const unitPriceIndex = lowercase.headers.indexOf("unit price");
  if (quantityIndex < 0 || unitPriceIndex < 0) {
    console.log(`Second if statement passed successfully`);
    console.log(
      `quantityIndex: ${quantityIndex}, unitPriceIndex: ${unitPriceIndex}`
    );
    self.postMessage({
      error:
        'Columns not found: please ensure csv contains "quantity" & "unit price" column in that format.',
    });
    return;
  }

  const csvResult = [];
  console.log(`csvResult Array initialized successfully`);
  for (let row of rows.slice(1)) {
    // Start from index 1 to skip header row
    const rowItems = row.split(",");

    if (rowItems.length > Math.max(quantityIndex, unitPriceIndex)) {
      const quantity = parseFloat(rowItems[quantityIndex]);
      const unitPrice = parseFloat(rowItems[unitPriceIndex]);
      csvResult.push({ quantity, unitPrice });
    }
  }

  const totalSales = csvResult.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  console.log(`Total sales ${totalSales}`);
  self.postMessage({
    totalSales: totalSales, // Sending the total sales value as part of an object
  });
  console.log(`Total sales sent successfully`);
}
