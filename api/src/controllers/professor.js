const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try{
        const {matricula, nome, email, senha } = req.body;
        const professor = await prisma.professor.create({
            data:{
                matricula: matricula,
                nome: nome,
                email: email,
                senha: senha
            }
        });
        res.status(201).json(professor);
    } catch (error) {
        res.status(400).json({message: "Erro ao criar professor" + error.message})
    }
};

// Realizar um read de professores se for necessario
const read = async (req, res) => {
    if (req.params.matricula !== undefined) {
        const professor = await prisma.professor.findUnique({
            where: {
               matricula: Number(req.params.matricula)
            }
        });
        return res.json(professor);
    } else {
        const agendas = await prisma.professor.findMany();
        return res.json(agendas);
    }
};

const update = async (req, res) => {
    try{
        const professor = await prisma.professor.update({
            where: {
                matricula: parseInt(req.params.matricula)
            },
            data: req.body
        });
        res.status(202).json(professor);
    } catch (error) {
        res.status(404).json({message: "Professor não encontrado" + error.message})
    }
}

const del = async (req, res) => {
    try{
        const professor = await prisma.professor.delete({
            where: {
                matricula: parseInt(req.params.matricula)
            }
        });
        res.status(204).json(professor);
    } catch (error) {
        res.status(404).json({message: "Professor não encontrado" + error.message})
    }
}

module.exports = {
    create,
    read,
    update,
    del,
}