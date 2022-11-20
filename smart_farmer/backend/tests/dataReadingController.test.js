// require("dotenv").config({ path: "../.env" });
const request = require("supertest");
const baseURL = "http://localhost:4000";
let sourceId = "6363a46d57669fe158501664-2000";
const sourceIds = "6363a46d57669fe158501664-2000,6363a46d57669fe158501664-2001";

describe("Get data reading for given sourceId ", () => {
  it("should return sensor reading", async () => {
    const response = await request(baseURL).get("/api/datareading/" + sourceId);
    expect(response.body.reading).toBeDefined();
  });
});

describe("Get data reading for given invalid sourceId ", () => {
  it("should return ERROR", async () => {
    const response = await request(baseURL).get("/api/datareading/" + "1234");
    expect(response.body.error).toBe("No such source id found");
  });
});

describe("Get readings given sourceIds", () => {
  it("should return sensor reading", async () => {
    const response = await request(baseURL).get(
      "/api/datareading/all/?sourceids=" + sourceIds
    );
    expect(response.body["6363a46d57669fe158501664-2001"]).toBeDefined();
  });
});

describe("Input new reading", () => {
  it("should return sensor reading", async () => {
    const response = await request(baseURL).post("/api/datareading/").send({
      sourceId: "2000",
      reading: 40,
      timestamp: "2022-11-26",
      secret_key:
        "$2b$10$0yLtI8uQ99Zykx3PxbcVT.aaqj5i3sM1CXxEIhYiJOcdt.B.02awq",
    });
    sourceId = response.body.sourceId;
    expect(response.body.reading).toBeDefined();
  });
});
describe("Input INVALID reading", () => {
  it("should return ERROR", async () => {
    const response = await request(baseURL).post("/api/datareading/").send({
      sourceId: "2000",
      reading: "A",
      timestamp: "2022-11-26",
      secret_key:
        "$2b$10$0yLtI8uQ99Zykx3PxbcVT.aaqj5i3sM1CXxEIhYiJOcdt.B.02awq",
    });
    sourceId = response.body.sourceId;
    expect(response.body.error).toBe("Invalid reading!!!");
  });
});
