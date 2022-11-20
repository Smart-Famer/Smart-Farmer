const { temp_array, hum_array, shum_array, rain_array } = require("./data");
const axios = require("axios");

function getRandomDate(startDate, endDate) {
  const minValue = startDate.getTime();
  const maxValue = endDate.getTime();
  const timestamp = Math.floor(
    Math.random() * (maxValue - minValue + 1) + minValue
  );
  return new Date(timestamp);
}

const startDate = new Date("2022-12-11");
let dateArr = [];
let i = 0;
for (let i = 0; i < 7; i++) {
  const newday = startDate.getDate(startDate) + 1;
  startDate.setDate(newday);
  let daystr = startDate.toString();
  dateArr.push(daystr);
}

const sendReading = (type) => {
  timestamp = new Date(dateArr[i]);

  source_index = Math.round(Math.random() * 10);
  source_id = "";
  i++;

  switch (type) {
    case "temp":
      for (let index = 0; index < temp_array.length; index++) {
        const sourceId = temp_array[index];
        reading = (Math.random() * 50).toFixed(2);

        if (typeof reading !== "undefined" && typeof sourceId !== "undefined") {
          axios
            .post(`http://localhost:4000/api/datareading/`, {
              sourceId,
              reading,
              timestamp,
            })
            .then((response) => {})
            .catch((error) => {});
        }
      }
      sourceId = temp_array[source_index];

      break;
    case "hum":
      for (let index = 0; index < temp_array.length; index++) {
        const sourceId = hum_array[index];
        reading = (Math.random() * 50).toFixed(2);

        if (typeof reading !== "undefined" && typeof sourceId !== "undefined") {
          axios
            .post(`http://localhost:4000/api/datareading/`, {
              sourceId,
              reading,
              timestamp,
            })
            .then((response) => {
   
            })
            .catch((error) => {});
        }
      }
      sourceId = temp_array[source_index];
      break;
    case "shum":
      for (let index = 0; index < temp_array.length; index++) {
        const sourceId = shum_array[index];
        reading = (Math.random() * 50).toFixed(2);

        if (typeof reading !== "undefined" && typeof sourceId !== "undefined") {
          axios
            .post(`http://localhost:4000/api/datareading/`, {
              sourceId,
              reading,
              timestamp,
            })
            .then((response) => {

            })
            .catch((error) => {});
        }
      }
      sourceId = shum_array[source_index];
      break;
    case "rain":
      for (let index = 0; index < temp_array.length; index++) {
        const sourceId = rain_array[index];
        reading = (Math.random() * 50).toFixed(2);

        if (typeof reading !== "undefined" && typeof sourceId !== "undefined") {
          axios
            .post(`http://localhost:4000/api/datareading/`, {
              sourceId,
              reading,
              timestamp,
            })
            .then((response) => {

            })
            .catch((error) => {});
        }
      }
      sourceId = rain_array[source_index];
      break;

    default:
      break;
  }
};

setInterval(sendReading, 2000, "temp");
