import dotenv from "dotenv";
dotenv.config();

import express from "express"
import { db } from './src/config/db.js'
import cors from 'cors'
import DoctorsRoutes from "./src/routes/Doctors.route.js"
import AuthRoutes from "./src/routes/Auth.route.js"
import UsersRoutes from "./src/routes/Users.route.js"
import ScheduleTemplatesRoutes from "./src/routes/ScheduleTemplates.route.js"
import AppointmentsRoutes from "./src/routes/Appointments.route.js"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./docs/swagger.docs.js"

const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a BD
db()

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL, undefined]

/* if(process.argv[2] === '--postman') {
    whitelist.push(undefined)
} */

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)) {
            // Permite la conexi�n
            callback(null, true)
        } else {
            // No permitir la conexi�n
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Swagger primero para evitar pasar por middleware de auth de otras rutas
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.get("/api/docs.json", (req, res) => res.json(swaggerDocs))

app.use("/api", new AuthRoutes().start())
app.use("/api", new DoctorsRoutes().start())
app.use("/api", new UsersRoutes().start())
app.use("/api", new ScheduleTemplatesRoutes().start())
app.use("/api", new AppointmentsRoutes().start())

app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT))
