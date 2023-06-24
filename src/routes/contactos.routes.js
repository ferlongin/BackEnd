const { Router } = require("express");
const contactosController = require("../controllers/contactos.controller");
const jwtValidator = require('../middlewares/jwtValidator');
const checkFields = require('../middlewares/validateFields');
const { check } = require("express-validator");

const router = Router();

router.get("/", 
[
  check('jwt').not().isEmpty(),
  checkFields
],
jwtValidator, contactosController.getContactos); // GET CONTACTOS


router.get('/:id',[
  check('jwt').not().isEmpty(),
  checkFields
],
jwtValidator, contactosController.getContactoById); //GET PRODUCTOS BY ID


router.post("/",
[
  check('jwt').not().isEmpty(),
  check("contact.fullname").not().isEmpty(),
  check("contact.email").not().isEmpty(),
  check("contact.telephone").not().isEmpty(),
  check("contact.message").not().isEmpty(),
  checkFields,
],
jwtValidator, contactosController.createContacto
); // POST CONTACTOS


router.put("/:id",
  [
    check('jwt').not().isEmpty(),
    checkFields
  ],
  jwtValidator, contactosController.updateContacto
); // PUT CONTACTO


router.delete('/:id',[
  check('jwt').not().isEmpty(),
  checkFields
  ],
  jwtValidator, contactosController.deleteContacto
); // DELETE CONTACTO

module.exports = router;