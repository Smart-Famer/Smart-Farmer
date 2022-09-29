import React from "react";
import {Row,Col} from "reactstrap";
import LineChart from "./LineChart";

export default function HistoricalData(props){
    return(
        <Row className="px-5">
            <Col >
            <LineChart
                xAxisLabel='Date'
                yAxisLabel='Temperature'
                xAxisValues={['23/09/2022', '24/09/2022', '25/09/2022', '26/09/2022', '27/09/2022','28/09/2022']}
                chartTitle = 'Historical Data'
                dataSets = {[{
                                label: 'Sensor 1',
                                data: [27,26,25.5,28,27,30],
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                
                                },
                                {
                                label: 'Sensor 2',
                                data: [25,25.5,26.5,28,26.5,26],
                                borderColor: 'rgb(255, 200, 100)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                
                                }]}
                />
             </Col>
        </Row>
    )
}