const {Router} = require('express');
const productosController = require('../controllers/productos.controller');
const jwtValidator = require('../middlewares/jwtValidator');
const checkFields = require('../middlewares/validateFields');
const { check } = require("express-validator");

const router = Router();

router.get('/',
[
    check('jwt').not().isEmpty(),
    checkFields
],
jwtValidator, productosController.getProducts); //GET PRODUCTOS
router.get('/:id',[
    check('jwt').not().isEmpty(),
    checkFields
],jwtValidator,productosController.getProductById); //GET PRODUCTOS BY ID

router.post('/',[
    check('jwt').not().isEmpty(),
    check('product.descripcion').not().isEmpty(),
    check('product.categoria').not().isEmpty(),
    check('product.precio_unitario').not().isEmpty(),
    check('product.url_img').not().isEmpty(),
    checkFields
],jwtValidator,productosController.createProduct); //POST PRODUCTOS

router.put('/:id',[
    check('jwt').not().isEmpty(),
    checkFields
],jwtValidator,productosController.updateProduct) //PUT PRODUCTOS

router.delete('/:id',[
    check('jwt').not().isEmpty(),
    checkFields
],jwtValidator,productosController.deleteProduct) //DELETE PRODUCTOS 

module.exports = router;