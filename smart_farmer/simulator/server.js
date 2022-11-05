const axios = require('axios');

const sendReading = (type)=>{
    reading = (Math.random()*50).toFixed(2)
    let timestamp = new Date().toJSON();
    source_index = Math.round(Math.random()*10)
    temp_array = ['Temp_1','Temp_2','Temp_3','Temp_4','Temp_5','Temp_6','Temp_7','Temp_8','Temp_9','Temp_10']
    hum_array = ['hum_1','hum_2','hum_3','hum_4','hum_5','hum_6','hum_7','hum_8','hum_9','hum_10']
    shum_array = ['shum_1','shum_2','shum_3','shum_4','shum_5','shum_6','shum_7','shum_8','shum_9','shum_10']
    rain_array = ['Rain_1','Rain_2','Rain_3','Rain_4','Rain_5','Rain_6','Rain_7','Rain_8','Rain_9','Rain_10']
    source_id = ''
    switch (type) {
      case 'temp':
        sourceId=temp_array[source_index]
        break;
      case 'hum':
        sourceId=hum_array[source_index]
        break;
      case 'shum':
        sourceId=shum_array[source_index]
        break;
      case 'rain':
        sourceId=rain_array[source_index]
        break;
    
      default:
        break;
    }
    if(typeof reading !== 'undefined' && typeof sourceId !== 'undefined'){
      axios.post(`http://localhost:4000/api/datareading/`,{
        sourceId,
        reading,
        timestamp
    })
  .then((response) => {
    console.log(response.data.reading,response.data.sourceId);
  })
  .catch((error) => {
    console.log("error");
  });
    }
    
}
// sendReading('temp')
setInterval(sendReading,5000,'temp')
setInterval(sendReading,2000,'hum')
setInterval(sendReading,6000,'shum')
setInterval(sendReading,7000,'rain')
