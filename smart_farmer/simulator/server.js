const axios = require('axios');

const sendTemp = ()=>{
    temperature = Math.random()*50
    axios.post('http://localhost:4000/api/fetch-data',{
        temperature
    })
  .then((response) => {
    console.log(response.data.msg);
  })
  .catch((error) => {
    console.log("error");
  });
}

setInterval(sendTemp,5000)
