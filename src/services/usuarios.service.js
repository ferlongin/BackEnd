const UsuariosModel = require('../models/Usuarios');
const bcrypt = require('bcrypt');

class UsuariosService {
    async getUsers() {
        try {
            const users = await UsuariosModel.find();
            return users;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getUsers Service");
        }
    }

    async getUserById(id) {
        try {
            let user = await UsuariosModel.findOne({ _id: id });
            return user;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getUserById Service");
        }
    }

    async getUserByEmail(email) {
        try {
            let user = await UsuariosModel.findOne({ email });
            return user;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getUserByEmail Service");
        }
    }

    async createUser(user) {
        try {
            let isUserRegistered = await UsuariosModel.findOne({ email: user.email });
            if (isUserRegistered) {
                throw new Error("User already registered");
            } else {
                user.password = bcrypt.hashSync(user.password, process.env.SALT);
                await UsuariosModel.create(user);
                return user;
            }
        } catch (err) {
            console.error(err);
            throw new Error("Error in createUser Service");
        }
    }

    async updateUsuario(id, fields, user) {
        try {
          fields.name ? user.name = fields.name : false;
          fields.lastname ? user.lastname = fields.lastname : false;
          fields.email ? user.email = fields.email : false;
          fields.password ? user.password = fields.password : false;
      
          await UsuariosModel.findOneAndUpdate({ _id: id }, user);
          return user;
        } catch (err) {
          console.error(err);
          throw new Error("Error in updateUsuario Service");
        }
    }
    
    async deleteUsuario(id) {
        try {
          await UsuariosModel.findOneAndDelete({_id:id});
        } catch (err) {
          console.error(err);
          throw new Error("Error in delete Service");
        }
    }
      
   
      
}

module.exports = new UsuariosService();



// async updateUser(id, userData) {
//     try {
//         let updatedUser = await UsuariosModel.findOneAndUpdate({ email: user.email });
//         if (!updatedUser) {
//             throw new Error("User not found");
//         }
//         return updatedUser;
//     } catch (err) {
//         console.error(err);
//         throw new Error("Error in updateUser Service");
//     }
// }

// async updateUser(email, userData) {
//     try {
//       let updatedUser = await UsuariosModel.findOneAndUpdate(
//         { email },
//         userData,
//         { new: true }
//       );
//       if (!updatedUser) {
//         throw new Error("User not found");
//       }
//       return updatedUser;
//     } catch (err) {
//       console.error(err);
//       throw new Error("Error in updateUser Service");
//     }
//   }
  

// async deleteUser(email) {
//     try {
//       let deletedUser = await UsuariosModel.findOneAndDelete({ email });
//       if (!deletedUser) {
//         throw new Error("User not found");
//       }
//       return deletedUser;
//     } catch (err) {
//       console.error(err);
//       throw new Error("Error in deleteUser Service");
//     }
//   }