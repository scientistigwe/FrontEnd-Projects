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
  const rows = data.split("\n");
  let headers = rows[0].split(",");
  headers = headers.map((header) => header.toLowerCase());

  const quantityIndex = headers.indexOf("quantity");
  const unitPriceIndex = headers.indexOf("unit price");

  if (quantityIndex < 0 || unitPriceIndex < 0) {
    self.postMessage({
      error:
        'Columns not found: please ensure csv contains "quantity" & "unit price" column in that format.',
    });
    return;
  }

  const csvResult = [];
  let maxQuantity = -Infinity;
  let maxUnitPrice = -Infinity;

  for (let row of rows.slice(1)) {
    // Start from index 1 to skip header row
    const rowItems = row.split(",");

    if (rowItems.length > Math.max(quantityIndex, unitPriceIndex)) {
      const quantity = parseFloat(rowItems[quantityIndex]);
      const unitPrice = parseFloat(rowItems[unitPriceIndex]);

      csvResult.push({ quantity, unitPrice });

      if (quantity > maxQuantity) {
        maxQuantity = quantity;
      }

      if (unitPrice > maxUnitPrice) {
        maxUnitPrice = unitPrice;
      }
    }
  }

  const totalSales = csvResult.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  self.postMessage({
    totalSales: totalSales,
    maxQuantity: maxQuantity,
    maxUnitPrice: maxUnitPrice,
  });

  console.log(`Total sales sent successfully: ${totalSales}`);
  console.log(`Max quantity sent successfully: ${maxQuantity}`);
  console.log(`Max unit price sent successfully: ${maxUnitPrice}`);
}
