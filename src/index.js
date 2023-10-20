import express, { json } from "express";
import cors from 'cors';
// import session from 'express-session';

// import { setCSPHeader } from "./middleware/cspMiddleware.js"; 

import { asesorVentasRouter } from "./routes/asesor_ventas.routes.js";
import { clientePotencialRouter } from "./routes/cliente_potencial.routes.js";
import { clienteContretadoRouter } from "./routes/cliente_concretado.routes.js";

const server = express();

server.use(json());
server.use(cors());

// server.use(setCSPHeader);

server.use(cors({
    origin: ['https://amddi.com', 'https://www.amddi.com'], // Reemplaza con el origen correcto de tu aplicación de frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));



// server.use(
//     session({
//         secret: process.env.SESSION_SECRET, 
//         resave: false,
//         saveUninitialized: true,
//         cookie: {
//             secure: false, 
//             maxAge: 1000 * 60 * 60 * 24, 
//         },
//     })
// );

const PORT = process.env.PORT ?? 5000;

server.use(asesorVentasRouter);
server.use(clientePotencialRouter);
server.use(clienteContretadoRouter);

server.listen(PORT, () => {
    console.log(`Servidor HTTPS en el puerto: ${PORT}`);
})


