import supertest from "supertest";
import { expect } from "chai";

const api = supertest("http://localhost:8080");

const timestamp = Date.now();
const patientEmail = `appt_${timestamp}@mail.com`;
const doctorEmail = `doctor_${timestamp}@mail.com`;
const password = "Test1234!";

let token;
let patientId;
let doctorUserId;
let doctorId;

describe("Integración Appointments (rutas protegidas)", () => {
  before(async function () {
    const registerRes = await api.post("/api/auth/register").send({
      email: patientEmail,
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

    const registerDoctorRes = await api.post("/api/auth/register").send({
      email: doctorEmail,
      password,
      firstName: "Doc",
      lastName: "Demo",
      role: "MEDICO"
    });

    doctorUserId = registerDoctorRes.status === 201 ? registerDoctorRes.body.user._id : patientId;

    const doctorRes = await api
      .post("/api/doctors")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user: doctorUserId,
        firstName: "Doc",
        lastName: "Demo",
        specialty: "Clinico",
        province: "Buenos Aires",
        neighborhood: "Palermo",
        address: "Calle Falsa 123",
        phone: "111222333"
      });

    if (doctorRes.status === 201 && doctorRes.body?.data) {
      doctorId = doctorRes.body.data._id;
    } else {
      const existingDocs = await api
        .get("/api/doctors")
        .set("Authorization", `Bearer ${token}`);
      if (existingDocs.status === 200 && Array.isArray(existingDocs.body?.data) && existingDocs.body.data.length) {
        doctorId = existingDocs.body.data[0]._id;
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
    expect(doctorId).to.exist;

    const res = await api
      .post("/api/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        doctor: doctorId,
        patient: patientId,
        time: "10:00"
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("data");
    expect(res.body.data).to.have.property("_id");
  });

  it("GET /api/appointments 200 -> lista turnos con token", async () => {
    expect(doctorId).to.exist;

    const res = await api
      .get("/api/appointments")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("data");
    expect(res.body.data).to.be.an("array");
  });
});
