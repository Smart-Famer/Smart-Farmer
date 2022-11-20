const request = require("supertest");
const baseURL = "http://localhost:4000";

describe("GET/api/datareading/:Temp_5", () => {
  it("should return sensor reading", async () => {
    const response = await request(baseURL).get(
      "/api/datareading/:6363a46d57669fe158501664-2000"
    );
    expect(response.body.data.reading).toBeDefined();
  });
});
