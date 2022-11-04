const axios = require('axios');

const sendReading = (type)=>{
    temperature = Math.random()*50
    axios.post(`http://localhost:4000/api/fetch-data/${type}`,{
        temperature
    })
  .then((response) => {
    console.log(response.data.msg);
  })
  .catch((error) => {
    console.log("error");
  });
}

setInterval(sendReading,10000,'temp')
setInterval(sendReading,7000,'humidity')
setInterval(sendReading,10000,'rainfall')
