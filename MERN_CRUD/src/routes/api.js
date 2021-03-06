const express=require('express')
const ProductController=require('./../controllers/ProductController')

const router=express.Router()


//C=CREATE
router.post("/CreateData",ProductController.CreateProduct)


//R=READ
router.get('/ReadData',ProductController.ReadProduct)

//R=READ BY ID
router.get('/ReadDataById/:id',ProductController.ReadProductById)

//U=UPDATE
router.post('/UpdateData/:id',ProductController.UpdateProduct)


//D=DELETE
router.get('/DeleteData/:id',ProductController.DeleteProduct)


module.exports=router;