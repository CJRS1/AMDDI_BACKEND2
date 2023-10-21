import { Router } from "express";
import {
    crearAsignacionPotencial,
    eliminarAsignacionPotencial,
    editarAsignacionPotencial,
} from "../controllers/asignacion_potencial.controller.js";

export const asignacionPotencialRouter = Router();

asignacionPotencialRouter.post("/asignacion_potencial/:id_asesor/:id_usuarios", crearAsignacionPotencial);

asignacionPotencialRouter.delete("/asignacion_potencial", eliminarAsignacionPotencial);

asignacionPotencialRouter.put("/asignacion_potencial", editarAsignacionPotencial);
