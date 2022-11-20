import { createContext, useReducer, useEffect } from "react";

export const FarmContext = createContext();
export const farmReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        farm: action.payload,
      };
    case "REMOVE":
      return {
        farm: null,
      };
    case "UPDATE":
      return {
        farm: {
          ...state.farm,
          ...action.payload,
        },
      };
    case "ADD-SENSOR":
      const sensors = { ...state.farm.sensors };
      if (action.payload.sensor_type === "Temperature") {
        sensors.Temperature.push(action.payload);
      } else if (action.payload.sensor_type === "Humidity") {
        sensors.Humidity.push(action.payload);
      } else if (action.payload.sensor_type === "RainFall") {
        sensors.RainFall.push(action.payload);
      } else {
        sensors.Soil.push(action.payload);
      }
      return {
        farm: {
          ...state.farm,
          sensors,
        },
      };
    case "ADD-ACTUATOR":
      const actuators = { ...state.farm.actuators };
      if (action.payload.actuator_type === "Water Pump") {
        actuators.Pump.push(action.payload);
      } else if (action.payload.actuator_type === "Camera") {
        actuators.Camera.push(action.payload);
      }

      return {
        farm: {
          ...state.farm,
          actuators,
        },
      };
    default:
      return state;
  }
};
export const FarmContextProvider = ({ children }) => {
  const [Farm, dispatchFarm] = useReducer(farmReducer, null, () => {
    const farm = JSON.parse(localStorage.getItem("farm"));
    return farm;
  });

  useEffect(() => {
    localStorage.setItem("farm", JSON.stringify(Farm));
  }, [Farm]);
  return (
    <FarmContext.Provider value={{ ...Farm, dispatchFarm }}>
      {children}
    </FarmContext.Provider>
  );
};
