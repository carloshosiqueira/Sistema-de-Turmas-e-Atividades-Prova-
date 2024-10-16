document.addEventListener('DOMContentLoaded', () => {
    const professor = JSON.parse(localStorage.getItem('professor'));
    if (professor) {
        document.getElementById('professor').textContent = professor.nome;
    } else {
        console.error("Professor não encontrado no localStorage");
    }
    getTurmasByProfessor()
});
const modalCadastroTurma = document.getElementById('modalCadastroTurma')
const modalDeletarTurma = document.getElementById('modalDeletarTurma')
const modalAtividadesTurma = document.getElementById('modalAtividadesTurma')

//Formulário para cadastrar nova turma
const formCadastroTurma = document.getElementById("formCadastroTurma")

formCadastroTurma.addEventListener('submit', async (e) => {
    const professor = JSON.parse(localStorage.getItem('professor'))
    e.preventDefault();

    const matricula = professor.matricula;
    const nome = formCadastroTurma.nome.value

    try {
        const response = await fetch('http://localhost:3000/turma', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, matricula })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Erro ao cadastrar turma: ' + errorData.message);
        } else {
            const turma = await response.json();
            console.log('Turma cadastrada com sucesso:', turma);
            window.location.reload()
        }

    } catch (e) {
        console.error('Erro ao cadastrar turma:', e);
    }
});

//Exibir turmas baseadas na matricula do professor na tabela
const dadosTurma = document.getElementById('dadosTurma')

async function getTurmasByProfessor() {
    const professor = JSON.parse(localStorage.getItem('professor'));
    const matricula = professor.matricula;

    const response = await fetch(`http://localhost:3000/turma`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Erro ao buscar turmas: ' + errorData.message);
    } else {
        const turmas = await response.json();
        dadosTurma.innerHTML = ''; // Limpa a tabela antes de carregar novos dados
        turmas.forEach(turma => {
            if (turma.matricula === matricula) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${turma.idTurma}</td>
                    <td>${turma.nome}</td>
                    <td>
                        <button onclick="abrirModalDeletar(${turma.idTurma})">Excluir</button>
                        <button onclick="abrirModalAtividades(${turma.idTurma, turma.nome})">Visualizar</button>
                    </td>
                `;
                dadosTurma.appendChild(row);
            }
        });
    }
}

async function deletarTurma(idTurma) {
    try {
        const response = await fetch(`http://localhost:3000/turma/${idTurma}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Erro ao deletar turma: ' + errorData.message);
        } else {
            console.log('Turma deletada com sucesso');
            window.location.reload()
        }
    } catch (e) {
        console.error('Erro ao deletar turma:', e);
    }
}

//Abrir modal de cadastrar turma
document.getElementById('btnCadastroTurma').addEventListener('click', () => {
    modalCadastroTurma.style.display = 'flex'; // Mostra o modal
});
//Abrir modal de excluir turma
function abrirModalDeletar(idTurma) {
    modalDeletarTurma.style.display = 'flex'; // Mostra o modal
    document.getElementById('btnExcluirTurma').addEventListener('click', (e) => {
        e.preventDefault();
        deletarTurma(idTurma); // Chama a função de deletar a turma
    });
}

//Abrir modal de atividades

function abrirModalAtividades(idTurma, nome) {
    modalAtividadesTurma.style.display = 'flex'
    const nomeDaSala = document.getElementById("nomeDaSala")
    nomeDaSala.textContent = nome

}

// Sair 
document.getElementById('btnSair').addEventListener('click', () => {
    localStorage.removeItem('professor'); // Remove o professor do localStorage
    window.location.href = './index.html'; // Redireciona para a página de login
});
