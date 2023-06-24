require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./src/db/config');
const bcrypt = require('bcrypt'); // Importar bcrypt

const app = express();
dbConnection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "You are connected to the project" });
});

app.use("/api/usuarios", require("./src/routes/usuarios.routes"));
app.use("/api/contactos", require("./src/routes/contactos.routes"));

app.listen(process.env.PORT, () => {
  console.log('App listening on PORT: ' + process.env.PORT);
  
  // Generar el salt y mostrarlo por consola
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Salt:', salt);
  });
});

module.exports = app;
