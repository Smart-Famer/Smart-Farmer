import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { useFarmContext } from "../../hooks/useFarmContext";

export default function Temperature({ socket }) {
  const { farm } = useFarmContext();
  const sourceIds = farm.sensors?.Temperature?.map((sensor) => sensor.port);
  const [temperatures, setTemperatures] = useState({});
  const [error, setError] = useState(null);

  const nameId = {};
  farm.sensors?.Temperature?.forEach((data) => {
    let temp = data.name.split("_");
    let nameWithoutFarmArr = temp.slice(1);
    let nameWithoutFarm = nameWithoutFarmArr.join("_");
    nameId[data.port] = nameWithoutFarm;
  });

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_HOST
          }/api/datareading/all/?sourceids=${sourceIds.join()}`
        );
        const json = await response.json();
        if (response.ok) {
          setTemperatures(json);
        }
      } catch (error) {
        setError("Data Fetch Error");
      }
    };

    fetchTemperature();
  }, []);

  socket.on("dataReadingUpdate", (dataReading) => {
    if (sourceIds?.includes(dataReading.sourceId)) {
      const temp = {
        ...temperatures,
        [dataReading.sourceId]: dataReading.reading,
      };

      setTemperatures(temp);
    }
  });

  const components = sourceIds?.map((id) => {
    return (
      <Col key={sourceIds.indexOf(id)}>
        <h3 className="bg-secondary bg-opacity-25 rounded py-3 text-center">
          {temperatures[id]}&deg;C
        </h3>
        <h6 className="text-center">{nameId[id]}</h6>
      </Col>
    );
  });
  return (
    <Row>
      {components}
      {components.length === 0 && (
        <h4 className="text-center">
          <p className=" text-danger p-2">No Temperature Sensors found</p>
        </h4>
      )}
    </Row>
  );
}
