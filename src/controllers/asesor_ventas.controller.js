import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const crearAsesorVentas = async (req, res) => {
    try {
        const { email, pwd_hash, nombre, apeMat, apePat, dni, celular, pais } = req.body;
        const existingAsesorVentas = await prisma.asesor_ventas.findUnique({
            where: {
                email: email,
            },
        });
        if (existingAsesorVentas) {
            // El correo electrónico ya está en uso
            return res.status(400).json({ msg: "El correo electrónico ya está registrado." });
        }
        const existingDNI = await prisma.asesor_ventas.findUnique({
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
        const nuevoAsesorVentas = await prisma.asesor_ventas.create({
            data: {
                email,
                pwd_hash: hashedPwd, // Almacena la contraseña hasheada
                nombre,
                apeMat,
                apePat,
                dni,
                celular,
                pais,
                departamento
            },
        });
        res.json({ msg: "AsesorVentas creado exitosamente", asesor: nuevoAsesorVentas });
    } catch (error) {
        // Si hay un error, la transacción se revierte y el ID no aumentará
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor." });
    }
};

export const traerAsesorVentasPorToken = async (req, res) => {
    try {
        const token = req.header('Authorization');
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
        const secretKey = process.env.SESSION_SECRET_AV; // Reemplaza con tu clave secreta real
        const tokenWithoutBearer = token.replace('Bearer ', ''); // Elimina "Bearer "
        const decoded = jwt.verify(tokenWithoutBearer, secretKey);
        console.log("hola", decoded);
        const asesorVentas = await prisma.asesor_ventas.findUnique({
            where: {
                email: decoded.email,
            },
            select: {
                id: true,
                nombre: true,
                apeMat: true,
                apePat: true,
                email: true,
                dni: true,
                celular: true,
                pais: true,
                departamento,
                rol: true,
            },
        });
        console.log("asesorVentas", asesorVentas);
        if (!asesorVentas) {
            return res.status(404).json({ message: 'Asesor de Ventas no encontrado' });
        }
        res.status(200).json({
            message: "Asesor de Ventas encontrado",
            content: asesorVentas,
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token no válido' });
    }
};


export const listarAsesorVentas = async (req, res) => {
    try {
        const asesoresVentas = await prisma.asesor_ventas.findMany();
        return res.status(200).json({
            message: "Asesor Ventas encontrados",
            content: asesoresVentas,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: err.message,
        });
    }
};

export const traerAsesorVentasPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const asesorVentas = await prisma.asesor_ventas.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!asesorVentas) {
            return res.status(404).json({
                message: "Asesor de Ventas no encontrado",
            });
        }
        return res.status(200).json({
            message: "Asesor de Ventas encontrado",
            content: asesorVentas,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message,
        });
    }
};

export const actualizarAsesorVentas = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const findAsesorVentas = await prisma.asesor_ventas.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!findAsesorVentas) {
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
        const asesorVentas = await prisma.asesor_ventas.update({
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
            message: "Asesor de Ventas actualizado",
            content: asesorVentas,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message,
        });
    }
};

export const eliminarAsesorVentas = async (req, res) => {
    const { id } = req.params;
    try {
        const findAsesorVentas = await prisma.asesor_ventas.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!findAsesorVentas) {
            return res.status(404).json({
                message: "Asesor de Ventas no encontrado",
            });
        }

        await prisma.asesor_ventas.delete({
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
