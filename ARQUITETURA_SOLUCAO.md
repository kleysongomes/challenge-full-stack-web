
#  Documentação da Arquitetura da Solução

## 1. Visão Geral

Este documento descreve a arquitetura da solução adotada no projeto `challenge-full-stack-web`. A aplicação é composta por uma interface web para cadastro e consulta de alunos, consumindo uma API REST desenvolvida em Node.js com banco de dados PostgreSQL, utilizando Docker para orquestração.

---

## 2. Arquitetura da Solução

### 2.1 Estrutura Geral

```
challenge-full-stack-web/
├── backend/       		# API RESTful (Node.js + Express)
│   ├── src/           		# Código-fonte da API
│   ├── .env          		# Variáveis de ambiente (configuração do DB, porta, etc)
│   └── server.js    		# Ponto de entrada da aplicação
│
├── frontend/       		# Interface web (Vue 3 + Vite + Vuetify)
│   ├── src/           		# Componentes Vue, rotas, views
│   └── public/     		# Assets públicos (favicon, etc)
│
├── docker-compose.yml 		# Orquestração do ambiente (PostgreSQL)
├── init-sql/          		 # Script de inicialização do banco
├── postgres-data/    # Persistência de volume do PostgreSQL
└── README.md        # Instruções básicas de uso
```

---

## 3. Tecnologias Utilizadas

| Camada        | Tecnologia               |
|---------------|--------------------------|
| Frontend      | Vue 3, Vuetify, Vite     |
| Backend       | Node.js, Express         |
| Banco de Dados| PostgreSQL               |
| Containerização | Docker + Docker Compose |
| Comunicação   | Axios (REST API)         |

---

## 4. Comunicação entre camadas

- O **Frontend** se comunica com o **Backend** via chamadas HTTP REST (GET, POST, PUT, DELETE).
- O **Backend** acessa diretamente o banco PostgreSQL via biblioteca `pg`.
- O banco é executado em um container Docker separado, acessado por `host.docker.internal` ou `localhost` conforme o ambiente.

---

## 5. Orquestração com Docker

- O projeto possui um `docker-compose.yml` responsável por:
  - Subir o container do PostgreSQL.
  - Executar o script de inicialização presente em `init-sql/` para criar tabelas e registros iniciais.
- O backend e frontend são executados fora do Docker neste cenário (modo local), mas podem ser dockerizados se necessário.

---

## 6. Rotas Principais da API

| Método | Rota                  | Descrição                  |
|--------|------------------------|----------------------------|
| GET    | `/students`           | Lista todos os alunos      |
| GET    | `/students/:ra`       | Retorna um aluno por RA    |
| POST   | `/students`           | Cadastra novo aluno        |
| PUT    | `/students/:ra`       | Atualiza nome/email        |
| DELETE | `/students/:ra`       | Exclui aluno               |

---

## 7. Componentes do Frontend

| Página            | Descrição                                |
|-------------------|------------------------------------------|
| `/students`       | Lista de alunos + busca + ações          |
| `/students/new`   | Formulário de cadastro                   |
| `/students/:ra/edit` | Edição de aluno                       |

Componentes reutilizáveis:  
- `DefaultLayout.vue`  
- `StudentList.vue`  
- `StudentForm.vue`  

---

## 8.Segurança e Validações

- **Frontend**: Validação de campos obrigatórios, formato de RA, CPF e e-mail.
- **Backend**: Verificação de dados, tratamento de erros com mensagens amigáveis.
- **Banco de dados**: Constrainst de chave primária no RA, tipos definidos.

---

## 9. Possibilidades de Evolução

- Implementar autenticação de usuários (JWT).
- Dockerização completa do frontend/backend.
- Testes automatizados (unitários e de integração).

---

## 10. Observações Finais

- O projeto foi desenvolvido com foco em organização, legibilidade e separação de responsabilidades.
- A estrutura permite fácil manutenção e evolução da aplicação.
