const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");

let access_token;
const dataToInsert = {
  email: "user1@mail.com",
  password: "user1",
};

beforeAll(async () => {
  let dataUser = require("../data/users.json").map((element) => {
    element.createdAt = element.updatedAt = new Date();
    element.password = hashPassword(element.password);
    return element;
  });

  await sequelize.queryInterface.bulkInsert("Users", dataUser, {});
});

describe("POST users/login", () => {
  test("Login Success!", async () => {
    const response = await request(app).post("/users/login").send({ email: dataToInsert.email, password: dataToInsert.password });

    const { body, status } = response;
    access_token = body.access_token;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("access_token", access_token);
  });

  test("Login Failed, Email Must Not Empty!", async () => {
    const response = await request(app).post("/users/login").send({ email: "", password: dataToInsert.password });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Email/Password is required");
  });
  test("Login Failed, Password Must Not Empty!", async () => {
    const response = await request(app).post("/users/login").send({ email: dataToInsert.email, password: "" });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Email/Password is required");
  });

  test("Login Failed, Email is Invalid!", async () => {
    const response = await request(app).post("/users/login").send({ email: !dataToInsert.email, password: dataToInsert.password });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Email/Password is required");
  });
  test("Login Failed, Password is Invalid!", async () => {
    const response = await request(app).post("/users/login").send({ email: !dataToInsert.email, password: dataToInsert.password });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Email/Password is required");
  });
});

describe("POST users/register", () => {
  test("Register Success!", async () => {
    const response = await request(app).post("/users/register").send({ email: "user3@mail.com", password: "user3" });

    const { body, status } = response;

    expect(status).toBe(201);
    expect(body).toBeInstanceOf(Object);
  });
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});
