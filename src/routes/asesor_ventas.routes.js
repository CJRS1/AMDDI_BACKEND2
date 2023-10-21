import { Router } from "express";
import {
    crearAsesorVentas,
    listarAsesorVentas,
    traerAsesorVentasPorId,
    actualizarAsesorVentas,
    eliminarAsesorVentas,
    traerAsesorVentasPorToken,
    loginAsesorVentas,
    logoutAsesorVentas,
    traerAsesorVentasPorEmail
} from "../controllers/asesor_ventas.controller.js";

export const asesorVentasRouter = Router();
asesorVentasRouter.post("/asesor_ventas", crearAsesorVentas);

asesorVentasRouter.get("/asesor_ventas", listarAsesorVentas);
asesorVentasRouter.get("/asesor_ventas/:id", traerAsesorVentasPorId);
asesorVentasRouter.get("/asesor_ventass", traerAsesorVentasPorToken);
asesorVentasRouter.get("/asesor_ventas/:email", traerAsesorVentasPorEmail);


asesorVentasRouter.put("/asesor_ventas/:id", actualizarAsesorVentas);

asesorVentasRouter.delete("/asesor_ventas/:id", eliminarAsesorVentas);

asesorVentasRouter.post("/login", loginAsesorVentas);
asesorVentasRouter.post("/logout", logoutAsesorVentas);