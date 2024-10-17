# Sistema de Turmas e Atividades

Este sistema foi desenvolvido para gerenciar turmas e atividades utilizando tecnologias web.

## Requisitos

### Sistema Gerenciador de Banco de Dados (SGBD)
- **SGBD**: MYSQL 
### Linguagem de Programação
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js

### Outros Requisitos
- **Node.js**: Versão 14.0 ou superior
- **npm**: Versão 6.0 ou superior

## Instruções de Instalação

1. Clone o repositório:
    ```bash
   git clone https://github.com/carloshosiqueira/Sistema-de-Turmas-e-Atividades-Prova-.git
    ```
2. Navegue até a pasta API do projeto:
    ```bash
    cd api
    ```
3. Instale as dependências do projeto:
    ```bash
    npm i
    ```
4. Abra o Aplicativo XAMPP e inicie o MYSQL crie um banco de dados chamado Escola07

5. Navegue até a pasta **./api/prisma** e execute o comando 
    ```bash
    npx prisma migrate dev --name init
    ```
6. Abra o arquivo **index.html** com o live server, utilize o login:
    - "email": "jose@exemplo.com",
    - "senha": "1234"
- Ou verifique o arquivo professor.json na pasta **./api/prisma/seed** para mais professores
7. Utilize o botão **"Cadastrar Turma"** para cadastrar mais turmas àquele professor
8. Utilize o botão **"Excluir"** para excluir uma turma, se esta turma tiver uma atividade nela, ela não poderá ser excluída
9. Utilize o botão **"Visualizar"** para exibir as atividades daquela turma, e clique no botão **"Cadastrar Atividade"** para adicionar uma atividade à turma