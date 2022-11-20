// import {app} from "../../server"
// const app = require("../../server");
const request = require("supertest");
const supertest = require('supertest')
const express = require('express');


// const app = express();
const router = express.Router()
describe("get", () => {
  it("user", async () => {
    const res = await supertest(router)
    .get(
      "/api/farm/get-farm/636396faada6ca6a49d408a6");
    expect(res.statusCode).toEqual(200);
  });
});

describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
})

  
