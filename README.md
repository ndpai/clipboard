# clipboard
Clipboard PE_Staff Take Home Assignment

# Docker Node.js with SQLite Server

## Motivation

In this problem we’ll create a micro-service to address some functionality which is useful to
derive simplified summary statistics (mean, min, max) on a dataset.

## Usages

- Docker
- Docker-Compose
- npm
- Node.js
- Express
- Nodemon
- Sequelize
- SQLite3

## EndPoints

```
POST /user/login
POST  /user/add

GET  /employee/get-all
GET  /employee/get-summary-stats
GET /employee/get-summary-stats-dept
GET /employee/get-summary-stats-dept-sub
DEL /employee/delete
POST /employee/add
```

## Model example

**There are two models:**

User

```json
{
    "name":"User",
    "email":"user@email.com",
    "password": "Pass1234
}
```

Employee

```json
{
    "name":"Av. Diagonal 604",
    "salary": 20000,
    "currency": "USD",
    "department": "Engineering",
    "sub_department: "Product",
    "on_contract": <true || false>
}
```
