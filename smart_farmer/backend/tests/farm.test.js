const request = require("supertest");
const baseURL = "http://localhost:4000";

describe("GET /api/farm/", () => {
  it("Should return a farm", async () => {
    const res = await request(baseURL).get(
      "/api/farm/get-farm/6363a46d57669fe158501664"
    );
    expect(res.body.name).toEqual("Milo farm");
  });
  it("Should return a farm", async () => {
    const res = await request(baseURL).get(
      "/api/manager/get-keys/6363a46d57669fe158501664"
    );
    expect(res.body.elec_conductivity_key).toEqual(
      "6363a46d57669fe158501664-elec"
    );
  });

});

describe("POST /api/farm/ ", () => {
  // it("Should update a farm", async () => {
  //     const res = await request(baseURL)
  //       .post("/api/farm/update-farm/6363a46d57669fe158501664")
  //       .send({
  //         name: "Farm-abc",
  //       });
  //     expect(res.status).toEqual(200);
  //   });
  //   it("Should add a new farm", async () => {
  //     const res = await request(baseURL)
  //       .post("/api/farm/add-farm")
  //       .send({
  //         name: "Farm-000",
  //         location: {
  //           latitude: "6.054378973552298",
  //           longitude: "80.21156226845887"
  //         },
  //         area: "456",
  //         address: "Kandy, Sri Lanka",
  //       });
  //
  //     expect(res.status).toEqual(200);
  //   });
});
