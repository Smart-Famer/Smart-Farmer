const { temp_array, hum_array, shum_array, rain_array } = require("./data");
const axios = require("axios");

const sendReading = (type) => {
  reading = (Math.random() * 50).toFixed(2);
  let timestamp = new Date().toJSON();
  source_index = Math.round(Math.random() * 10);
  source_id = "";
  switch (type) {
    case "temp":
      sourceId = temp_array[source_index];
      break;
    case "hum":
      sourceId = hum_array[source_index];
      break;
    case "shum":
      sourceId = shum_array[source_index];
      break;
    case "rain":
      sourceId = rain_array[source_index];
      break;

    default:
      break;
  }
  if (typeof reading !== "undefined" && typeof sourceId !== "undefined") {
    axios
      .post(`${process.env.REACT_APP_HOST}/api/datareading/`, {
        sourceId,
        reading,
        timestamp,
      })
      .then((response) => {})
      .catch((error) => {});
  }
};
setInterval(sendReading, 5000, "temp");
setInterval(sendReading, 2000, "hum");
setInterval(sendReading, 6000, "shum");
setInterval(sendReading, 7000, "rain");
