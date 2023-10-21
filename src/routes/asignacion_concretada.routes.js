import { Router } from "express";
import {
    crearAsignaciones,
    eliminarAsignaciones,
    editarAsignacionesUsuarios,
} from "../controllers/asignaciones.controller.js";

export const asignacionesRouter = Router();

asignacionesRouter.post("/asignaciones/:id_asesor/:id_usuarios", crearAsignaciones);

asignacionesRouter.delete("/asignaciones", eliminarAsignaciones);

asignacionesRouter.put("/asignaciones", editarAsignacionesUsuarios);
