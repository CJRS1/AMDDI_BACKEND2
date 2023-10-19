import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const crearClientePotencial = async (req, res) => {
    try {
        const { email, pwd_hash, nombre, apeMat, apePat, dni, celular, pais } = req.body;
        const existingClientePotencial = await prisma.clientePotencial.findUnique({
            where: {
                email: email,
            },
        });
        if (existingClientePotencial) {
            // El correo electrónico ya está en uso
            return res.status(400).json({ msg: "El correo electrónico ya está registrado." });
        }
        const existingDNI = await prisma.clientePotencial.findUnique({
            where: {
                dni: dni,
            },
        });
        if (existingDNI) {
            // El DNI ya está en uso
            return res.status(400).json({ msg: "El DNI ya está registrado." });
        }

        // Hashea la contraseña antes de almacenarla
        const saltRounds = 10; // Número de rondas de hashing (ajusta según tu necesidad)
        const hashedPwd = await bcrypt.hash(pwd_hash, saltRounds);

        // Iniciar transacción
        const nuevoClientePotencial = await prisma.clientePotencial.create({
            data: {
                email,
                pwd_hash: hashedPwd, // Almacena la contraseña hasheada
                nombre,
                apeMat,
                apePat,
                dni,
                celular,
                pais,
                carrera,
                departamento
            },
        });
        res.json({ msg: "Cliente Potencial creado exitosamente", asesor: nuevoClientePotencial });
    } catch (error) {
        // Si hay un error, la transacción se revierte y el ID no aumentará
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor." });
    }
};

export const listarClientePotencial = async (req, res) => {
    try {
        const clientePotencial = await prisma.clientePotencial.findMany();
        return res.status(200).json({
            message: "Clientes Potenciales encontrados",
            content: clientePotencial,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: err.message,
        });
    }
};

export const traerClientePotencialPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const clientePotencial = await prisma.clientePotencial.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!clientePotencial) {
            return res.status(404).json({
                message: "Cliente Potencial no encontrado",
            });
        }
        return res.status(200).json({
            message: "Cliente Potencial encontrado",
            content: clientePotencial,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message,
        });
    }
};

export const actualizarClientePotencial = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const findClientePotencial = await prisma.clientePotencial.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!findClientePotencial) {
            return res.status(404).json({
                message: "Asesor de Ventas no encontrado",
            });
        }
        // Hash the password if it's provided
        if (data.pwd_hash) {
            const hashedPassword = await bcrypt.hash(data.pwd_hash, 10);
            data.pwd_hash = hashedPassword;
        }
        // if (data.email && !isValidEmail(data.email)) {
        //     return res.status(400).json({
        //         message: "El correo electrónico no es válido",
        //     });
        // }
        const ClientePotencial = await prisma.clientePotencial.update({
            where: {
                id: Number(id),
            },
            data: {
                pwd_hash: data.pwd_hash,
                email: data.email,
                nombre: data.nombre,
                apeMat: data.apeMat,
                apePat: data.apePat,
                dni: data.dni,
                celular: data.celular,
                pais: data.pais,
                departamento: data.pais,
            },
            select: {
                id: true,
                ...(data.pwd_hash && { pwd_hash: true }),
                ...(data.email && { email: true }),
                ...(data.nombre && { nombre: true }),
                ...(data.apeMat && { apeMat: true }),
                ...(data.apePat && { apePat: true }),
                ...(data.dni && { dni: true }),
                ...(data.celular && { celular: true }),
                ...(data.pais && { pais: true }),
                ...(data.departamento && { departamento: true }),
            },
        });

        return res.status(201).json({
            message: "Cliente Potencial actualizado",
            content: ClientePotencial,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message,
        });
    }
};

export const eliminarClientePotencial = async (req, res) => {
    const { id } = req.params;
    try {
        const findClientePotencial = await prisma.clientePotencial.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!findClientePotencial) {
            return res.status(404).json({
                message: "Asesor de Ventas no encontrado",
            });
        }

        await prisma.clientePotencial.delete({
            where: {
                id: Number(id),
            },
        });
        return res.status(200).json({
            message: "Asesor de Ventas eliminado",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message,
        });
    }
};
