import supertest from "supertest";
import { expect } from "chai";

const api = supertest("http://localhost:8080");

const uniqueEmail = `test_${Date.now()}@mail.com`;
const password = "Test1234!";
const baseUser = {
  email: uniqueEmail,
  password,
  firstName: "Test",
  lastName: "User",
  role: "PACIENTE"
};

let token;

describe("Integración Auth y rutas protegidas", () => {
  it("POST /api/auth/register 201 -> crea usuario y devuelve token", async () => {
    const res = await api.post("/api/auth/register").send(baseUser);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("token");
    expect(res.body).to.have.property("user");
    token = res.body.token;
  });

  it("POST /api/auth/login 200 -> autentica y devuelve token", async () => {
    const res = await api.post("/api/auth/login").send({
      email: baseUser.email,
      password
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
    expect(res.body).to.have.property("user");
  });

  it("GET /api/users 401 -> rechaza sin token", async () => {
    const res = await api.get("/api/users");
    expect(res.status).to.equal(401);
  });

  it("GET /api/users 200 -> lista usuarios con token válido", async () => {
    const res = await api.get("/api/users").set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });
});
