import React, { useEffect, useRef, useState } from "react";
import { GiParasaurolophus } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BarChart } from "../components/BarChart";
import Sidebar from "../components/Sidebar/SideBar";
import { useFarmContext } from "../hooks/useFarmContext";

export default function CropYieldDataPage(props) {
  const { farm } = useFarmContext();
  const farm_id = farm._id;
  // const [xAxisV,setXaxisV] = useState([])
  // const [dataSet,setDataSet] = useState([])
  // const [cropYieldData,setCropYieldData] = useState(null)
  const [xAxisV, setXaxisV] = useState([]);
  const [cropYieldData, setCropYieldData] = useState([]);

    const rgb_list = []
  function random_rgb() {
    while (true){
        const R = Math.floor(Math.random() * 255 + 1);
        const G = Math.floor(Math.random() * 255 + 1);
        const B = Math.floor(Math.random() * 255 + 1);
        const rgb = [R, G, B];
        if(!(rgb_list.includes(rgb))){
            rgb_list.push(rgb)
            return rgb;
        }
    }
  }

  useEffect(() => {
    const fetchYieldData = async () => {
      const response = await fetch(
        `http://localhost:4000/api/cropyield/${farm_id}`
      );
      const json = await response.json();

      if (response.ok) {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        let temp_x = [];
        let temp_cropname = [];
        let temp_cropyield = {};

        json.forEach((element) => {
          const month_ind = new Date(element.date).getMonth();
          if (!temp_x.includes(months[month_ind])) {
            temp_x.push(months[month_ind]);
          }
        });
        json.forEach((element) => {
          const month_ind = new Date(element.date).getMonth();
          if (!(element.crop_name in temp_cropyield)) {
            let cropname = element.crop_name;
            temp_cropname.push(cropname);
            temp_cropyield[cropname] = { months: [], yields: [] };
            temp_cropyield[cropname].yields.push(element.yield);
            temp_cropyield[cropname].months.push(months[month_ind]);
          } else {
            let cropname = element.crop_name;
            temp_cropyield[cropname].yields.push(element.yield);
            temp_cropyield[cropname].months.push(months[month_ind]);
          }
        });
        // console.log(temp_cropyield)
        let temp_dataSet = [];

        temp_cropname.forEach((element) => {
          let temp = {};
          let temp_yields = temp_cropyield[element].yields;
          let temp_months = temp_cropyield[element].months;
          let monthYield = [];
          temp_x.forEach((month) => {
            if (temp_months.includes(month)) {
              let yield_index = temp_months.indexOf(month);
              monthYield.push(temp_yields[yield_index]);
            } else {
              monthYield.push(0);
            }
          });

          temp["label"] = element;
          temp["data"] = monthYield;
          let color = random_rgb();
          temp["borderColor"] = `rgb(${color.join()})`;
          let backgroundColor = [...color, 0.5];
          temp["backgroundColor"] = `rgb(${backgroundColor.join()})`;
          temp_dataSet.push(temp);
        });
        // console.log(temp_x)
        setXaxisV(temp_x);
        // console.log(xAxisV.current)
        // console.log(temp_dataSet)

        setCropYieldData(temp_dataSet);
        console.log("inside if", cropYieldData);
      }
    };
    fetchYieldData();
  }, []);
  console.log("outside of if", cropYieldData);
  const x = ["January", "September", "Octorber", "November"];
  const yd = [
    {
      label: "Beatroot",
      data: [400],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "apple",
      data: [0, 150],
      borderColor: "rgb(255, 150, 132)",
      backgroundColor: "rgba(255, 150, 132, 0.5)",
    },
    {
      label: "caret",
      data: [0, 0, 400, 350],
      borderColor: "rgb(155, 105, 132)",
      backgroundColor: "rgba(155, 105, 132, 0.5)",
    },
  ];

  return (
    <div className="main-container">
      <Sidebar user={props.user} />
      <div className="crop-yield-chart-container">
        {cropYieldData !== [] && xAxisV !== [] && (
          <BarChart
            yAxisLabel="Month"
            xAxisLabel="Yield (kg)"
            chartTitle="Crop Yield Chart"
            // xAxisValues = {['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            // dataSets={[
            //             {
            //                 label: 'Carrot',
            //                 data: [100,200,300,400,500,600,700],
            //                 borderColor: 'rgb(255, 99, 132)',
            //                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
            //             },
            //             {
            //                 label: 'Grains',
            //                 data: [800, 260, 300, 600, 550, 400, 500],
            //                 borderColor: 'rgb(53, 162, 235)',
            //                 backgroundColor: 'rgba(53, 162, 235, 0.5)',
            //             },
            //             {
            //                 label: 'Fruit',
            //                 data: [500, 360, 400, 500, 550, 680, 700],
            //                 borderColor: 'rgb(0, 255, 153)',
            //                 backgroundColor: 'rgba(0, 255, 153, 0.5)',
            //             },
            //             ]
            //         }
            xAxisValues={xAxisV}
            dataSets={cropYieldData}
            // xAxisValues = {x}
            // dataSets = {yd}
          />
        )}
        <div className="d-flex flex-row-reverse">
          <Link
            to="/user/farm/cropyieldinput"
            style={{ textDecoration: "none" }}
          >
            {"Add Crop Yield Details>"}
          </Link>
        </div>
      </div>
    </div>
  );
}
