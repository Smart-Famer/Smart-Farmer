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

const startDate = new Date("2022-10-31");
let dateArr = [];
let i = 0;
for (let i = 0; i < 7; i++) {
  const newday = startDate.getDate(startDate) + 1;
  startDate.setDate(newday);
  let daystr = startDate.toString();
  dateArr.push(daystr);
}
console.log(dateArr);

const sendReading = (type) => {
  // let timestamp = getRandomDate(new Date("2022-11-29"), new Date("2022-11-30"));
  timestamp = new Date(dateArr[i])
  console.log(timestamp);
  source_index = Math.round(Math.random() * 10);
  source_id = "";
  i++;
  console.log(i)
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
            .then((response) => {
              console.log(response.data.reading, response.data.sourceId,response.data.timestamp);
            })
            .catch((error) => {
              console.log("error");
            });
        }
      }
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
};



// sendReading('temp')

// sendReading('temp')
setInterval(sendReading, 5000, "temp");
// setInterval(sendReading,2000,'hum')
// setInterval(sendReading,6000,'shum')
// setInterval(sendReading,7000,'rain')
