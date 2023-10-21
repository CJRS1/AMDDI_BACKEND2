-- CreateTable
CREATE TABLE `asesor_ventas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pwd_hash` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido_paterno` VARCHAR(50) NOT NULL,
    `apellido_materno` VARCHAR(50) NOT NULL,
    `dni` VARCHAR(8) NOT NULL,
    `celular` VARCHAR(18) NULL,
    `pais` VARCHAR(191) NULL,
    `rol` VARCHAR(191) NULL DEFAULT 'normal',
    `departamento` VARCHAR(50) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `asesor_ventas_email_key`(`email`),
    UNIQUE INDEX `asesor_ventas_dni_key`(`dni`),
    UNIQUE INDEX `asesor_ventas_celular_key`(`celular`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente_potencial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_amddi` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido_paterno` VARCHAR(50) NOT NULL,
    `apellido_materno` VARCHAR(50) NOT NULL,
    `dni` VARCHAR(8) NOT NULL,
    `celular` VARCHAR(18) NULL,
    `pais` VARCHAR(191) NULL,
    `categoria` VARCHAR(191) NULL DEFAULT 'normal',
    `departamento` VARCHAR(50) NOT NULL,
    `carrera` VARCHAR(30) NOT NULL,
    `tema` VARCHAR(255) NULL,
    `fecha_cumpleanos` VARCHAR(255) NULL,
    `proveniencia` VARCHAR(255) NULL,
    `estado_venta` VARCHAR(255) NULL,
    `observacion` VARCHAR(255) NULL,
    `link_reunion` VARCHAR(255) NULL,
    `fecha_reunion` VARCHAR(255) NULL,
    `urgencia` VARCHAR(255) NULL,
    `concretado` VARCHAR(191) NOT NULL DEFAULT 'false',
    `servicio` VARCHAR(200) NOT NULL,
    `monto_total` DOUBLE NULL DEFAULT 0,
    `monto_restante` DOUBLE NULL DEFAULT 0,
    `monto_pagado` DOUBLE NULL DEFAULT 0,
    `institucion_educativa` VARCHAR(255) NULL,
    `created_at` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cliente_potencial_email_key`(`email`),
    UNIQUE INDEX `cliente_potencial_dni_key`(`dni`),
    UNIQUE INDEX `cliente_potencial_celular_key`(`celular`),
    UNIQUE INDEX `cliente_potencial_servicio_key`(`servicio`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente_concretado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_amddi` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido_paterno` VARCHAR(50) NOT NULL,
    `apellido_materno` VARCHAR(50) NOT NULL,
    `dni` VARCHAR(8) NOT NULL,
    `celular` VARCHAR(18) NULL,
    `pais` VARCHAR(191) NULL,
    `categoria` VARCHAR(191) NULL DEFAULT 'normal',
    `departamento` VARCHAR(50) NOT NULL,
    `carrera` VARCHAR(30) NOT NULL,
    `tema` VARCHAR(255) NULL,
    `fecha_cumpleanos` VARCHAR(255) NULL,
    `link_reunion` VARCHAR(255) NULL,
    `fecha_reunion` VARCHAR(255) NULL,
    `concretado` VARCHAR(191) NOT NULL DEFAULT 'false',
    `servicio` VARCHAR(200) NOT NULL,
    `monto_total` DOUBLE NULL DEFAULT 0,
    `monto_restante` DOUBLE NULL DEFAULT 0,
    `monto_pagado` DOUBLE NULL DEFAULT 0,
    `institucion_educativa` VARCHAR(255) NULL,
    `created_at` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cliente_concretado_email_key`(`email`),
    UNIQUE INDEX `cliente_concretado_dni_key`(`dni`),
    UNIQUE INDEX `cliente_concretado_celular_key`(`celular`),
    UNIQUE INDEX `cliente_concretado_servicio_key`(`servicio`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asignacion_potencial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_asesor_venta` INTEGER NOT NULL,
    `id_cliente_potencial` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asignacion_concretada` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_asesor_venta` INTEGER NOT NULL,
    `id_cliente_concretado` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `asignacion_potencial` ADD CONSTRAINT `asignacion_potencial_id_cliente_potencial_fkey` FOREIGN KEY (`id_cliente_potencial`) REFERENCES `cliente_potencial`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignacion_potencial` ADD CONSTRAINT `asignacion_potencial_id_asesor_venta_fkey` FOREIGN KEY (`id_asesor_venta`) REFERENCES `asesor_ventas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignacion_concretada` ADD CONSTRAINT `asignacion_concretada_id_cliente_concretado_fkey` FOREIGN KEY (`id_cliente_concretado`) REFERENCES `cliente_concretado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asignacion_concretada` ADD CONSTRAINT `asignacion_concretada_id_asesor_venta_fkey` FOREIGN KEY (`id_asesor_venta`) REFERENCES `asesor_ventas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
