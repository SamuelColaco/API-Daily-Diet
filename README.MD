# API Daily Diet

A **API Daily Diet** é uma aplicação desenvolvida para gerenciar sua dieta, permitindo que usuários registrem, visualizem e atualizem suas refeições, e verifiquem sua alimentação.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Fastify**: Framework para construção de aplicações web.
- **PostgreSQL**: Banco de dados SQL para armazenamento de dados.
- **JWT (JSON Web Tokens)**: Sistema de autenticação para garantir a segurança das rotas.
- **Prisma**: ORM para realizar registros no banco de dados.

## Instalação

### Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/).
- **Docker**: Tenha o Docker instalado e em funcionamento. Mais informações em [https://www.docker.com/](https://www.docker.com/).

### Passos para Instalação

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/SamuelColaco/API-Daily-Diet.git

2. **Ir para o Diretório**
    ```bash
    cd API-Daily-Diet
3. **Instalar as Dependências**
    ```bash
    npm install
4. **Crie um arquivo .env na raiz do projeto**
    E coloque nele essas variavéis de ambiente

    DATABASE_URL="escreva a url do banco de dados aqui (postgresql://user:password@db:5432/daily_diet)"
    AUTH_SECRET="Escreva seu secret aqui"
5. **Rode o Servidor**
    ```bash
    npm run dev
    'O servidor estará disponivél em http://localhost:3333'

## Docker

- **Comando para rodar o docker-compose**
    ```docker
    docker-compose up -d
- **Comando para verificar o container rodando**
    ```docker
    docker ps ou docker-compose ps
- **Comando para parar o container**
    ```docker
    docker-compose down

## EndPoints

### POST
    URL: /session
    Propósito: Cria um token JWT
    Body: {
        "email":"email do usuário",
        "password":"senha do usuário"
    }
    Message: {
	"token": "Token JWT aparece_aqui"
    }
    StatusCode: 201(Created)

    URL: /user
    Propósito: Cria um novo usuário
    Body: {
	"name": "nome",
	"email": "email",
	"password": "senha".
    "role": "member" ou "admin"(Caso não seja atribuido um cargo irá ser "member" de padrão)
    }
    Message: {
        "Não tem mensagem"
    }
    StatusCode: 201(Created)

    URL: /meal
    Propósito: Cadastra uma refeição
    Body: {
        "name": "nome da comida",
        "description": "Caso queria, colocar descrição do que comeu",
        "date": "Data do dia da refeição. Data nesse formato: 2025-07-08",
        "hour": "Hora do dia em que fez a refeição",
        "InDiet": Booleano(true ou false), se está na sua dieta essa refeição
    }
    Header: 
        Authorization: Bearer seu_token_aqui
    Message: {
        "Não tem mensagem"
    }
    StatusCode: 201(Created)

### GET
    URL: /user
    Propósito: Lista todos os usuários
    Body: Não prescisa passar nada
    Header: 
        Authorization: Bearer seu_token_aqui
    Reposta: [
	{
		"id": "Id do usuário em formato UUID",
		"name": "Nome",
		"email": "email",
		"password_hash": "Senha em formato HASH: $2b$08$aRjpep6EFNnHSBVctXG09.ALi0Y87hlC52Eb5aURXTVhNCB9ugw46",
		"role": "Cargo do usuário. (Caso não seja atribuido um o cargo aparecerá como "member")",
		"createdAt": " Data da criação do usuário: 2025-03-06T11:45:53.476Z",
		"updatedAt": "Data da ultima vez que ele foi atualizado: 2025-03-06T12:09:56.320Z"
	},
    ]
    StatusCode: 200(Ok)

     URL: /meal
     Propósito: Lista todas as refeições
    Body: Não prescisa passar nada
    Header: 
        Authorization: Bearer seu_token_aqui
    Reposta: [
	{
		"id": "Id do usuário em formato UUID",
		"name": "Nome",
        "description": "Descrição caso tenha (Caso não tenha será "Não tem descrição")",
        "date": "Data do dia da refeição. Data nesse formato: 2025-07-08",
        "hour": "Hora do dia em que fez a refeição",
        "InDiet": Booleano(true ou false), se está na sua dieta essa refeição
		"createdAt": " Data da criação do usuário: 2025-03-06T11:45:53.476Z",
		"updatedAt": "Data da ultima vez que ele foi atualizado: 2025-03-06T12:09:56.320Z"
	},
    ]
    StatusCode: 200(Ok)


        URL: /meal/:id
        Propósito: Lista as refeições de determinado usuário
    Body: Não prescisa passar nada
    Header: 
        Authorization: Bearer seu_token_aqui
    Reposta:{
	"meals": [
		{
			"id": "Id da refeição em  formato UUID",
			"userId": "Id do usuário que cadastrou a refeição",
			"name": "Nome da refeição",
			"description": "Descrição caso tenha(Caso não tenha, aparecerá "Não tem descrição")",
			"date": " Data da refeição",
			"hour": "Hora da refeição",
			"InDiet": Booleano(true ou false)
		}
	]
}
    StatusCode: 200(Ok)


    URL: /meal/list/:id
    Propósito: Lista determinados parametros de um usuário
    Body: Não prescisa passar nada
    Header: 
        Authorization: Bearer seu_token_aqui
    Reposta: {
        "numberOfMealsRegister": Número de refeições de determinado usuário adicionadas,
        "numberOfMealsInDiet": Número de refeições desse usuário que fazem parte da sua dieta,
        "numberOfMealsNotInDiet": Número de refeições desse usuário que não fazem parte da dieta
    }
    StatusCode: 200(Ok)


### PUT

    URL: /user/:id
    Prpósito: Atualiza um usuário
    Body: {
        Passa o quer atualizar do usuário, por exemplo: {
	        "password": "nova senha"
        }
    }
    Message: {
        "Não tem mensagem"
    }
    StatusCode: 200(Ok)

    URL: /meal/:id
    Propósito: Atualiza uma refeição
    Body: {
        Passa o quer atualizar da refeição, por exemplo: {
	        "name": "novo nome da refeição"
        }
    }
    Message: {
        "Não tem mensagem"
    }
    StatusCode: 200(Ok)

## Testes

- **Para executar os testes**
    ```bash
    npm run test



## Obrigado 


