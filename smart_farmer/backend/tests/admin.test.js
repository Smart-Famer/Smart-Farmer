const request = require("supertest");
const baseURL = "http://localhost:4000";

describe("GET /api/admin/ ", () => {
it("Should equal to the number of total farms ", async () => {
    const res = await request(baseURL).get("/api/admin/get-all-farms");

    expect(res.body.length).toEqual(3);
  });

  it("Should equal to the number of total managers ", async () => {
    const res = await request(baseURL).get("/api/admin/get-all-mangers");

    expect(res.body.length).toEqual(3);
  });

  it("Should equal to the number of total assistants ", async () => {
    const res = await request(baseURL).get("/api/admin/get-all-assistants");

    expect(res.body.length).toEqual(6);
  });

});