import React from 'react'
import {Row,Col} from 'reactstrap'

export default function Weather(){
    const [weatherData,setWeatherData] = React.useState(null)

    // const coord={"lon":79.8478,"lat":6.9319} for future use (coodinates for colombo)
    // console.log('test')
    const API_key = "ee5cf369f27ce39d86ae06b3e884e7d5"
      React.useEffect(
        ()=>{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=colombo,lk&APPID=${API_key}`
            // url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${coord.lat}&lon=${coord.lon}&cnt={cnt}&appid=${API_key}`
            fetch(url)
                .then(response => response.json())
                .then(response => setWeatherData(response))
                .catch(err => console.error(err));
        },[])
      
    // console.log(weatherData)
    return(
        <div>

            {weatherData && 
                <>
                    <Row className='align-items-center px-3'>
                        <Col><h6>Wind Speed</h6></Col>
                        <Col><h6 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{weatherData.wind.speed}ms<sup>-1</sup></h6></Col>
                    </Row>
                    <Row className='align-items-center px-3'>
                        <Col><h6>Rainfall</h6></Col>
                        <Col><h6 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{weatherData.weather[0].description}</h6></Col>
                    </Row>
                </>
                }
            
        </div>
    )


}