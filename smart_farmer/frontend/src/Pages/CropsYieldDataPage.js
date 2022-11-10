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
  const [cropNames, setCropNames] = useState([])
  const [cropYieldData, setCropYieldData] = useState([]);
  const [cropVisibility, setCropVisibility] = useState({});


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
        setCropNames(temp_cropname)
        // let temp_cropVisibility = {}
        // temp_cropname.forEach((crop)=>{
        //   temp_cropVisibility[crop]=true
        // })
        // setCropVisibility(temp_cropVisibility)



    
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
          temp['visibility']= true;
          let color = random_rgb();
          temp["borderColor"] = `rgb(${color.join()})`;
          let backgroundColor = [...color, 0.5];
          temp["backgroundColor"] = `rgb(${backgroundColor.join()})`;
          temp_dataSet.push(temp);
        });
        setXaxisV(temp_x);
        setCropYieldData(temp_dataSet);
      }
    };
    fetchYieldData();
  }, []);

  // let temp_cropVisibility = {};
  // cropNames.forEach((crop) => {
  //   temp_cropVisibility[crop] = true;
  // });
  // setCropVisibility(temp_cropVisibility);
  // console.log(cropVisibility)

  const handleChange = (e)=>{
      const crop_name = e.currentTarget.id
      let temp_cropYieldData = JSON.parse(JSON.stringify(cropYieldData));
      for (let crop of temp_cropYieldData) {
        if(crop.label===crop_name){
          crop.visibility = !crop.visibility
        }
      }
      setCropYieldData(temp_cropYieldData)

  }
  let crop_checkboxes = cropNames.map((crop)=>{
    return (
      <h5 key={crop}>
        <input type="checkbox" id={crop} defaultChecked onChange={handleChange}/>
        <label htmlFor={crop}> {crop}</label>
      </h5>
    )
  })


  return (
    <div className="main-container">
      <Sidebar user={props.user} />
      <div className="crop-yield-chart-container">
        {cropYieldData !== [] && xAxisV !== [] && (
          <BarChart
            yAxisLabel="Month"
            xAxisLabel="Yield (kg)"
            chartTitle="Crop Yield Chart"

            xAxisValues={xAxisV}
            dataSets={cropYieldData.filter((x)=>{
              return x.visibility===true;
            })}

          />
        )}
        {crop_checkboxes}
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
