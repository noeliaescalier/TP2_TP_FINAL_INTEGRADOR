import supertest from "supertest";
import { expect } from "chai";

const api = supertest("http://localhost:8080");

const uniqueEmail = `appt_${Date.now()}@mail.com`;
const password = "Test1234!";

let token;
let patientId;
let doctorId;

describe("Integración Appointments (rutas protegidas)", () => {
  before(async function () {
    const registerRes = await api.post("/api/auth/register").send({
      email: uniqueEmail,
      password,
      firstName: "Paciente",
      lastName: "Demo",
      role: "PACIENTE"
    });

    if (registerRes.status !== 201) {
      this.skip();
      return;
    }

    token = registerRes.body.token;
    patientId = registerRes.body.user._id;

    const doctorRes = await api
      .post("/api/doctors")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Doc",
        lastName: "Demo",
        specialty: "Clinico",
        province: "Buenos Aires",
        neighborhood: "Palermo",
        address: "Calle Falsa 123",
        phone: "111222333"
      });

    if (doctorRes.status === 201) {
      doctorId = doctorRes.body._id;
    } else {
      const existingDocs = await api
        .get("/api/doctors")
        .set("Authorization", `Bearer ${token}`);
      if (existingDocs.status === 200 && Array.isArray(existingDocs.body) && existingDocs.body.length) {
        doctorId = existingDocs.body[0]._id;
      } else {
        this.skip();
      }
    }
  });

  it("GET /api/appointments 401 -> rechaza sin token", async () => {
    const res = await api.get("/api/appointments");
    expect(res.status).to.equal(401);
  });

  it("POST /api/appointments 201 -> crea turno con token", async () => {
    if (!doctorId) {
      return;
    }

    const res = await api
      .post("/api/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        doctor: doctorId,
        patient: patientId,
        time: "10:00"
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("_id");
  });

  it("GET /api/appointments 200 -> lista turnos con token", async () => {
    if (!doctorId) {
      return;
    }

    const res = await api
      .get("/api/appointments")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });
});
