const request = require("supertest");
const baseURL = "http://localhost:4000";

describe("POST /api/user/", () => {
  // it("Should sign up a manager", async () => {
  //     const res = await request(baseURL).post(
  //       "/api/user/signup"
  //     ).send({
  //         first_name :"Kumuthu",
  //         second_name : "Athukorala",
  //         email :"kumuthu@gmail.com",
  //         password:"Abcd@123",
  //         location:"Mount Lavinia",
  //         user_type: "Manager",
  //         profile_picture: "default.jpg"
  //     })
  //
  //     expect(res.status).toEqual(200);
  //     // expect(res.body.details.first_name).toEqual("Kumuthu");
  //   });

  // it("Should update a manager", async () => {
  // const res = await request(baseURL).post(
  //   "/api/user/update/6379f841e2b782d20e520663"
  // ).send({
  //     first_name :"Kimuthu",
  //     second_name : "Athukoralaa",
  //     email :"kumuthu@gmail.com",
  //     password:"$2b$10$qhYWBcHFJihJbI6htbzMX.gvo7sXu9xN6NpNa9NNEHuqKI6W1jQ0K",
  //     location:"Mount Lavinia",
  //     user_type: "Manager",
  //     profile_picture: "default.jpg"
  // })
  // //
  // // expect(res.status).toEqual(200);
  // expect(res.body.details.first_name).toEqual("Kimuthu");
  //   });

  it("Should login a user", async () => {
    const res = await request(baseURL).post("/api/user/login").send({
      email: "kumuthu@gmail.com",
      password: "Abcd@123",
    });

    // expect(res.status).toEqual(200);
    expect(res.body.details.first_name).toEqual("Kimuthu");
  });

  it("Should retuen an assistants of a given farm", async () => {
    const res = await request(baseURL).post("/api/user/get-assistants").send({
      farm_id: "6363a46d57669fe158501664",
    });
    //
    expect(res.status).toEqual(200);
    expect(res.body[0].first_name).toEqual("Madara");
  });

  it("Should retuen an mangers of a given farm", async () => {
    const res = await request(baseURL).post("/api/user/get-managers").send({
      farm_id: "6363a46d57669fe158501664",
    });
    //
    expect(res.status).toEqual(200);
    expect(res.body[0].first_name).toEqual("Hiruna");
  });

  //   it("Should retuen an mangers of a given farm", async () => {
  //     const res = await request(baseURL).post(
  //       "/api/user/attach-farm"
  //     ).send({
  //         farm_id :"6363a46d57669fe158501664",
  //         user_id: "6360a1a484599b4be0ffea21"
  //     })
  //
  //     expect(res.status).toEqual(200);
  //     expect((res.body).farms[0]).toEqual("6363a46d57669fe158501664");
  //   });

  //   it("Should retuen an mangers of a given farm", async () => {
  //     const res = await request(baseURL).post(
  //       "/api/user/detach-farm"
  //     ).send({
  //         farm_id :"6363a46d57669fe158501664",
  //         user_id: "6360a1a484599b4be0ffea21"
  //     })
  //
  //     expect(res.status).toEqual(200);
  //     // expect((res.body).farms[0]).toEqual("6363a46d57669fe158501664");
  //   });

  it("Should retuen an mangers of a given farm", async () => {
    const res = await request(baseURL).post("/api/user/check-password").send({
      user_id: "6360a1a484599b4be0ffea21",
      password: "Abcd@123",
    });

    // expect(res.status).toEqual(200);
    expect(res.body._id).toEqual("6360a1a484599b4be0ffea21");
  });
});

describe("GET /api/user", () => {});
