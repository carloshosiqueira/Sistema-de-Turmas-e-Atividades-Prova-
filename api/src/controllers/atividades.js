const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const atividade = await prisma.atividade.create({
            data: {
                nome: req.body.nome,
                idTurma: req.body.idTurma,
                matricula: req.body.matricula
            }
        });
        res.status(201).json(atividade);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar atividade" + error.message })
    }
}

const read = async (req, res) => {
    if (req.params.idAtividade !== undefined) {
        const atividade = await prisma.atividade.findUnique({
            where: {
                idAtividade: parseInt(req.params.idAtividade)
            }
        });
        return res.json(atividade)
    } else {
        const atividades = await prisma.atividade.findMany()
        return res.json(atividades)
    }
}

const update = async (req, res) => {
    try {
        const atividade = await prisma.atividade.update({
            where: {
                idAtividade: parseInt(req.params.idAtividade)
            },
            data: req.body
        })
        res.status(202).json(atividade);
    } catch (error) {
        res.status(404).json({ message: "atividade não encontrada" + error.message})
    }
}

const del = async (req, res) => {
    try {
        const atividade = await prisma.atividade.delete({
            where: {
                idAtividade: parseInt(req.params.idAtividade)
            }
        });
        res.status(204).json(atividade);
    } catch (error) {
        res.status(404).json({ message: "Atividade não encontrada" + error.message})
    }
}

module.exports = {
    create,
    read,
    update,
    del,
}