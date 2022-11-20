// require("dotenv").config({ path: "../.env" });
const request = require("supertest");
const baseURL = `http://localhost:4000`;
let farmId = "6363a46d57669fe158501664";

describe("Get data reading for given sourceId ", () => {
  it("should return sensor reading", async () => {
    const response = await request(baseURL).get("/api/cropyield/" + farmId);
    expect(response.body).toBeDefined();
  });
});

describe("Input new reading", () => {
  it("should return crop yield", async () => {
    const response = await request(baseURL).post("/api/cropyield/").send({
      farm_id: "6363a46d57669fe158501664",
      crop_name: "Carrot",
      date: "2022-11-20",
      yield: 150,
    });
    expect(response.body.yield).toBe(150);
  });
});

describe("Input new INVALID reading", () => {
  it("should return ERROR", async () => {
    const response = await request(baseURL).post("/api/cropyield/").send({
      farm_id: "6363a46d57669fe158501664",
      crop_name: "Carrot",
      date: "2022-11-20",
      yield: "ABCD",
    });
    expect(response.body.error).toBe("Invalid yield!!!");
  });
});