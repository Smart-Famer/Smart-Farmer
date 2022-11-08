import React from "react";
import { GiParasaurolophus } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BarChart } from "../components/BarChart";
import Sidebar from "../components/Sidebar/SideBar"


export default function CropYieldDataPage(props){
    return(
        <div className="main-container">
            <Sidebar user={props.user}/>
        <div className="crop-yield-chart-container">
        <BarChart
            yAxisLabel="Month"
            xAxisLabel="Yield (kg)"
            chartTitle = 'Crop Yield Chart'
            xAxisValues = {['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            dataSets={[
                        {
                            label: 'Carrot',
                            data: [100,200,300,400,500,600,700],
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: 'Grains',
                            data: [800, 260, 300, 600, 550, 400, 500],
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                        {
                            label: 'Fruit',
                            data: [500, 360, 400, 500, 550, 680, 700],
                            borderColor: 'rgb(0, 255, 153)',
                            backgroundColor: 'rgba(0, 255, 153, 0.5)',
                        },
                        ]
                    }
        />
            <div className="d-flex flex-row-reverse">
                    <Link to="/user/farm/cropyieldinput"  style={{ textDecoration: 'none'}}>{"Add Crop Yield Details>"}</Link>
            </div>



        </div>
        </div>
    )
}