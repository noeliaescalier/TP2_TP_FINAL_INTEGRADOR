const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "API Turnos Médicos",
    version: "1.0.0",
    description: "Documentación de la API de turnos, usuarios y doctores."
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Local"
    }
  ],
  tags: [
    { name: "Auth", description: "Registro y login" },
    { name: "Users", description: "Gestión de usuarios" },
    { name: "Doctors", description: "Gestión de doctores" },
    { name: "ScheduleTemplates", description: "Agendas" },
    { name: "Appointments", description: "Turnos" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          role: { type: "string", enum: ["PACIENTE", "MEDICO", "ADMIN"] },
          firstName: { type: "string" },
          lastName: { type: "string" },
          dni: { type: "string" },
          phone: { type: "string" },
          isActive: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" }
        }
      },
      Doctor: {
        type: "object",
        properties: {
          _id: { type: "string" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          specialty: { type: "string" },
          province: { type: "string" },
          neighborhood: { type: "string" },
          address: { type: "string" },
          phone: { type: "string" },
          scheduleTemplate: { type: "string" }
        }
      },
      Appointment: {
        type: "object",
        properties: {
          _id: { type: "string" },
          doctor: { type: "string" },
          patient: { type: "string" },
          time: { type: "string" },
          status: {
            type: "string",
            enum: [
              "LIBRE",
              "RESERVADO",
              "CANCELADO_PACIENTE",
              "CANCELADO_MEDICO",
              "ATENDIDO"
            ]
          },
          createdAt: { type: "string", format: "date-time" },
          cancellationReason: { type: "string" }
        }
      },
      ScheduleTemplate: {
        type: "object",
        properties: {
          _id: { type: "string" },
          doctor: { type: "string" },
          daysOfWeek: {
            type: "array",
            items: { type: "string" }
          },
          startTime: { type: "string" },
          endTime: { type: "string" },
          status: { type: "string" }
        }
      },
      NewAppointmentInput: {
        type: "object",
        required: ["doctor", "patient", "time"],
        properties: {
          doctor: { type: "string" },
          patient: { type: "string" },
          time: { type: "string", example: "10:00" }
        }
      },
      NewDoctorInput: {
        type: "object",
        required: ["firstName", "lastName", "specialty", "province", "neighborhood", "address", "phone"],
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          specialty: { type: "string" },
          province: { type: "string" },
          neighborhood: { type: "string" },
          address: { type: "string" },
          phone: { type: "string" }
        }
      },
      RegisterInput: {
        type: "object",
        required: ["email", "password", "firstName", "lastName", "role"],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          role: { type: "string", enum: ["PACIENTE", "MEDICO", "ADMIN"] },
          dni: { type: "string" },
          phone: { type: "string" }
        }
      },
      LoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string" },
          password: { type: "string" }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Registro de usuario",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterInput" }
            }
          }
        },
        responses: {
          "201": {
            description: "Usuario creado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: { $ref: "#/components/schemas/User" },
                    token: { type: "string" }
                  }
                }
              }
            }
          },
          "409": { description: "Email ya registrado" }
        }
      }
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginInput" }
            }
          }
        },
        responses: {
          "200": {
            description: "Login exitoso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: { $ref: "#/components/schemas/User" },
                    token: { type: "string" }
                  }
                }
              }
            }
          },
          "401": { description: "Credenciales inválidas" }
        }
      }
    },
    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "Listar usuarios",
        responses: {
          "200": {
            description: "Listado de usuarios",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Users"],
        summary: "Crear usuario (ADMIN)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterInput" }
            }
          }
        },
        responses: {
          "201": { description: "Usuario creado" }
        }
      }
    },
    "/api/users/stats/new": {
      get: {
        tags: ["Users"],
        summary: "Pacientes nuevos hoy",
        responses: {
          "200": {
            description: "Cantidad",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { newPatients: { type: "number" } }
                }
              }
            }
          }
        }
      }
    },
    "/api/users/stats/total": {
      get: {
        tags: ["Users"],
        summary: "Total de pacientes",
        responses: {
          "200": {
            description: "Cantidad",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { totalPatients: { type: "number" } }
                }
              }
            }
          }
        }
      }
    },
    "/api/users/{id}": {
      delete: {
        tags: ["Users"],
        summary: "Eliminar usuario",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Eliminado" }, "404": { description: "No encontrado" } }
      },
      patch: {
        tags: ["Users"],
        summary: "Actualizar parcialmente usuario",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } }
        },
        responses: { "200": { description: "Actualizado" }, "404": { description: "No encontrado" } }
      },
      put: {
        tags: ["Users"],
        summary: "Reemplazar usuario",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } }
        },
        responses: { "200": { description: "Actualizado" }, "404": { description: "No encontrado" } }
      }
    },
    "/api/doctors": {
      get: {
        tags: ["Doctors"],
        summary: "Listar doctores",
        responses: {
          "200": {
            description: "Listado",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Doctor" } } } }
          }
        }
      },
      post: {
        tags: ["Doctors"],
        summary: "Crear doctor",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/NewDoctorInput" } } }
        },
        responses: { "201": { description: "Doctor creado" } }
      }
    },
    "/api/doctors/stats": {
      get: {
        tags: ["Doctors"],
        summary: "Doctores con estadísticas",
        responses: { "200": { description: "OK" } }
      }
    },
    "/api/doctors/{id}": {
      delete: {
        tags: ["Doctors"],
        summary: "Eliminar doctor",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Eliminado" }, "404": { description: "No encontrado" } }
      },
      patch: {
        tags: ["Doctors"],
        summary: "Actualizar doctor (parcial)",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/Doctor" } } }
        },
        responses: { "200": { description: "Actualizado" } }
      },
      put: {
        tags: ["Doctors"],
        summary: "Reemplazar doctor",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/Doctor" } } }
        },
        responses: { "200": { description: "Actualizado" } }
      }
    },
    "/api/schedule-templates": {
      get: {
        tags: ["ScheduleTemplates"],
        summary: "Listar agendas",
        responses: { "200": { description: "OK" } }
      },
      post: {
        tags: ["ScheduleTemplates"],
        summary: "Crear agenda",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["doctor", "daysOfWeek", "startTime", "endTime"],
                properties: {
                  doctor: { type: "string" },
                  daysOfWeek: { type: "array", items: { type: "string" } },
                  startTime: { type: "string" },
                  endTime: { type: "string" }
                }
              }
            }
          }
        },
        responses: { "201": { description: "Agenda creada" } }
      }
    },
    "/api/schedule-templates/doctor/{doctorId}": {
      get: {
        tags: ["ScheduleTemplates"],
        summary: "Obtener agendas de un doctor",
        parameters: [{ in: "path", name: "doctorId", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "OK" } }
      }
    },
    "/api/schedule-templates/{id}": {
      put: {
        tags: ["ScheduleTemplates"],
        summary: "Reemplazar agenda",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/ScheduleTemplate" } } }
        },
        responses: { "200": { description: "Actualizada" } }
      },
      patch: {
        tags: ["ScheduleTemplates"],
        summary: "Actualizar agenda",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/ScheduleTemplate" } } }
        },
        responses: { "200": { description: "Actualizada" } }
      },
      delete: {
        tags: ["ScheduleTemplates"],
        summary: "Eliminar agenda",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Eliminada" } }
      }
    },
    "/api/appointments": {
      get: {
        tags: ["Appointments"],
        summary: "Listar turnos",
        responses: {
          "200": {
            description: "Listado",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Appointment" } }
              }
            }
          }
        }
      },
      post: {
        tags: ["Appointments"],
        summary: "Crear turno",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/NewAppointmentInput" } } }
        },
        responses: { "201": { description: "Turno creado" } }
      }
    },
    "/api/appointments/stats/dashboard": {
      get: {
        tags: ["Appointments"],
        summary: "Estadísticas de turnos",
        responses: { "200": { description: "OK" } }
      }
    },
    "/api/appointments/reserved": {
      get: {
        tags: ["Appointments"],
        summary: "Turnos reservados",
        responses: { "200": { description: "OK" } }
      }
    },
    "/api/appointments/cancelled": {
      get: {
        tags: ["Appointments"],
        summary: "Turnos cancelados",
        responses: { "200": { description: "OK" } }
      }
    },
    "/api/appointments/attended": {
      get: {
        tags: ["Appointments"],
        summary: "Turnos atendidos",
        responses: { "200": { description: "OK" } }
      }
    },
    "/api/appointments/{id}": {
      patch: {
        tags: ["Appointments"],
        summary: "Actualizar turno",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/Appointment" } } }
        },
        responses: { "200": { description: "Actualizado" } }
      },
      put: {
        tags: ["Appointments"],
        summary: "Reemplazar turno",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/Appointment" } } }
        },
        responses: { "200": { description: "Actualizado" } }
      },
      delete: {
        tags: ["Appointments"],
        summary: "Eliminar turno",
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Eliminado" } }
      }
    }
  }
};

export default swaggerDocs;
