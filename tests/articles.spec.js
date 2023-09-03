const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const User = require("../api/users/users.model");
const Article = require("../api/articles/articles.schema");

describe("tester API articles", () => {
  let token;
  const USER_ID = "fake";

  const MOCK_DATA = [
    {
      _id: USER_ID,
      name: "ana",
      email: "nfegeg@gmail.com",
      password: "azertyuiop",
      role: "admin",
    },
  ];
  const MOCK_DATA_CREATED = {
    title: "My article",
    content: "Big article",
    state: "draft",
  };

  beforeEach(() => {
    token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
    mockingoose(User).toReturn(MOCK_DATA[0], "findOne");
    mockingoose(Article).toReturn(MOCK_DATA_CREATED, "save");
  });

  test("[Articles] Create Article", async () => {
    const res = await request(app)
    .post("/api/articles")
    .send(MOCK_DATA_CREATED)
    .set("x-access-token", token)
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(MOCK_DATA_CREATED.title);
  });

  test("[Articles] Update Article", async () => {
    const res = await request(app)
    .put("/api/articles/:id")
    .send(MOCK_DATA_CREATED)
    .set("x-access-token", token);
    expect(res.status).toBe(200);
  });

  test("[Articles] Delete", async () => {
    const res = await request(app)
    .delete("/api/articles/:id")
    .set("x-access-token", token);
    expect(res.status).toBe(204);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
