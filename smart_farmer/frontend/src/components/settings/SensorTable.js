import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useFarmContext } from "../../hooks/useFarmContext"


export default function SensorTable(){
    const [error,setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const {farm, dispatchFarm} = useFarmContext()
    const navigate = useNavigate()
    const [tableData, setData] = useState({
        Temperature:[],
        Rainfall:[],
        Humidity:[],
        Soil_Humidity:[]
    })

    const deleteModule = async (type,_id)=>{
        setError(null)
        setSuccess(null)

        const response = await fetch(
            `${process.env.REACT_APP_HOST}/api/modules/delete-sensor/${_id}`,
            {
              method: "GET",
              crossDomain: true,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        const json = await response.json()

        if(response.ok){
            setSuccess(`sensor deleted successfuly`)
            
            dispatchFarm({
                type:"UPDATE",
                payload:{
                    sensors:{
                        ...farm.sensors,
                        [type]:farm.sensors[type].filter((module)=>module._id!==_id)
                    }
                }
            })
        }else{
            setError(`Error Occurred while deleting sensor`)
        }
    }

    useEffect(()=>{
        setData({
            ...tableData,
            Temperature:farm?.sensors?.Temperature?.map(sensor=>{
            return <tr>
                <td>{sensor.name.split("_")[1]}</td>
                <td>Temp.</td>
                <td>{sensor.port.split("-")[1]}</td>
                <td><button className="btn btn-danger" onClick={()=>{deleteModule("Temperature", sensor._id)}}><i class="bi-trash3"></i></button></td>
                <td><button className="btn btn-primary" onClick={()=>{navigate(`/user/farm/Modules/edit-sensor/Temperature/${sensor._id}`)}}><i class="bi-pencil"></i></button></td>
                </tr>
            }),
            Rainfall:farm?.sensors?.Rainfall?.map(sensor=>{
                return <tr>
                    <td>{sensor.name.split("_")[1]}</td>
                    <td>Rainfall</td>
                    <td>{sensor.port.split("-")[1]}</td>
                    <td><button className="btn btn-danger" onClick={()=>{deleteModule("Rainfall", sensor._id)}}><i class="bi-trash3"></i></button></td>
                    <td><button className="btn btn-primary" onClick={()=>{navigate(`/user/farm/Modules/edit-sensor/Rainfall/${sensor._id}`)}}><i class="bi-pencil"></i></button></td>
                    </tr>
                }),
            Humidity:farm?.sensors?.Humidity?.map(sensor=>{
                return <tr>
                    <td>{sensor.name.split("_")[1]}</td>
                    <td>Humidity</td>
                    <td>{sensor.port.split("-")[1]}</td>
                    <td><button className="btn btn-danger" onClick={()=>{deleteModule("Humidity", sensor._id)}}><i class="bi-trash3"></i></button></td>
                    <td><button className="btn btn-primary" onClick={()=>{navigate(`/user/farm/Modules/edit-sensor/Humidity/${sensor._id}`)}}><i class="bi-pencil"></i></button></td>
                    </tr>
                }),
            Soil:farm?.sensors?.Soil?.map(sensor=>{
                return <tr>
                    <td>{sensor.name.split("_")[1]}</td>
                    <td>Soil Humidity</td>
                    <td>{sensor.port.split("-")[1]}</td>
                    <td><button className="btn btn-danger" onClick={()=>{deleteModule("Soil", sensor._id)}}><i class="bi-trash3"></i></button></td>
                    <td><button className="btn btn-primary" onClick={()=>{navigate(`/user/farm/Modules/edit-sensor/Soil/${sensor._id}`)}}><i class="bi-pencil"></i></button></td>
                    </tr>
                })
        })
        
    }, [farm])

    return(
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Port</th>
                <th scope="col">Delete</th>
                <th scope="col">Edit</th>
                </tr>
            </thead>
            <tbody>
                {tableData?.Temperature}
                {tableData?.Humidity}
                {tableData?.Soil_Humidity}
                {tableData?.Rainfall}
            </tbody>
        </table>
    )
}