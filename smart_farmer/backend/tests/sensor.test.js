const request = require("supertest");
const baseURL = "http://localhost:4000";

describe("POST /api/modules/", () => {
  it("Should return sensors", async () => {
    const res = await request(baseURL)
      .post("/api/modules/get-sensors")
      .send({
        sensor_ids: ["636a38e88a707000594d6fa9"],
      });

    expect(res.status).toEqual(200);
    // expect(res.body.Temperature.sensor_type).toEqual("Tempereture");
  });

  it("Should return ports", async () => {
    const res = await request(baseURL).get("/api/modules/get-ports");

    expect(res.status).toEqual(200);
    expect(res.body.Temp_Sensors[0]).toEqual("6363a46d57669fe158501664-2000");
    expect(res.body.Humidity_Sensors[0]).toEqual(
      "6363a46d57669fe158501664-3000"
    );
    expect(res.body.RainFall_Sensors[0]).toEqual(
      "6363a46d57669fe158501664-4000"
    );
  });

  //   it("Should delete a sensor", async () => {
  //     const res = await request(baseURL).get(
  //       "/api/modules/delete-sensor/636a38f18a707000594d6faf"
  //     );
  //
  //     expect(res.status).toEqual(200);
  //     // expect(res.body.Temp_Sensors[0]).toEqual("6363a46d57669fe158501664-2000");

  //   });
});
