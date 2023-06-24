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
            let contacto = await ContactosModel.findOne({ email }); //ContactosModel.find({ email: mail });
            return contacto;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getContactoByEmail Service");
        }
    }

    async isContactRegistered(email) {
      try {
        const contact = await ContactosModel.exists({ email });
        if (contact) {
          return true;
        }
        return false;
      } catch (err) {
        console.error(err);
        throw new Error("Error in isContactRegistered Service");
      }
    }

    async createContacto(contacto) {
      try {
        let savedContacto = await ContactosModel.create(contacto);
        return savedContacto;
      } catch (err) {
        console.error(err);
        throw new Error("Error in createContacto Service", err);
      }
    }
    
    async updateProduct(id, fields, product) {
      try {
        fields.descripcion ? product.descripcion = fields.descripcion : false;
        fields.categoria ? product.categoria = fields.categoria : false;
        fields.precio_unitario ? product.precio_unitario = fields.precio_unitario : false;
        fields.url_img ? product.url_img = fields.url_img : false;
  
        await ProductosModel.findOneAndUpdate({_id:id}, product);
        return product;
      } catch (err) {
        console.error(err);
        throw new Error("Error in updateProduct Service");
      }
    }

    async deleteContacto(id) {
      try {
        await ContactosModel.findOneAndDelete({ _id: id });
      } catch (err) {
        console.error(err);
        throw new Error("Error in deleteContacto Service");
      }
    }    
    
    // async createContacto(contacto) {
    //     try {
    //         let isContactoRegistered = await ContactosModel.findOne({ email: contacto.email });
    //         if (isContactoRegistered) {
    //             throw new Error("Contacto already registered");
    //         } else {
    //             await ContactosModel.create(contacto);
    //             return contacto;
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         throw new Error("Error in createContacto Service");
    //     }
    // }

    // async deleteContacto(email) {
    //     try {
    //       let deletedContacto = await ContactosModel.findOneAndDelete({ email });
    //       if (!deletedContacto) {
    //         throw new Error("Contacto not found");
    //       }
    //       return deletedContacto;
    //     } catch (err) {
    //       console.error(err);
    //       throw new Error("Error in deleteContacto Service");
    //     }
    //   }
      
    //   async updateContacto(email, contactoData) {
    //     try {
    //       let updatedContacto = await ContactosModel.findOneAndUpdate(
    //         { email },
    //         contactoData,
    //         { new: true }
    //       );
    //       if (!updatedContacto) {
    //         throw new Error("Contacto not found");
    //       }
    //       return updatedContacto;
    //     } catch (err) {
    //       console.error(err);
    //       throw new Error("Error in updateContacto Service");
    //     }
    //   }
      
}

module.exports = new ContactosService();