const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactosSchema = new Schema({
    fullname:String,
    email:String,
    telephone:String,
    message:String
});

const Contactos = mongoose.model('Contactos',ContactosSchema);

module.exports = Contactos;