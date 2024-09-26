-- CreateTable
CREATE TABLE `Professor` (
    `matricula` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Professor_email_key`(`email`),
    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turma` (
    `idTurma` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `matricula` INTEGER NOT NULL,

    PRIMARY KEY (`idTurma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Atividade` (
    `idAtividade` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `idTurma` INTEGER NOT NULL,
    `matricula` INTEGER NOT NULL,

    PRIMARY KEY (`idAtividade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_matricula_fkey` FOREIGN KEY (`matricula`) REFERENCES `Professor`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atividade` ADD CONSTRAINT `Atividade_matricula_fkey` FOREIGN KEY (`matricula`) REFERENCES `Professor`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atividade` ADD CONSTRAINT `Atividade_idTurma_fkey` FOREIGN KEY (`idTurma`) REFERENCES `Turma`(`idTurma`) ON DELETE RESTRICT ON UPDATE CASCADE;
