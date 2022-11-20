// require("dotenv").config({ path: "../.env" });
const request = require("supertest");
const baseURL = "http://localhost:4000";
let sourceId = "npk-63784ee5fab4fe7402ea4865";

describe("Get NPK levels for given sourceId ", () => {
  it("should return nitrogen level", async () => {
    const response = await request(baseURL).get(
      "/api/datareading/npklevel/" + sourceId
    );
    expect(response.body.n).toBeDefined();
  });
});

describe("Get NPK levels for given sourceId ", () => {
  it("should return nitrogen level", async () => {
    const response = await request(baseURL).get(
      "/api/datareading/npklevel/historicaldata/?sourceid=npk-63784ee5fab4fe7402ea4865&duration=weekly"
    );
    expect(response.body).toBeDefined();
  });
});

describe("Input new NPK level", () => {
  it("should return entered nitrogen level", async () => {
    const response = await request(baseURL)
      .post("/api/datareading/npklevel/")
      .send({
        timestamp: new Date(),
        sourceId: "npk-63784ee5fab4fe7402ea4865",
        n: "7",
        p: "6",
        k: "5",
      });
    expect(response.body.n).toBeDefined();
  });
});
describe("Input INVALID NPK level", () => {
  it("should return ERROR", async () => {
    const response = await request(baseURL)
      .post("/api/datareading/npklevel/")
      .send({
        timestamp: new Date(),
        sourceId: "npk-63784ee5fab4fe7402ea4865",
        n: "A",
        p: "6",
        k: "5",
      });
    expect(response.body.error).toBe("Invalid nitrogen level!!!");
  });
});
describe("Input INVALID NPK level", () => {
  it("should return ERROR", async () => {
    const response = await request(baseURL)
      .post("/api/datareading/npklevel/")
      .send({
        timestamp: new Date(),
        sourceId: "npk-63784ee5fab4fe7402ea4865",
        n: "5",
        p: "a",
        k: "5",
      });
    expect(response.body.error).toBe("Invalid posphorous level!!!");
  });
});
describe("Input INVALID NPK level", () => {
  it("should return ERROR", async () => {
    const response = await request(baseURL)
      .post("/api/datareading/npklevel/")
      .send({
        timestamp: new Date(),
        sourceId: "npk-63784ee5fab4fe7402ea4865",
        n: "5",
        p: "6",
        k: "C",
      });
    expect(response.body.error).toBe("Invalid potassium level!!!");
  });
});


