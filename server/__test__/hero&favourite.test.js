const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");

describe("GET /homepage", () => {
  test("Welcome User", async () => {
    const response = await request(app).get("/");
    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Hello World");
  });
});

beforeAll(async () => {
  /** seeding user */
  let dataUser = require("../data/users.json").map((element) => {
    element.createdAt = element.updatedAt = new Date();
    element.password = hashPassword(element.password);
    return element;
  });

  await sequelize.queryInterface.bulkInsert("Users", dataUser, {});

  /** seeding user */

  let dataHero = require("../data/heroes.json").map((element) => {
    element.createdAt = element.updatedAt = new Date();
    return element;
  });

  await sequelize.queryInterface.bulkInsert("Heros", dataHero, {});
});

describe("GET /heroes", () => {
  test("Read All Heroes", async () => {
    const authCredential = {
      email: "user1@mail.com",
      password: "user1",
    };

    const authResponse = await request(app).post("/users/login").send({ email: authCredential.email, password: authCredential.password });

    let access_token = authResponse.body.access_token;

    const response = await request(app).get("/heroes").set("authorization", `Bearer ${access_token}`);

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
  });

  /** ini ga dikasih login */
  test("Not Log-In Yet", async () => {
    const response = await request(app).get("/heroes");
    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });

  /** ini ga dikasih login */

  /** ini token yang Bearer jadi Bear */
  test("Invalid Token", async () => {
    let access_token;

    const response = await request(app).get("/heroes").set("authorization", `Bear ${access_token}`);

    const { body, status } = response;

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });
});

describe("POST /favourites/:heroId", () => {
  test("Success add to favo", async () => {
    let access_token;
    const authCredentialOne = {
      email: "user1@mail.com",
      password: "user1",
    };

    const authResponse1 = await request(app).post("/users/login").send({ email: authCredentialOne.email, password: authCredentialOne.password });

    access_token1 = authResponse1.body.access_token;

    const heroId = 1;

    const response = await request(app).post(`/favourites/${heroId}`).set("authorization", `Bearer ${access_token1}`);

    const { body, status } = response;

    expect(status).toBe(201);
    expect(body).toBeInstanceOf(Object);
  });

  test("Hero Not Found Case", async () => {
    let access_token;
    const authCredentialOne = {
      email: "user1@mail.com",
      password: "user1",
    };

    const authResponse1 = await request(app).post("/users/login").send({ email: authCredentialOne.email, password: authCredentialOne.password });

    access_token1 = authResponse1.body.access_token;

    const heroId = 20;

    const response = await request(app).post(`/favourites/${heroId}`).set("authorization", `Bearer ${access_token1}`);

    const { body, status } = response;

    expect(status).toBe(404);
    expect(body).toHaveProperty("message", "Hero not found");
  });
});

describe("GET /favourites", () => {
  test("Success Get all Favourites", async () => {
    const authCredentialOne = {
      email: "user1@mail.com",
      password: "user1",
    };

    const authResponse1 = await request(app).post("/users/login").send({ email: authCredentialOne.email, password: authCredentialOne.password });

    access_token1 = authResponse1.body.access_token;

    const heroId = 1;

    const addFavouriteResponse = await request(app).post(`/favourites/${heroId}`).set("Authorization", `Bearer ${access_token1}`);

    expect(addFavouriteResponse.status).toBe(201);

    const response = await request(app).get(`/favourites`).set("Authorization", `Bearer ${access_token1}`);

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
  });
});

describe("PUT /favourites/:id", () => {
  test("Success edit favourites", async () => {
    const authCredentialOne = {
      email: "user1@mail.com",
      password: "user1",
    };

    const dataToInsert = {
      role: "string",
      power: 2000,
    };

    const authResponse1 = await request(app).post("/users/login").send({ email: authCredentialOne.email, password: authCredentialOne.password });

    access_token1 = authResponse1.body.access_token;

    const heroId = 1;

    await request(app).post(`/favourites/${heroId}`).set("Authorization", `Bearer ${access_token1}`);

    const updateResponse = await request(app).put(`/favourites/${heroId}`).send({ role: dataToInsert.role, power: dataToInsert.power }).set("Authorization", `Bearer ${access_token1}`);

    console.log(updateResponse, "ini adalah rsponse");

    const { body, status } = updateResponse;

    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Hero has been updated");
  });

  test("Not Authorized Case", async () => {
    // User 1 credentials
    const authCredentialOne = {
      email: "user1@mail.com",
      password: "user1",
    };

    // User 2 credentials
    const authCredentialTwo = {
      email: "user2@mail.com",
      password: "user2",
    };

    // Authenticate User 1 and get access token
    const authResponse1 = await request(app).post("/users/login").send(authCredentialOne);
    const access_token1 = authResponse1.body.access_token;

    // Authenticate User 2 and get access token
    const authResponse2 = await request(app).post("/users/login").send(authCredentialTwo);
    const access_token2 = authResponse2.body.access_token;

    // Ensure both authentications were successful
    expect(authResponse1.status).toBe(200);
    expect(access_token1).toBeTruthy();
    expect(authResponse2.status).toBe(200);
    expect(access_token2).toBeTruthy();

    // Hero ID to add to favourites
    const heroId = 1;

    // User 2 adds a hero to their favourites
    const addFavouriteResponse = await request(app).post(`/favourites/${heroId}`).set("Authorization", `Bearer ${access_token2}`);
    /** disini untuk ambil id Fav yang udah dikirim dari post addtoFav */
    const favouriteId = addFavouriteResponse.body.id;
    /** disini untuk ambil id Fav yang udah dikirim dari post addtoFav */
    // Ensure the favourite was added successfully
    expect(addFavouriteResponse.status).toBe(201);
    expect(addFavouriteResponse.body).toBeInstanceOf(Object);
    expect(favouriteId).toBeTruthy();

    // User 1 attempts to update User 2's favourite
    const updateResponse = await request(app).put(`/favourites/${favouriteId}`).send({ role: "string", power: 2000 }).set("Authorization", `Bearer ${access_token1}`);

    // Log the response for debugging
    console.log(updateResponse.body, "ini adalah response");

    // Ensure the response status and message indicate unauthorized action
    expect(updateResponse.status).toBe(403); // Assuming 403 Forbidden for unauthorized access
    expect(updateResponse.body).toBeInstanceOf(Object);
    expect(updateResponse.body).toHaveProperty("message", "You are not authorized");
  });
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  await sequelize.queryInterface.bulkDelete("Heros", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  // await sequelize.queryInterface.bulkDelete("Favourites", null, {
  //   restartIdentity: true,
  //   cascade: true,
  //   truncate: true,
  // });
});
