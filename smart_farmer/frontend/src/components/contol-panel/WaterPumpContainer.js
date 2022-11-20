import React, { useEffect, useState } from "react";
import { useFarmContext } from "../../hooks/useFarmContext";
import "./ControlPanel.css";
import WaterPump from "./WaterPump";

export default function WaterPumpContainer(props) {
  const { farm } = useFarmContext();
  const [waterPumps, setWaterPumps] = useState();

  useEffect(() => {
    const temp = farm?.actuators.Pump?.map((pump) => {
      return (
        <div className="col">
          <WaterPump name={pump.name} port={pump.port} key={pump.id} />
        </div>
      );
    });
    setWaterPumps(temp);
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-11 col-sm-10 col-md-7 mt-3 pump">
        <div className="row bg-success text-white p-2 mb-3">
          <h5>Water Pumps</h5>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 p-4">
          {waterPumps}
        </div>
      </div>
    </div>
  );
}
