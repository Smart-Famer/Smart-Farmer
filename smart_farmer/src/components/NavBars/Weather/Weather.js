import React from 'react'
import {Container,Row,Col} from 'reactstrap'
import './Weather.css'

export default function Weather(){
    const [weatherData,setWeatherData] = React.useState(null)

    // const coord={"lon":79.8478,"lat":6.9319} for future use (coodinates for colombo)
    console.log('test')
    const API_key = "ee5cf369f27ce39d86ae06b3e884e7d5"
      React.useEffect(
        ()=>{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=colombo,lk&APPID=ee5cf369f27ce39d86ae06b3e884e7d5`
            // url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${coord.lat}&lon=${coord.lon}&cnt={cnt}&appid=${API_key}`
            fetch(url)
                .then(response => response.json())
                .then(response => setWeatherData(response))
                .catch(err => console.error(err));
        },[])
      
    console.log(weatherData)
    return(
        <div>

            {weatherData && 
            <Container className='weather--container'>
                <div className='weather--heading'>
                    <h5>Weather Forcast</h5>
                </div>
                <div className='weather--data'>
                    <Row>
                        <Col><h6>Wind Speed</h6></Col>
                        <Col>: {weatherData.wind.speed}ms<sup>-1</sup></Col>
                    </Row>
                    <Row>
                        <Col><h6>Rainfall</h6></Col>
                        <Col>: {weatherData.weather[0].description}</Col>
                    </Row>
                </div>
            
            </Container>}
            
        </div>
    )


}