import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useFarmContext } from "../../hooks/useFarmContext"


export default function ActuatorTable(){
    const [error,setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const navigate = useNavigate()
    const {farm, dispatchFarm} = useFarmContext()
    const [tableData, setData] = useState({
        Camera:[],
        Pump:[]
    })

    const deleteModule = async (type,_id)=>{
        setError(null)
        setSuccess(null)

        const response = await fetch(
            `${process.env.REACT_APP_HOST}/api/modules/delete-actuator/${_id}`,
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
            setSuccess(`actuator deleted successfuly`)
            
            dispatchFarm({
                type:"UPDATE",
                payload:{
                    actuators:{
                        ...farm.actuators,
                        [type]:farm.actuators[type].filter((module)=>module._id!==_id)
                    }
                }
            })
        }else{
            setError(`Error Occurred while deleting actuator`)
        }
    }

    console.log(tableData)
    useEffect(()=>{
        setData({
            ...tableData,
            Camera:farm?.actuators?.Camera?.map(actuator=>{
            return <tr>
                <td>{actuator.name.split("_")[1]}</td>
                <td>Camera</td>
                <td>{actuator.port.split("-")[1]}</td>
                <td><button className="btn btn-sm btn-danger" onClick={()=>{deleteModule("Camera", actuator._id)}}><i class="bi-trash3"></i></button></td>
                <td><button className="btn btn-sm btn-primary" onClick={()=>{navigate(`/user/farm/Modules/edit-actuator/Camera/${actuator._id}`)}}><i class="bi-pencil"></i></button></td>
            </tr>
            }),
            Pump:farm?.actuators?.Pump?.map(actuator=>{
                return <tr>
                    <td>{actuator.name.split("_")[1]}</td>
                    <td>Water Pump</td>
                    <td>{actuator.port.split("-")[1]}</td>
                    <td><button className="btn btn-sm btn-danger" onClick={()=>{deleteModule("Pump", actuator._id)}}><i class="bi-trash3"></i></button></td>
                    <td><button className="btn btn-sm btn-primary" onClick={()=>{navigate(`/user/farm/Modules/edit-actuator/Pump/${actuator._id}`)}}><i class="bi-pencil"></i></button></td>
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
                {tableData?.Camera}
                {tableData?.Pump}
            </tbody>
        </table>
    )
}