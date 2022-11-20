const farmModel = require("../models/farmModel");
const userModel = require("../models/userModel");
const sensorModel = require("../models/sensorModel");
const actuatorModel = require("../models/actuatorModel");
const mongoose = require('mongoose')

const getKeys = async (req, res) => {
  const { farm_id } = req.params;
  console.log(farm_id);

  if (!mongoose.Types.ObjectId.isValid(farm_id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const farmDetails = await farmModel.findOne(
    { _id: farm_id },
    { elec_conductivity_key: 1, NPK_levels_key: 1, weather_api_key: 1 }
  );

  if (!farmDetails) {
    return res.status(404).json({ error: "No suche workout found" });
  }
  res.status(200).json(farmDetails);
};
//get all farms
const getAllFarms = async (req, res) => {
  console.log("getAllFarms");
  const farmList = await farmModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(farmList);
};

//get farms of a given user
const getUserFarm = async (req, res) => {
  console.log("getUserFarm");

  const { _id } = req.params;

  //check the validity of the id
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: "invalid id" });
  }

  const user = await userModel.findById(_id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  let farm_ids = user.farms;
  farm_ids = farm_ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
  const farms = await farmModel.find({
    _id: {
      $in: farm_ids,
    },
  },{name:1, _id:0});

  res.status(200).json(farms);
};

const getFarms = async (req, res) => {
  let { farm_ids } = req.body;

  farm_ids = farm_ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
  const farms = await farmModel.find({
    _id: {
      $in: farm_ids,
    },
  });

  res.status(200).json(farms);
};

const getFarm = async (req, res) => {
  let { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "No such farm is found" });
  }

  const farm = await farmModel.findOne({ _id });

  res.status(200).json(farm);
};

const createFarm = async (req, res) => {
  const { name, location, area, address } = req.body;

  try {
    if (!name || !location || !area || !address) {
      throw Error("All fields must be filled");
    }
    const exists = await farmModel.findOne({ name });
    if (exists) {
      throw Error("Farm with the same name already in use");
    }

    const farm = await farmModel.create({ name, location, area, address });
    return res.status(200).json(await farmModel.updateKeys(farm._id));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateFarm = async (req, res) => {
  const { _id } = req.params;

  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "No such farm is found" });
  }

  const exists = await await farmModel.findOne({
    name,
    _id: {
      $nin: [_id],
    },
  });
  console.log(_id, exists);
  if (exists) {
    return res.status(400).json({ error: "farm name already exists" });
  }
  const farm = await farmModel.findOneAndUpdate(
    { _id },
    {
      ...req.body,
    }
  );

  if (!farm) {
    return res.status(400).json({ error: "No such farm is found" });
  }

  res.status(200).json(farm);
};

const updateSensor = async (req, res) => {
  const { id } = req.params;
  const { mode, sensor_id } = req.body;
  let farm = await farmModel.findOne({ _id: id });

  const includes = farm.sensors.includes(sensor_id);
  if (!farm || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such farm is found" });
  }

  if (mode === "add") {
    if (includes) {
      return res.status(400).json({ error: "Sensor already Added" });
    }
    farm = await farmModel.findOneAndUpdate(
      { _id: id },
      {
        $push: { sensors: sensor_id },
      }
    );
  } else if (mode == "delete") {
    if (!includes) {
      return res
        .status(400)
        .json({ error: "No such sensor associated to the farm" });
    }
    farm = await farmModel.findOneAndUpdate(
      { _id: id },
      {
        $pullAll: {
          sensors: [sensor_id],
        },
      }
    );
  }

  res.status(200).json(farm);
};

const updateActuator = async (req, res) => {
  const { id } = req.params;
  const { mode, actuator_id } = req.body;
  let farm = await farmModel.findOne({ _id: id });

  const includes = farm.actuators.includes(actuator_id);
  if (!farm || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such farm is found" });
  }

  if (mode === "add") {
    if (includes) {
      return res.status(400).json({ error: "Actuator already Added" });
    }
    farm = await farmModel.findOneAndUpdate(
      { _id: id },
      {
        $push: { actuators: actuator_id },
      }
    );
  } else if (mode == "delete") {
    if (!includes) {
      return res
        .status(400)
        .json({ error: "No such actuator associated to the farm" });
    }
    farm = await farmModel.findOneAndUpdate(
      { _id: id },
      {
        $pullAll: {
          actuators: [actuator_id],
        },
      }
    );
  }

  res.status(200).json(farm);
};

const deleteFarm = async (req, res) => {
  const { _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid farm ID");
    }

    const farm = await farmModel.findOneAndDelete({ _id });
    if (!farm) {
      throw Error("No such farm found");
    }

    const { sensors, actuators } = farm;

    await sensorModel.deleteMany({
      _id: {
        $in: sensors,
      },
    });

    await actuatorModel.deleteMany({
      _id: {
        $in: actuators,
      },
    });
    await userModel.updateMany(
      {
        farms: { $in: [_id] },
      },
      {
        $pullAll: { farms: [_id] },
      }
    );

    res.status(200).json(farm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateSecret = async (req, res)=>{
  const {_id} = req.params
  try{
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid farm ID");
    }

    const farm = await farmModel.updateSecret(_id)
    if (!farm){
      throw Error("No such farm found")
    }
    res.status(200).json(farm)
  }catch(err){
    res.status(400).json({error:err.message})
  }
}





module.exports = {
  getKeys,
  createFarm,
  updateFarm,
  deleteFarm,
  updateSensor,
  updateActuator,
  getFarms,
  getAllFarms,
  getUserFarm,
  getFarm,
  updateSecret
};
