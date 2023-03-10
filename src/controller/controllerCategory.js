const {selectDataCategory, getDataById, insertData, updateDataById, deleteDataById} =require("../models/categoryModel");

const CategoryController = {
    // show all data category
    getCategory: async(req,res,next)=>{
        try {
            const showCategory = await selectDataCategory();
            if (!showCategory) {
                res.status(404).json({status:400,message:"Error request data not found"});
            }
            res.status(200).json({status:200,message:"data found",data:showCategory.rows});
        } catch (error) {
            next(error);
        }
    },
    // show data category by id
    getCategoryById: async (req, res, next) => {
        try {
            const category = await getDataById(req.params.id);
            const categoryRows = category.rows[0];
            
            if (req.params.id !== categoryRows.id) {
                res.status(404).json({status:404,message:"Error id not found"});
            } 
            const data = req.params.id;
            
            const findCategory = await getDataById("id",data);
            if (!findCategory) {
                res.status(404).json({status:400,message:"Error request data not found"});
            }
            res.status(200).json({status:200,message:"data found",data:findCategory.rows});
        } catch (error) {
            next(error);
        }
    },
    //post data atau add data category
    inputCategory: async (req, res, next) => {
        try {
            const data = {};
            data.name = req.body.name;
            const addData = await insertData(data);
            if (!addData) {
                res.status(404).json({status:404,message:"Error request data not found"});
            }
            res.status(201).json({status:200,message:"input data success", data:`name :${name}`});
        } catch (error) {
            next(error);
        }
    },
    //update data category by id
    putCategoryById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const name = req.body.name;
            const updateData = await updateDataById(id, name);
            if (!updateData) {
                res.status(404).json({status:404,message:"Error request data not found"});
            }
            res.status(200).json({status:200,message:"update data success",data:`name:${name}`});   
        } catch (error) {
            next(error);
        }
    },
    //remove data category by id
    removeCategoryById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const removeData= await deleteDataById(id);
            if (!removeData) {
                res.status(404).json({status:404,message:"Error request data not found"});
            }
            res.status(200).json({status:200,message:"delete data success",data:`id:${id} category deleted`});
        } catch (error) {
            next(error);
        }
    }
};

module.exports=CategoryController;