# clipboard
Clipboard PE_Staff Take Home Assignment

# Docker Node.js with SQLite Server

## Motivation

In this problem we’ll create a micro-service to address some functionality which is useful to
derive simplified summary statistics (mean, min, max) on a dataset.

## Available Scripts

To run project with Docker:

### `docker-compose up`

To run tests:

### `npm run test`

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

###**Login**

```
Type: POST
Endpoint: /user/login

Arguments:
email: <String>
password: <String>

Response:
{
    token: <String>
}
```

**All endpoints expect the access token in header of request**

```
{Authorization: `<token>`}
```

###**GET all employees**

```
Type: GET
Endpoint: /employee/get-all

Response:
{
    [
        {
        "name": "Abhishek",
        "salary": "145000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform"
        },
        {...},
        {...},
        ...
    ]
}
```

###**GET Summary Stats**

```
Type: GET
Endpoint: /employee/get-summary-stats
QueryParams: on_contract=<true || false>

Response:
{
  maximum: <Number>,
  minimum: <Number>,
  average: <Number>
}
```

###**GET Summary Stats by Department**

```
Type: GET
Endpoint: /employee/get-summary-stats-dept

Response:
[
    {
      Dept: <String>,
      maximum: <Number>,
      minimum: <Number>,
      average: <Number>
    },
    {...},
    {...},
    ...
]
```

###**GET Summary Stats by Department & Sub Department**

```
Type: GET
Endpoint: /employee/get-summary-stats-dept-sub

Response:
[
    {
      Dept: <String>,
      SubDept: <String>,
      maximum: <Number>,
      minimum: <Number>,
      average: <Number>
    },
    {...},
    {...},
    ...
]
```

###**GET Employee Record**

```
Type: DELETE
Endpoint: /employee/delete
Body: {id: <Number>}

Response:
[
    {
        "name": "Abhishek",
        "salary": "145000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform"
        },
        {...},
        {...},
        ...
]
```

###**Add Employee Record**

```
Type: POST
Endpoint: /employee/add
Body: {
    name: <String | Required>,
    salary: <Number | Required>,
    currency: <String | Required>,
    department: <String | Required>,
    sub_department: <String | Required>,
    on_contract: <true || false>
}

Response:
[
    {
        "name": "Abhishek",
        "salary": "145000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform"
        },
        {...},
        {...},
        ...
]
```

## Models

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
