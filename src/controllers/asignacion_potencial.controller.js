import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearAsignacionPotencial = async (req, res) => {
    try {
        const { id_asesor_venta, id_cliente_potencial } = req.params; // Cambio aquí
        console.log(id_asesor_venta, id_cliente_potencial);
        // Check if the user already has an advisor
        const existingAsignacion = await prisma.asignacionPotencial.findFirst({
            where: {
                id_cliente_potencial: parseInt(id_cliente_potencial),
            },
        });

        if (existingAsignacion) {
            return res.status(400).json({ msg: "El cliente ya tiene un asesor de ventas asignado" });
        }

        const asesorExiste = await prisma.asesorVentas.findUnique({
            where: {
                id: parseInt(id_asesor_venta), // Parsea el valor a entero si es necesario
            },
        });

        if (!asesorExiste) {
            return res.status(400).json({ msg: "No existe el asesor de ventas" });
        }

        const clientePotencialExiste = await prisma.clientePotencial.findUnique({
            where: {
                id: parseInt(id_cliente_potencial), // Parsea el valor a entero si es necesario
            },
        });
        if (!clientePotencialExiste) {
            return res.status(400).json({ msg: "No existe el usuario" });
        }

        const asesorVclienteP = await prisma.asignacionPotencial.create({
            data: {
                id_asesor_venta: parseInt(id_asesor_venta), // Parsea el valor a entero si es necesario
                id_cliente_potencial: parseInt(id_cliente_potencial), // Parsea el valor a entero si es necesario
            },
        });

        res.json(asesorVclienteP);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al asignar usuario_asesor" });
    }
};

export const editarAsignacionPotencial = async (req, res) => {
    try {
        const { id_cliente_potencial, id_asesor_venta } = req.body;
        console.log(id_cliente_potencial, id_asesor_venta);

        // Verificar si el asesor existe por su nombre
        const asesorVentasExiste = await prisma.asesorVentas.findUnique({
            where: {
                id: Number(id_asesor_venta),
            },
        });

        if (!asesorVentasExiste) {
            return res.status(400).json({ msg: "No existe el asesor de ventas" });
        }

        // Verificar si el usuario existe por su ID
        const clientePotencialExiste = await prisma.clientePotencial.findUnique({
            where: {
                id: Number(id_cliente_potencial),
            },
        });

        if (!clientePotencialExiste) {
            return res.status(400).json({ msg: "No existe el cliente potencial" });
        }

        // Verificar si la asignación ya existe
        const asignacionExistente = await prisma.asignacionPotencial.findFirst({
            where: {
                id_cliente_potencial: Number(id_cliente_potencial),
                // id_asesor_venta: asesorExiste.id,
            },
        });

        if (!asignacionExistente) {
            return res.status(400).json({ msg: "No existe una asignación previa" });
        }

        // Crear la asignación en la base de datos
        await prisma.asignacion.updateMany({
            where: {
                id_cliente_potencial: Number(id_cliente_potencial),
            },
            data: {
                id_cliente_potencial: Number(id_cliente_potencial),
                id_asesor_venta: Number(asesorVentasExiste.id),
            },
        });

        // res.json({ msg: "Asignación de usuario actualizada correctamente" });
        res.status(200).json({ msg: "Asignación del cliente actualizada correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al editar la asignación de usuario" });
    }
};

export const eliminarAsignacionPotencial = async (req, res) => {
    const { id } = req.params;
    try {
        const encontrarAsesorVentas = await prisma.asesorVentas.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!encontrarAsesorVentas) {
            return res.status(404).json({
                message: "Asesor de ventas no encontrado",
            });
        }
        await prisma.asignacion_potencial.delete({
            where: {
                id: Number(id),
            },
        });
        return res.status(200).json({
            message: "Asignación potencial eliminada",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message,
        });
    }
};

