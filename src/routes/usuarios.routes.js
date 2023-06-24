const { Router } = require("express");
const { check } = require("express-validator");
const usuariosController = require("../controllers/usuarios.controller");
const checkFields = require("../middlewares/validateFields");
const cors = require('cors');


const router = Router();

router.get("/", usuariosController.getUsuarios); //GET USUARIOS

router.get("/:id", usuariosController.getUsuarioById); //GET USUARIOS BY ID

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("lastname").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  usuariosController.createUsuario
); //POST USUARIOS

router.post(
  "/login",
  cors(),
  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  usuariosController.login
); // POST LOGIN

router.put(
  "/:id",
  [
    checkFields,
  ],
  usuariosController.updateUsuario
); // PUT USUARIOS

router.delete(
  "/:id",
  [
    checkFields,
  ],
  usuariosController.deleteUsuario
); // DELETE USUARIOS

module.exports = router;
