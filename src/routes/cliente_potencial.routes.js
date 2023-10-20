import { Router } from "express";
import {
    crearClientePotencial,
    listarClientePotencial,
    traerClientePotencialPorId,
    actualizarClientePotencial,
    eliminarClientePotencial,
} from "../controllers/cliente_potencial.controller.js";

export const clientePotencialRouter = Router();
clientePotencialRouter.post("/cliente_potencial", crearClientePotencial);
clientePotencialRouter.get("/cliente_potencial", listarClientePotencial);
clientePotencialRouter.get("/cliente_potencial/:id", traerClientePotencialPorId);
clientePotencialRouter.put("/cliente_potencial/:id", actualizarClientePotencial);
clientePotencialRouter.delete("/cliente_potencial/:id", eliminarClientePotencial);