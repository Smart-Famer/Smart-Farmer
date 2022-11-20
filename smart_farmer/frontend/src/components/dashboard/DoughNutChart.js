import React from "react";
import DonutChart from "react-donut-chart";

export default function DoughnutChart(props) {
  const x = props.reading;
  return (
    <div className="App">
      <DonutChart
        data={[
          {
            label: "",
            value: x,
          },
          {
            label: "",
            value: 100 - x,
            isEmpty: true,
          },
        ]}
        clickToggle={false}
        onMouseEnter={() => null}
        onMouseLeave={() => null}
        height={100}
        width={100}
        legend={false}
        colors={[props.activeColor]}
        emptyColor={props.inActiveColor}
        emptyOffset={0}
      />
      <br />
      <h4>{props.readingName}</h4>
    </div>
  );
}
