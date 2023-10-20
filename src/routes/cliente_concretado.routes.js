import { Router } from "express";
import {
    crearClienteConcretado,
    listarClienteConcretado,
    traerClienteConcretadoPorId,
    actualizarClienteConcretado,
    eliminarClienteConcretado,
} from "../controllers/cliente_concretado.controller.js";

export const clienteContretadoRouter = Router();
clienteContretadoRouter.post("/cliente_concretado", crearClienteConcretado);
clienteContretadoRouter.get("/cliente_concretado", listarClienteConcretado);
clienteContretadoRouter.get("/cliente_concretado/:id", traerClienteConcretadoPorId);
clienteContretadoRouter.put("/cliente_concretado/:id", actualizarClienteConcretado);
clienteContretadoRouter.delete("/cliente_concretado/:id", eliminarClienteConcretado);