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
const modalCadastroAtividade = document.getElementById('modalCadastroAtividade')
const modalDeletarTurma = document.getElementById('modalDeletarTurma')
const modalAtividadesTurma = document.getElementById('modalAtividadesTurma')

//Formulário para cadastrar nova turma
const formCadastroTurma = document.getElementById("formCadastroTurma")
const formCadastroAtividade = document.getElementById("formCadastroAtividade")

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

formCadastroAtividade.addEventListener('submit', async (e) => {
    const professor = JSON.parse(localStorage.getItem('professor'))
    e.preventDefault();
    const matricula = professor.matricula;
    const nome = formCadastroAtividade.nome.value;
    
    //Pegando id da turma (tentando)
    
    const response = await fetch(`http://localhost:3000/turma`);
    const turmas = await response.json();
    let idTurma; // Declare `idTurma` aqui para que possa ser acessado depois
    
    turmas.forEach(turma => {
        if (turma.matricula === matricula) {
            idTurma = turma.idTurma; // Atribua o valor sem usar `const`
        }
    });
    
    try {
        const response = await fetch('http://localhost:3000/atividade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, idTurma, matricula })
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
const dadosAtividades = document.getElementById('dadosAtividades');


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
                        <button onclick="abrirModalAtividades(${turma.idTurma}); carregarTabelaAtividades(${turma.idTurma})">Visualizar</button>
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
        alert('Você não pode excluir uma turma com atividades cadastradas')
        console.error('Erro ao deletar turma:', e);
    }
}

//Abrir modal de cadastrar turma
document.getElementById('btnCadastroTurma').addEventListener('click', () => {
    modalCadastroTurma.style.display = 'flex'; // Mostra o modal
});
document.getElementById('btnCadastroAtividade').addEventListener('click', (idTurma) => {
    modalAtividadesTurma.style.display = 'none';
    modalCadastroAtividade.style.display = 'flex'; // Mostra o modal
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

async function abrirModalAtividades(idTurma) {
    modalAtividadesTurma.style.display = 'flex'
    const response = await fetch(`http://localhost:3000/turma/${idTurma}`)
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Erro ao buscar turma: ' + errorData.message);
    } else {
        const turma = await response.json();
        document.getElementById('nomeDaSala').textContent = turma.nome
    }
};

//Carregar tabela no modal de atividades

async function carregarTabelaAtividades(idTurma){
    const response = await fetch(`http://localhost:3000/atividadeTurma/${idTurma}`)
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Erro ao buscar atividades: ' + errorData.message);
    } else {
        const atividades = await response.json();
        dadosAtividades.innerHTML = ''; // Limpa a tabela antes de carregar novos dados
        atividades.forEach(atividade => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${atividade.idAtividade}</td>
                <td>${atividade.nome}</td>
                `
                dadosAtividades.appendChild(row);
        });
    };
}

document.getElementById('btnFecharModalTurma').addEventListener('click', (e) => {
    e.preventDefault()
    modalCadastroTurma.style.display = 'none'; // Esconde o modal
});

document.getElementById('btnFecharModalAtividade').addEventListener('click', (e) => {
    e.preventDefault()
    modalAtividadesTurma.style.display = 'none'; // Esconde o modal
});
document.getElementById('btnFecharModalCadastroAtividades').addEventListener('click', (e) => {
    e.preventDefault()
    modalCadastroAtividade.style.display = 'none'; // Esconde o modal
});

// Sair 
document.getElementById('btnSair').addEventListener('click', () => {
    localStorage.removeItem('professor'); // Remove o professor do localStorage
    window.location.href = './index.html'; // Redireciona para a página de login
});
