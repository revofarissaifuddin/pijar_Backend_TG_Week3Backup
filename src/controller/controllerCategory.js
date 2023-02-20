const {selectDataCategory, getDataById, insertData, updateDataById, deleteDataById} =require("../models/categoryModel");

const CategoryController = {
    // show all data category
    getCategory: async(req,res,next)=>{
        try {
            let showCategory = await selectDataCategory();
            res.status(200).json({status:200,message:`data found`,data:showCategory.rows})
        } catch (error) {
            res.status(404).json({status:400,message:`Error data not found`})
        }
    },
    // show data category by id
    getCategoryById: async (req, res, next) => {
        try {
            let id = req.params.id
            let showCategory = await getDataById('id', id);
            res.status(200).json({status:200,message:`data found`,data:showCategory.rows})
        } catch (error) {
            res.status(404).json({status:400,message:`Error data not found`})
        }
    },
    //post data atau add data category
    inputCategory: async (req, res, next) => {
        try {
            let data = { name } = req.body;
            await insertData(data);
            res.status(201).json({status:200,message:`input data success`, data:`name :${name}`})
        } catch (error) {
            res.status(404).json({status:404,message:`Error data not found`})
        }
    },
    //update data category by id
    putCategoryById: async (req, res, next) => {
        try {
            let id = req.params.id
            let name = req.body.name
            await updateDataById(id, name)
            res.status(200).json({status:200,message:`update data success`,data:`name:${name}`})   
        } catch (error) {
            res.status(404).json({status:404,message:`Error data not found`})
        }
    },
    //remove data category by id
    removeCategoryById: async (req, res, next) => {
        try {
            let id = req.params.id
            let showData= await deleteDataById(id);
            res.status(200).json({status:200,message:`delete data success`,data:`id:${id} category deleted`})
        } catch (error) {
            res.status(404).json({status:404,message:`Error data not found`})
        }
    }
}

module.exports=CategoryController;