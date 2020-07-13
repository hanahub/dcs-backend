# DCS API


## Server

npm install

npm start


## SQLite DB migration

node server/db/migration.js


## Test

- POST Metric

Request
POST http://localhost:4040/metric/{key}
{
  value: 10
}

Response (200)
{}

- GET Metric sum

Request
GET http://localhost:4040/metric/{key}/sum

Response (200)
{
  value: 400
}
