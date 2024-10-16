const formLogin = document.getElementById("formLogin");
const msgErro = document.getElementById('msgErro');

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = formLogin.email.value;
    const senha = formLogin.senha.value;
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
    });
    //Se o login estiver incorreto mostra por 3 segundos que está errado e volta a ser escondido

    if(response.ok){
        const professor = await response.json()
        localStorage.setItem('professor', JSON.stringify({ matricula: professor.matricula, nome: professor.nome }));
        window.location.href = './telaProfessor.html'
    } else {
        msgErro.textContent = "E-mail ou senha inválidos!";
        msgErro.classList.remove('hidden');
        setTimeout(() => {
            msgErro.classList.add('hidden');
        }, 3000);
    }
});