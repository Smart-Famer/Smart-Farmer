const ActuatorModel = require("../models/actuatorModel");
const farmModel = require("../models/farmModel");
const mongoose = require("mongoose");

const getActuators = async (req, res) => {
  let { actuator_ids } = req.body;

  actuator_ids = actuator_ids.filter((id) =>
    mongoose.Types.ObjectId.isValid(id)
  );
  const temp_actuators = await ActuatorModel.find({
    _id: {
      $in: actuator_ids,
    },
  });
  const actuators = {
    Pump: [],
    Camera: [],
  };
  temp_actuators.forEach((actuator) => {
    if (actuator.actuator_type === "Water Pump") {
      actuators.Pump.push(actuator);
    } else if (actuator.actuator_type === "Camera") {
      actuators.Camera.push(actuator);
    }
  });

  res.status(200).json(actuators);
};

const editActuator = async (req, res) => {
  const { actuator, farm_id, farm_name } = req.body;

  const name = farm_name + "_" + actuator.name;
  const port = farm_id + "-" + actuator.port;
  const { actuator_type } = actuator;

  const actuator_ids = (
    await farmModel.findOne({ _id: farm_id }, { actuators: 1 })
  ).actuators;

  const exists_name = await ActuatorModel.findOne({
    _id: {
      $in: actuator_ids,
    },
    name: name,
  });

  try {
    if (exists_name) {
      throw Error("Actuator Name Already Exists");
    }
    const actuator = await ActuatorModel.findOneAndUpdate(
      { port },
      { name, actuator_type },
      { new: true }
    );
    res.status(200).json(actuator);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteActuator = async (req, res) => {
  const { _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid actuator ID");
    }

    const actuator = await ActuatorModel.findOneAndDelete({ _id });
    if (!actuator) {
      throw Error("actuator doesn't exist");
    }
    res.status(200).json(actuator);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getActuators,
  editActuator,
  deleteActuator,
};
