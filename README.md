🍔 Dev & Grill – Backend API

API REST profissional para e-commerce com pagamentos online

📌 Visão Geral

O Dev & Grill Backend é uma API REST desenvolvida para sustentar uma aplicação completa de e-commerce, contemplando autenticação, gestão de produtos, pedidos, pagamentos online e persistência híbrida de dados.

O projeto foi pensado com foco em boas práticas, escalabilidade, segurança e deploy em ambiente real, sendo utilizado como projeto de portfólio full stack.

🧠 Principais Decisões Técnicas

- Arquitetura REST bem definida

- Separação de responsabilidades (controllers, models, services)

- Autenticação JWT stateless

- Banco relacional (PostgreSQL) para dados críticos

- Banco NoSQL (MongoDB) para dados auxiliares

- Gateway de pagamento Stripe

- Deploy em VPS usando Docker + EasyPanel

🛠️ Stack Tecnológica

- Node.js

- Express

- Sequelize (ORM)

- PostgreSQL

- MongoDB

- JWT

- Stripe API

- Multer (upload de arquivos)

- Docker

- EasyPanel

🔐 Autenticação & Segurança

- Login com geração de JWT

- Middleware de autenticação para rotas protegidas

- Validação de dados com Yup

- Controle de CORS configurável por ambiente

💳 Pagamentos

- Integração completa com Stripe

- Criação de PaymentIntent

- Cálculo de valor no backend (segurança contra fraude)

- Confirmação de pagamento no frontend

🐳 Docker & Deploy

- Build automatizado via Dockerfile

- Deploy em VPS usando EasyPanel

- Zero-downtime deploy

- Configuração pronta para produção

🎯 Funcionalidades

- Autenticação de usuários

- CRUD de categorias e produtos

- Upload de imagens

- Criação de pedidos

- Integração com pagamentos online

- Persistência híbrida (SQL + NoSQL)
