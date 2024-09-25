const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const turma = await prisma.turma.create({
            data: {
                nome: req.body.nome
            }
        });
        res.status(201).json(turma);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar turma" + error.message })
    }
}

const read = async (req, res) => {
    if (req.params.idTurma !== undefined) {
        const turma = await prisma.turma.findUnique({
            where: {
                idTurma: parseInt(req.params.idTurma)
            }
        });
        return res.json(turma)
    } else {
        const turmas = await prisma.turma.findMany()
        return res.json(turmas)
    }
}

const update = async (req, res) => {
    try {
        const turma = await prisma.turma.update({
            where: {
                idTurma: parseInt(req.params.idTurma)
            },
            data: {
                data: req.body
            }
        })
        res.status(202).json(turma);
    } catch (error) {
        res.status(404).json({ message: "Turma não encontrada" + error.message})
    }
}

const del = async (req, res) => {
    try {
        const turma = await prisma.turma.delete({
            where: {
                idTurma: parseInt(req.params.idTurma)
            }
        });
        res.status(204).json(turma);
    } catch (error) {
        res.status(404).json({ message: "Turma não encontrada" + error.message})
    }
}

module.exports = {
    create,
    read,
    update,
    del,
}