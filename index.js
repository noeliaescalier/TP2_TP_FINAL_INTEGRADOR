import express from "express"
import dotenv from 'dotenv'
import { db } from './src/config/db.js'
import cors from 'cors'
import DoctorsRoutes from "./src/routes/Doctors.route.js"

dotenv.config()

const app = express();
const PORT = 8080;

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
            // Permite la conexión
            callback(null, true)
        } else {
            // No permitir la conexión
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api", new DoctorsRoutes().start())

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

