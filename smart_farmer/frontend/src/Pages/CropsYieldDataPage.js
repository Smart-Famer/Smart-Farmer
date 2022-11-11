import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart } from "../components/BarChart";
import Sidebar from "../components/Sidebar/SideBar";
import { useFarmContext } from "../hooks/useFarmContext";
import distinctColors from "distinct-colors";

export default function CropYieldDataPage(props) {
  const { farm } = useFarmContext();
  const farm_id = farm._id;

  const [xAxisV, setXaxisV] = useState([]);
  const [cropNames, setCropNames] = useState([]);
  const [temp_cropMonths, setCropMonths] = useState([]);
  const [cropYieldData, setCropYieldData] = useState([]);

  const [tmp_cropYieldData, setTmp_cropYieldData] = useState([]);
  const [tmp_cropMonths, setTmp_cropMonths] = useState([]);

  function getColorList(colors_count) {
    var palette = distinctColors({ count: colors_count }).map((color) => {
      return color._rgb;
    });
    return palette;
  }

  useEffect(() => {
    const fetchYieldData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/cropyield/${farm_id}`
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
        setCropNames(temp_cropname);
        setCropMonths(temp_x);

        let temp_dataSet = [];
        const colorList = getColorList(temp_cropname.length);
        temp_cropname.forEach((element) => {
          let temp = {};
          let temp_yields = temp_cropyield[element].yields;
          let temp_months = temp_cropyield[element].months;
          let monthYield = [];
          let cropIndex = temp_cropname.indexOf(element);
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
          temp["visibility"] = true;
          let color = colorList[cropIndex];
          let temp_color_ = color;
          temp_color_[-1] = 0.5;
          temp["borderColor"] = `rgb(${color.join()})`;
          let backgroundColor = temp_color_;
          temp["backgroundColor"] = `rgb(${backgroundColor.join()})`;
          temp_dataSet.push(temp);
        });
        setXaxisV(temp_x);
        setCropYieldData(temp_dataSet);
        setTmp_cropMonths(temp_x);
        setTmp_cropYieldData(temp_dataSet);
      }
    };
    fetchYieldData();
    // tmp_cropYieldData = JSON.parse(JSON.stringify(cropYieldData));
    // tmp_cropMonths = JSON.parse(JSON.stringify(temp_cropMonths));
  }, []);

  // console.log(cropYieldData);

  const handleCropChange = (e) => {
    const crop_name = e.currentTarget.id;
    let temp_cropYieldData = JSON.parse(JSON.stringify(cropYieldData));
    for (let crop of temp_cropYieldData) {
      if (crop.label === crop_name) {
        crop.visibility = !crop.visibility;
      }
    }
    setCropYieldData(temp_cropYieldData);
  };

  const handleMonthChange = (e) => {
    let temp_cropYieldData = JSON.parse(JSON.stringify(cropYieldData));
    let temp_cropMonths = JSON.parse(JSON.stringify(xAxisV)); //months which are corresponding to yields
    // console.log(temp_cropMonths)

    const month = e.currentTarget.id; //clicked checkbox name
    const month_index = tmp_cropMonths.indexOf(month); //index of clicked checkbox month in xAxisV array
    if (!e.currentTarget.checked) {
      for (const crop of temp_cropYieldData) {
        // crop.data[month_index]='changed'
        crop.data.splice(month_index, 1);
      }
      temp_cropMonths.splice(month_index, 1);
    } else {
      console.log(tmp_cropYieldData);
      console.log(tmp_cropMonths);
      for (const crop of temp_cropYieldData) {
        const crop_index = temp_cropYieldData.indexOf(crop);
        crop.data.splice(
          month_index,
          0,
          tmp_cropYieldData[crop_index].data[month_index]
        );
      }
      temp_cropMonths.splice(month_index, 0, tmp_cropMonths[month_index]);
    }

    setCropYieldData(temp_cropYieldData);
    setXaxisV(temp_cropMonths);
  };

  let monthsCheckboxes = temp_cropMonths.map((month) => {
    return (
      <div key={month} className='form-check'>
        <input
          type="checkbox"
          className="form-check-input"
          id={month}
          defaultChecked
          onChange={handleMonthChange}
        />
        <label className="form-check-label" htmlFor={month}> {month}</label>
      </div>
    );
  });

  let crop_checkboxes = cropNames.map((crop) => {
    return (
      <div key={crop} className='form-check'>
        <input
          type="checkbox"
          className="form-check-input"
          id={crop}
          defaultChecked
          onChange={handleCropChange}
        />
        <label className="form-check-label" htmlFor={crop}> {crop}</label>
      </div>
    );
  });

  return (
    <div className="main-container">
      <Sidebar user={props.user} />
      <div className="crop-yield-chart-container">
        <div className="row">
          <div className="col-sm-10">
            {cropYieldData !== [] && xAxisV !== [] && (
              <BarChart
                yAxisLabel="Month"
                xAxisLabel="Yield (kg)"
                chartTitle="Crop Yield Chart"
                xAxisValues={xAxisV}
                dataSets={cropYieldData.filter((x) => {
                  return x.visibility === true;
                })}
              />
            )}
          </div>
          <div className="col-sm-2">
            <div className="">
              <h3>Select the crops</h3>
              {crop_checkboxes}
            </div>
            <br />
            <div>
              <h3>Select the months</h3>

              {monthsCheckboxes}
            </div>
          </div>
        </div>

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
