const { Client } = require("pg");
const db = process.env.NODE_ENV === "test" ? "students-test" : "students";
//const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`


client = new Client({
  connectionString: `postgresql://localhost/${db}`
});

client.connect();   

module.exports = client;