let instance = null;
require('dotenv').config();
const jwt = require("jsonwebtoken");
const ContactosService = require("../services/contactos.service");
const AuthService = require('../services/auth.service');

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
      const { contact } = req.body;
      let isRegistered = await ContactosService.isContactRegistered(contact.email);
      if (!isRegistered) {
        let newContacto = await ContactosService.createContacto(contact);
  
        return res.status(201).json({
          message: "Created!",
          contacto: newContacto,
        });
      }
      return res.status(400).json({
        message: "The contact is already registered",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createContacto",
        message: err.message,
      });
    }
  }
  
  
  async updateContacto(req, res) {
    try {
      let contact = await ContactosService.getContactoById(req.params.id);
      if (!contact) {
        return res.status(404).json({
          method: "updateContacto",
          message: "Not Found",
        });
      }
      const modifiedContacto = await ContactosService.updateContacto(
        req.params.id,
        req.body,
        contact
      );
      return res.status(200).json(modifiedContacto);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "updateContacto",
        message: err,
      });
    }
  }

  async deleteContacto(req, res) {
    try {
      let isContact = await ContactosService.getContactoById(req.params.id);
      if (isContact) {
        await ContactosService.deleteContacto(req.params.id);
        return res.status(204).json({ message: "No Content" });
      }
      return res.status(404).json({ message: "Not Found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteContacto",
        message: err,
      });
    }    
  }
  
  

  // async createContacto(req, res) {
  //   try {
  //     let newContacto = await ContactosService.createContacto(req.body);

  //     return res.status(201).json({
  //       message: "Created!",
  //       contacto: newContacto,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({
  //       method: "createContacto",
  //       message: err.message,
  //     });
  //   }
  // }

  // async updateContacto(req, res) {
  //   try {
  //     const { email, fullname, telephone, message } = req.body;
  //     let updatedContacto = await ContactosService.updateContacto(email, {
  //       fullname,
  //       telephone,
  //       message,
  //     });
  
  //     return res.status(200).json({
  //       message: "Updated!",
  //       contacto: updatedContacto,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({
  //       method: "updateContacto",
  //       message: err.message,
  //     });
  //   }
  // }
  
  // async deleteContacto(req, res) {
  //   try {
  //     const { email } = req.body;
  //     let deletedContacto = await ContactosService.deleteContacto(email);
  
  //     return res.status(200).json({
  //       message: "Deleted!",
  //       contacto: deletedContacto,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({
  //       method: "deleteContacto",
  //       message: err.message,
  //     });
  //   }
  // }
  
}

module.exports = ContactosController.getInstance();