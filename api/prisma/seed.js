const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const professores = require('./seed/professor.json')
const atividades = require('./seed/atividade.json')
const turmas = require ('./seed/turma.json')

async function main() {
    for (const professor of professores) {
        await prisma.professor.create({
            data: professor
        });
    }
    for (const atividade of atividades) {
        await prisma.atividade.create({
            data: atividade
        });
    }
    for (const turma of turmas) {
        await prisma.turma.create({
            data: turma
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
        console.log('Seed complete');
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });