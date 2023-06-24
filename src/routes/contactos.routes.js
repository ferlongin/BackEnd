const { Router } = require("express");
const { check } = require("express-validator");
const contactosController = require("../controllers/contactos.controller");
const checkFields = require("../middlewares/validateFields");

const router = Router();

router.get("/", contactosController.getContactos); // GET CONTACTOS

router.post(
  "/",
  [
    check("fullname").not().isEmpty(),
    check("email").not().isEmpty(),
    check("telephone").not().isEmpty(),
    check("message").not().isEmpty(),
    checkFields,
  ],
  contactosController.createContacto
); // POST CONTACTOS

module.exports = router;

// const { Router } = require("express");
// const { check } = require("express-validator");
// const contactosController = require("../controllers/contactos.controller");
// const checkFields = require("../middlewares/validateFields");

// const router = Router();

// router.get("/", contactosController.getcontactos); //GET CONTACTOS
// router.post(
//   "/",
//   [
//     check("fullname").not().isEmpty(),
//     check("email").not().isEmpty(),
//     check("telephone").not().isEmpty(),
//     check("message").not().isEmpty(),
//     checkFields,
//   ],
//   contactosController.createContacto
// ); //POST CONTACTOS

// router.get("/:id", contactosController.getContactoById); //GET CONTACTOS BY ID
// router.post(
//   "/submit", // THIS SHOULD BE THE BUTTON IN WHICH WE SEND THE REQUEST TO CONTACT THE USER
//   [
//     check("fullname").not().isEmpty(),
//     check("email").not().isEmpty(),
//     check("telephone").not().isEmpty(),
//     check("message").not().isEmpty(),
//     checkFields,
//   ],
//   contactosController.submit
// );

// module.exports = router;
