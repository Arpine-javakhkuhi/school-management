-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `User` (email, password, firstName, lastName, createdAt, updatedAt)
VALUES ('admin@admin.com', '$2a$12$LoYGSwLrqEAW/ew/Nqe8aeFgnpWPFUIrW1kPhszKfPBdQ1dJ56AoK', 'Admin', 'User', NOW(), NOW());

