# Culqui Backend

Proyecto tokenizador de tarjetas.

## Instalación

Para instalar este proyecto de manera local, es necesario contar con Docker instalado.

1- Instalar PostGreSQL

```bash
docker run -d --rm --name postgres -e POSTGRES_USER=usr -e POSTGRES_PASSWORD=123 -e POSTGRES_DB=db -p 5432:5432 postgres
```

2- Instalar Redis

```bash
docker run -p 6379:6379 -it redis/redis-stack-server:latest
```

3- Instalar dependencias

```bash
npm install
```

## Uso

1- Generar el build

```bash
npm run build
```

2- Para iniciar el proyecto de manera local ejecutar el comando
```bash
npm run local
```

3- Para ejecutar el test
```bash
npm run tests
```

4- Generar un token nuevo

POST - http://localhost:3000/dev/token

Request:
{
"card_number": "4111111111111111",
"cvv": "123",
"expiration_month": "02",
"expiration_year": "2026",
"email": "carlos@gmail.com"
}

5- Para obtener datos de la tarjeta

GET - http://localhost:3000/dev/token/{token}

HEADERS

Authorization: Bearer pk_test_0ae8dW2FpEAZlxlz