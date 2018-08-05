const fetch = require("node-fetch").default;

async function getHistoricalData() {
  try {
    const data = await fetch("https://google.com");
    console.log(`received data`, data);
  } catch (error) {
    console.log(`error`, error);
  }
}

getHistoricalData();
