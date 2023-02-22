const { selectDataRecipes, getDataById, insertData, updateDataById, deleteDataById, searchDataRecipes } = require("../models/recipesModel");

const RecipesController = {
    // show all data recipes
    getRecipes: async (req, res, next) => {
        try {
            const showRecipes = await selectDataRecipes();
            if (!showRecipes) {
                res.status(404).json({status:400,message:`Error request data not found`})
            }
            res.status(200).json({status:200,message:`data found`,data:showRecipes.rows})
        } catch (error) {
            next(error)
        }
    },
    // show data recipes by id
    getRecipesById: async (req, res, next) => {
        try {
            const id = req.params.id
            const findRecipes = await getDataById("id",id);
            if (!findRecipes) {
                res.status(404).json({status:400,message:`Error request data not found`})
            }
            res.status(200).json({status:200,message:`data found`,data:findRecipes.rows})
        } catch (error) {
            next(error)
        }
    },
    //post data atau add data recipes
    inputRecipes: async (req,res,next)=>{
        try {
            const data = { title, photo, descriptions, users_id } = req.body;
            const addRecipes = await insertData(data);
            if (!addRecipes) {
                res.status(404).json({status:404,message:`Error request data not found`})
            }
            res.status(201).json({status: 200, message: `input data success`, data:data})
        } catch (error) {
            next(error)
        }
    },
    //update data user
    putRecipesById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const descriptions = req.body.descriptions;
            const updateData = await updateDataById(id, descriptions);
            if (!updateData) {
                res.status(404).json({status:404,message:`Error request data not found`})
            }
            res.status(200).json({status:200,message:`update data success`,data:descriptions})   
        } catch (error) {
            next(error)
        }
    },
    //remove data user
    removeRecipesById: async (req, res, next) => {
        try {
            const id = req.params.id
            const removeData = await deleteDataById(id);
            if (!removeData) {
                res.status(404).json({status:404,message:`Error request data not found`})
            }
            res.status(200).json({status:200,message:`delete data success`,data:`${id} deleted`})
        } catch (error) {
            next(error)
        }
    },
    getSearchRecipes: async (req,res,next) => {
        let { searchBy, search, sortBy, sort, limit } = req.query;
        let page = 1
        let data = {
            searchBy: searchBy || 'title',
            search: search || '',
            sortBy: sortBy || 'created_at',
            sort: sort || 'ASC',
            limit: limit || '', 
            page:page ||'',
        }
        let result = await searchDataRecipes(data);
        if(!result){
            res.status(404).json({ status: 404, message: `Error request data not found` });
        }
        res.status(200).json({ status: 200, message: `get data success `, data: result.rows });
    }
}

module.exports = RecipesController;