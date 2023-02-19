const {selectDataCategory, getDataById, insertData, updateDataById, deleteDataById} =require("../models/categoryModel");

const CategoryController = {
    // show all data category
    getCategory: async(req,res,next)=>{
        let showCategory = await selectDataCategory();
        try {
            res.status(200).json({status:200,message:`data found`,data:showCategory.rows})
        } catch (error) {
            res.status(400).json({status:400,message:`data user not found`})
        }
    },
    // show data category by id
    getCategoryById: async (req, res, next) => {
        let id = req.params.id
        let showCategory = await getDataById('id', id);
        try {
            res.status(200).json({status:200,message:`data found`,data:showCategory.rows})
        } catch (error) {
            res.status(400).json({status:400,message:`data user not found`})
        }
    },
    //post data atau add data category
    inputCategory: async (req, res, next) => {
        let data = { name } = req.body;
        await insertData(data);
        try {
            res.status(200).json({status:200,message:`input data success`, data:`name :${name}`})
        } catch (error) {
            res.status(404).json({status:404,message:`input data failed`})
        }
    },
    //update data category by id
    putCategoryById: async (req, res, next) => {
        let id = req.params.id
        let name = req.body.name
        await updateDataById(id, name)
        try {
            res.status(200).json({status:200,message:`update data success`,data:`name:${name}`})   
        } catch (error) {
            res.status(404).json({status:404,message:`data input not found`})
        }
    },
    //remove data category by id
    removeCategoryById: async (req, res, next) => {
        let id = req.params.id
        await deleteDataById(id);
        try {
            res.status(200).json({status:200,message:`delete data success`,data:`id:${id} category deleted`})
        } catch (error) {
            res.status(404).json({status:404,message:`delete data failed`})
        }
    }
}

module.exports=CategoryController;