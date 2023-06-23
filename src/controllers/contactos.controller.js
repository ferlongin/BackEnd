const ContactosService = require("../services/contactos.service");
const AuthService = require('../services/auth.service');
const jwt = require("jsonwebtoken");

class ContactosController {
  static getInstance() {
    if (!instance) {
      return new ContactosController();
    }
    return instance;
  }

  async getContactos(req, res) {
    try {
      const contactos = await ContactosService.getContactos();
      return res.status(200).json(contactos);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getContactos",
        message: err,
      });
    }
  }

  async getContactoById(req, res) {
    try {
      const id = req.params.id;
      let contacto = await ContactosService.getContactoById(id);
      if (!contacto) {
        return res.status(404).json({
          method: "getContactoById",
          message: "Not Found",
        });
      }
      return res.status(200).json(contacto);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getContactoById",
        message: err,
      });
    }
  }

  async createContacto(req, res) {
    try {
      const { fullname, email, telephone, message } = req.body;

      // Validar los campos si es necesario

      const newContacto = await ContactosService.createContacto({
        fullname,
        email,
        telephone,
        message,
      });

      return res.status(201).json({
        message: "Created!",
        contacto: newContacto,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createContacto",
        message: err.message,
      });
    }
  }

  async submit(req, res) {
    try {
      const { fullname, email, telephone, message } = req.body;

      if (email != null) {
        const contacto = await ContactosService.getContactoByEmail(email);

        const token = jwt.sign(contacto.toJSON(), process.env.PRIVATE_KEY, {
          expiresIn: "1d",
        });

        return res.status(200).json({
          status: 200,
          token,
          message: "Token created successfully.",
        });
      } else {
        return res.status(401).json({
          message: "Unauthorized.",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "submit",
        message: err.message,
      });
    }
  }
}

module.exports = ContactosController.getInstance();
