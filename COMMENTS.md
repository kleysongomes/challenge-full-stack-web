# Guia de Instalação e Comentários do Projeto

## Instruções Básicas para Subir o Frontend

1. Navegue até o diretório `frontend/`:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Rode o projeto localmente:
   ```bash
   npm run dev
   ```

---

## Instruções Básicas para Subir o Backend

1. Navegue até o diretório `backend/`:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Rode o servidor backend:
   ```bash
   node index.js
   ```

---

## Instrução para Subir o Banco de Dados com Docker

Certifique-se de estar na raiz do projeto ou onde estão os arquivos `docker-compose.yml`, `.env` e `init.sql`.

Execute o seguinte comando para iniciar o container do banco:

```bash
docker-compose up -d
```

O banco será iniciado na porta 5432 e já será populado com os dados do `init.sql`.

---

## Decisão da Arquitetura Utilizada
> Optei por separar as responsabilidades do Frontend e do Backend, facilitando uma manutenção caso desejado. 
- No Frontend contendo a aplicação do cliente em Vue 3 + Vite + Vuetify, com uma separação entre componentes, layouts e arquivos de configuração detalhados por pastas facilitando a leitura. 
- No Backend temos a API em Node.js + Express onde temos toda a lógica do negócio e toda e qualquer comunicação com o banco de dados. 
- Para o Banco optei pelo uso do DOCKER via docker-compose para facilitar subir o banco e a tabela dando mais praticidade para iniciar o desenvolvimento. 
- Ainda outra decição de separação dos scripts de dependências do Fornt e do Back. 


## Lista de Bibliotecas de Terceiros Utilizadas
> Para o BACKEND:
    "cors": "^2.8.5",
    "dotenv": "^17.2.0",
    "express": "^5.1.0",
    "pg": "^8.16.3"
	
> Para o FRONTEND:
    "@mdi/font": "^7.4.47",
    "axios": "^1.10.0",
    "sass": "^1.89.2",
    "sass-loader": "^12.6.0",
    "vite-plugin-vuetify": "^2.1.1",
    "vue": "^3.5.17",
    "vue-router": "^4.5.1",
    "vuetify": "^3.3.23"

## O que você melhoraria se tivesse mais tempo?
> - Trabalharia em uma melhor validação de campos já no frontend assim como a formatação no preenchimento.
> - Melhoraria a exibição dos dados no front como o CPF não exibindo todos os dígitos adicionadno alguns *** na exibição.
> - Adicionaria autenticação para a comunicação entre o Frontend e o Backend. 

## Quais requisitos não foram entregues?
> - Testes de unidade
> - Segurança da aplicação (autenticação, autorização, ...)
