let instance = null;
require('dotenv').config();
const jwt = require("jsonwebtoken");
const UsuariosService = require("../services/usuarios.service");
const AuthService = require('../services/auth.service');

class UsuariosController {

  static getInstance() {
    if (!instance) {
      return new UsuariosController();
    }
    return instance;
  }

  async getUsuarios(req, res) {
    try {
      const users = await UsuariosService.getUsers();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getUsers",
        message: err,
      });
    }
  }

  async getUsuarioById(req, res) {
    try {
      const id = req.params.id;
      let user = await UsuariosService.getUserById(id);
      if (!user) {
        return res.status(404).json({
          method: "getUsuarioById",
          message: "Not Found",
        });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getUsuarioById",
        message: err,
      });
    }
  }

  async createUsuario(req, res) {
    try {
      let newUser = await UsuariosService.createUser(req.body);

      return res.status(201).json({
        message: "Created!",
        usuario: newUser,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createUsuario",
        message: err.message,
      });
    }
  }
  

  async login(req, res) {
    try {
      const { email, password } = req.body;
      let isUserRegistered = await AuthService.hasValidCredentials(email, password);
      if (isUserRegistered) {

        const user = await UsuariosService.getUserByEmail(email);

        const token = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY, {
          expiresIn: "1d",
        });

        return res.status(200).json({
          status: 200,
          token,
          message: "Token created successfully."
        });

      } else {
        return res.status(401).json({
          message: "Unauthorized.",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "login",
        message: err.message,
      });
    }
  }

  async updateUsuario(req, res) {
    try {
      let user = await UsuariosService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ method: "updateUsuario", message: "Not Found" });
      }
  
      const updatedUser = await UsuariosService.updateUsuario(
        req.params.id,
        req.body,
        user
      );
  
      return res.status(200).json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "updateUsuario",
        message: err.message,
      });
    }
  }

  async deleteUsuario(req, res) {
    try {
      let isUser = await UsuariosService.getUserById(req.params.id);
      if (isUser) {
        await UsuariosService.deleteUsuario(req.params.id);
        return res.status(204).json({ message: "No Content" });
      }
      return res.status(404).json({ message: "Not Found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteUsuario",
        message: err,
      });
    }
  }
  
}

module.exports = UsuariosController.getInstance();


// async updateUsuario(req, res) {
//   try {
//     const { email, name, lastname, password } = req.body;
//     let updatedUser = await UsuariosService.updateUser(email, { name, lastname, password });

//     return res.status(200).json({
//       message: "Updated!",
//       usuario: updatedUser,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       method: "updateUsuario",
//       message: err.message,
//     });
//   }
// }

// async deleteUsuario(req, res) {
//   try {
//     const { email } = req.body;
//     let deletedUser = await UsuariosService.deleteUser(email);

//     return res.status(200).json({
//       message: "Deleted!",
//       usuario: deletedUser,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       method: "deleteUsuario",
//       message: err.message,
//     });
//   }
// }
