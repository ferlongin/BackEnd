const ContactosModel = require('../models/Contactos');
const bcrypt = require('bcrypt');

class ContactosService {

    async getContactos() {
        try {
            const contactos = await ContactosModel.find();
            return contactos;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getContactos Service");
        }
    }

    async getContactoById(id) {
        try {
            let contacto = await ContactosModel.findOne({ _id: id });
            return contacto;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getContactoById Service");
        }
    }

    async getContactoByEmail(email) {
        try {
            let contacto = await ContactosModel.findOne({ email });
            return contacto;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getContactoByEmail Service");
        }
    }

    async createContacto(contacto) {
        try {
            let isContactoRegistered = await ContactosModel.findOne({ email: contacto.email });
            if (isContactoRegistered) {
                throw new Error("Contacto already registered");
            } else {
                await ContactosModel.create(contacto);
                return contacto;
            }
        } catch (err) {
            console.error(err);
            throw new Error("Error in createContacto Service");
        }
    }

    async updateContacto(id, contactoData) {
        try {
            let updatedContacto = await ContactosModel.findByIdAndUpdate(id, contactoData, { new: true });
            if (!updatedContacto) {
                throw new Error("Contacto not found");
            }
            return updatedContacto;
        } catch (err) {
            console.error(err);
            throw new Error("Error in updateContacto Service");
        }
    }

    async deleteContacto(id) {
        try {
            let deletedContacto = await ContactosModel.findByIdAndRemove(id);
            if (!deletedContacto) {
                throw new Error("Contacto not found");
            }
            return deletedContacto;
        } catch (err) {
            console.error(err);
            throw new Error("Error in deleteContacto Service");
        }
    }
}

module.exports = new ContactosService();
