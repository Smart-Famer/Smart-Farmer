const request = require("supertest");
const baseURL = "http://localhost:4000";


describe("POST api/add-sensor", () => {
    it("should add a sensor and return details", async () => {
      const response = await request(baseURL).post("/api/modules/add-sensor/").send({
        sensor:{
            name:"Temp-99",
            port:2999,
            sensor_type:"Temperature"
        },
        farm_id:"637a84b08da7e58ff7609076",
        farm_name:"Eco-Farm"
      });
      expect({
        name:response.body.name,
        port: response.body.port,
        sensor_type:response.body.sensor_type
        }).toMatchObject({
            name:"Eco-Farm_Temp-99",
            port:"637a84b08da7e58ff7609076-2999",
            sensor_type:"Temperature"
        });
    });

    it("should return a sensor-name error", async ()=>{
        const response = await request(baseURL).post("/api/modules/add-sensor/").send({
            sensor:{
                name:"Temp-1",
                port:2999,
                sensor_type:"Temperature"
            },
            farm_id:"637a84b08da7e58ff7609076",
            farm_name:"Eco-Farm"
          });
          expect(response.body.error).toMatch("Sensor Name Already Exists");
    })
    it("should return a sensor-port error", async ()=>{
        const response = await request(baseURL).post("/api/modules/add-sensor/").send({
            sensor:{
                name:"Temp-98",
                port:2000,
                sensor_type:"Temperature"
            },
            farm_id:"637a84b08da7e58ff7609076",
            farm_name:"Eco-Farm"
          });
          expect(response.body.error).toMatch("Sensor Port Already Taken");
    })
  });

  describe("POST api/add-actuator", () => {
    it("should add an actuator and return details", async () => {
      const response = await request(baseURL).post("/api/modules/add-actuator/").send({
        actuator:{
            name:"Pump-99",
            port:2999,
            actuator_type:"Water Pump"
        },
        farm_id:"637a84b08da7e58ff7609076",
        farm_name:"Eco-Farm"
      });
      expect({
        name:response.body.name,
        port: response.body.port,
        actuator_type:response.body.actuator_type
        }).toMatchObject({
            name:"Eco-Farm_Pump-99",
            port:"637a84b08da7e58ff7609076-2999",
            actuator_type:"Water Pump"
        });
    });

    it("should return a actuator-name error", async ()=>{
        const response = await request(baseURL).post("/api/modules/add-actuator/").send({
            actuator:{
                name:"Pump-99",
                port:2999,
                actuator_type:"Water Pump"
            },
            farm_id:"637a84b08da7e58ff7609076",
            farm_name:"Eco-Farm"
          });
          expect(response.body.error).toMatch("Actuator Name Already Exists");
    })
    it("should return a actuator-port error", async ()=>{
        const response = await request(baseURL).post("/api/modules/add-actuator/").send({
            actuator:{
                name:"Pump-98",
                port:2999,
                actuator_type:"Water Pump"
            },
            farm_id:"637a84b08da7e58ff7609076",
            farm_name:"Eco-Farm"
          });
          expect(response.body.error).toMatch("Actuator Port Already Taken");
    })
  });

  //teardown
  afterAll(async ()=>{
    const response1 = await request(baseURL).get("/api/farm/get-farm/637a84b08da7e58ff7609076")

    const sensor_ids = response1.body.sensors
    const response2 = await request(baseURL).post("/api/modules/get-sensors/").send({
        sensor_ids
    })
    const json1 = response2.body.Temperature
    const sensor_id=json1.filter((sensor)=>sensor.name==="Eco-Farm_Temp-99")[0]._id
    await request(baseURL).get("/api/modules/delete-sensor/"+sensor_id)

    
    
    const actuator_ids = response1.body.actuators
    const res2 = await request(baseURL).post("/api/modules/get-actuators/").send({
        actuator_ids
    })
    const json2 = res2.body.Pump
    const actuator_id=json2.filter((actuator)=>actuator.name==="Eco-Farm_Pump-99")[0]._id
    await request(baseURL).get("/api/modules/delete-actuator/"+actuator_id)

  })