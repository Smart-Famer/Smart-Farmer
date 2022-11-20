const sensorModel = require("../models/sensorModel");
const actuatorModel = require("../models/actuatorModel");
const farmModel = require("../models/farmModel");
const mongoose = require("mongoose");

const createSensor = async (req, res) => {
  const { sensor, farm_id, farm_name } = req.body;

  const name = farm_name + "_" + sensor.name;
  const port = farm_id + "-" + sensor.port;
  const { sensor_type } = sensor;
  const sensor_ids = (await farmModel.findOne({ _id: farm_id }, { sensors: 1 }))
    .sensors;

  const exists_name = await sensorModel.findOne({
    _id: {
      $in: sensor_ids,
    },
    name: name,
  });
  const exists_port = await sensorModel.findOne({
    _id: {
      $in: sensor_ids,
    },
    port: port,
  });
  //
  try {
    if (exists_name) {
      throw Error("Sensor Name Already Exists");
    }

    if (exists_port) {
      throw Error("Sensor Port Already Taken");
    }

    const sensor = await sensorModel.create({
      sensor_type,
      name,
      port,
    });
    await farmModel.updateOne(
      { _id: farm_id },
      { $push: { sensors: sensor._id } }
    );
    res.status(200).json(sensor);
  } catch (err) {
    //
    res.status(400).json({ error: err.message });
  }
};

const createActuator = async (req, res) => {
  const { actuator, farm_id, farm_name } = req.body;

  const name = farm_name + "_" + actuator.name;
  const port = farm_id + "-" + actuator.port;
  const { actuator_type } = actuator;

  const actuator_ids = (
    await farmModel.findOne({ _id: farm_id }, { actuators: 1 })
  ).actuators;

  const exists_name = await actuatorModel.findOne({
    _id: {
      $in: actuator_ids,
    },
    name: name,
  });
  const exists_port = await actuatorModel.findOne({
    _id: {
      $in: actuator_ids,
    },
    port: port,
  });

  try {
    if (exists_name) {
      throw Error("Actuator Name Already Exists");
    }

    if (exists_port) {
      throw Error("Actuator Port Already Taken");
    }

    const actuator = await actuatorModel.create({
      actuator_type,
      name,
      port,
    });
    await farmModel.updateOne(
      { _id: farm_id },
      { $push: { actuators: actuator._id } }
    );
    res.status(200).json(actuator);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createSensor,
  createActuator,
};
