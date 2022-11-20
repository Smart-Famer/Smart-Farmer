const request = require("supertest");
const baseURL = "http://localhost:4000";

describe("GET /api/farm/", () => {
    it("Should return a farm", async () => {
      const res = await request(baseURL).get(
        "/api/farm/get-farm/6363a46d57669fe158501664"
      );
      expect(res.body.name).toEqual("Farm-abc");
    });
    it("Should return a farm", async () => {
        const res = await request(baseURL).get(
          "/api/manager/get-keys/6363a46d57669fe158501664"
        );
        // expect(res.status).toEqual(200);
        expect(res.body.elec_conductivity_key).toEqual("elec-6363a46d57669fe158501664");
      });
  

  //   it("Should equal tto the number of farms of a user", async () => {
  //     const res = await request(baseURL).get(
  //       "/api/farm/get-user-farms/6363a46d57669fe158501664"
  //     );

  //     expect(res.body.length).toEqual(1);
  //   });

  //   it("Should delete and return the deleted farm", async () => {
  //     const res = await request(baseURL).get(
  //       "/api/farm/delete-farm/6363a46d57669fe158501664"
  //     );

  //     expect(res.body.name).toEqual("Farm-name");
  //   });

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
  // console.log(res.error);
  //     expect(res.status).toEqual(200);
  //   });
});
