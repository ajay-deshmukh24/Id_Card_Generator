# Student Id Card Generator

Below are the steps to run this project locally on your machine

## Run Locally

Make sure you have Node.js LTS version present on your machine if not ownload and install Node.js LTS from:

```bash
  https://nodejs.org/en
```

Install docker and docker desktop on your machine

```bash
  https://www.docker.com/products/docker-desktop/
```

clone the repo

```bash
  git clone https://github.com/ajay-deshmukh24/Id_Card_Generator.git
```

Install dependencies

```bash
  npm install
```

Start PostgreSQL Container

```bash
  docker run --name idcard-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=idcarddb \
  -p 5432:5432 \
  -d postgres
```

Create .env file inside id-card-generator/

```bash
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/idcarddb?schema=public"
```

Generate Prisma Client

```bash
  npx prisma generate
```

Run Database Migration

```bash
  npx prisma migrate dev --name init
```

Run The Project

```bash
  npm run dev
```
