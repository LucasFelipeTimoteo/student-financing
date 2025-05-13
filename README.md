# 🎓 Student Finance Simulator

Simule e analise diferentes cenários de financiamento estudantil de forma simples, rápida e transparente.

## 🚀 Visão Geral

O **Student Finance Simulator** é uma API desenvolvida para ajudar estudantes, instituições e desenvolvedores a calcular e comparar opções de financiamento estudantil. Com ela, é possível simular parcelas, taxas de juros, prazos e obter projeções detalhadas para tomada de decisão.

## ✨ Funcionalidades

- Simulação de financiamentos com diferentes taxas e prazos
- Sistema de Registro de estudantes (usuários) com autenticação e autorização via JWT
- API RESTful pronta para integração com frontends ou outros sistemas
- Configuração flexível via arquivos `.env`

## 🛠️ Tecnologias E conceitos Utilizados

- **Node.js** & **TypeScript**
- **Express.js** 
- **modo de produção** com minificação de código e otimizações para código em produção
- **Jest** para testes automatizados
- **Docker** para containerização
- **Postgre** e **typeORM** para armazenamento de dados
- **jsonWebToken** para auth
- **zod** para validações (apenas validações que não são parte das regras de negócio)
- **husky** com **Biome**, **jest** e *supertest* para garantir padronização e bom funcionamento da aplicação
- **clean Architecture** para arquitetura modular e escalável

## 📦 Instalação

Clone o repositório:
```sh
git clone git@github.com:LucasFelipeTimoteo/student-financing.git
cd student-finance-simulator
```
Instale as dependências
```sh
npm install
```
Configure as variáveis de ambiente
- crie um arquivo **.env** no raiz do projeto
- se quiser, use como exemplo as envs do arquivo `example_env.txt`

## ▶️ Como Rodar
Localmente
1 - configure a env `APP_LOCAL="local_machine"`
```sh
npm run start:dev
```
Docker (compose)
1 - (opcional) configure a env `APP_LOCAL="docker"`
```sh
docker compose up --build
```
## Testes
os principais comandos de teste são
(ver lista completa em package.json)

```sh
npm run test
```
```sh
npm run test:watch
```
```sh
npm run test:e2e
```
```sh
npm run test:e2e:watch
```
## Documentação
swagger docs:
```sh
npm run api-docs
```

## Algumas explicações tecnicas
- geral: ver no arquivo `technical-explanations.md`
- arquitetura do projeto: ver no arquivo `ARCHITECTURE_EXPLANATION.md`

## Pontos a melhorar
- Sistema de error handling não é totalmente modular, depende do express

## TODO (Coisas que não deu tempo de implementar ou resolver)
- o studentId da tabela simulation não é uma foreign key, pois a ORM gera uma tipagem diferente em formato de objeto ao invés do tipo primitivo que espero receber, o que quebra a aplicação caso eu continue mantendo as regras de negócio da aplicação sem referência a tipagem de libs