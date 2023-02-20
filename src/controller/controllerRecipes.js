const { selectDataRecipes, getDataById, insertData, updateDataById, deleteDataById, searchDataRecipes } = require("../models/recipesModel");

const RecipesController = {
    // show all data recipes
    getRecipes: async (req, res, next) => {
        try{
            let showRecipes = await selectDataRecipes();
            res.status(200).json({status:200,message:`data found`,data:showRecipes.rows})
        }catch(error){
            res.status(404).json({status:400,message:`Error data not found`})
        }
    },
    // show data recipes by id
    getRecipesById: async (req, res, next) => {
        try{
            let id = req.params.id
            let showRecipes = await getDataById('id', id);
            res.status(200).json({status:200,message:`data found`,data:showRecipes.rows})
        }catch(error){
            res.status(404).json({status:400,message:`Error data not found`})
        }
    },
    //post data atau add data recipes
    inputRecipes: async (req,res,next)=>{
        try{
            let data = { title, photo, descriptions, users_id } = req.body;
            await insertData(data);
            res.status(201).json({status: 200, message: `input data success`, data:data})
        }catch(error){
            res.status(404).json({status:404,message:`Error data not found`})
        }
    },
    //update data user
    putRecipesById: async (req, res, next) => {
        try{
            let id = req.params.id;
            let descriptions = req.body.descriptions;
            await updateDataById(id, descriptions);
            res.status(200).json({status:200,message:`update data success`,data:descriptions})   
        }catch(error){
            res.status(404).json({status:404,message:`Error data not found`})
        }
    },
    //remove data user
    removeRecipesById: async (req, res, next) => {
        try{
            let id = req.params.id
            await deleteDataById(id);
            res.status(200).json({status:200,message:`delete data success`,data:`${id} deleted`})
        }catch(error){
            res.status(404).json({status:404,message:`Error data not found`})
        }
    },
    getSearchRecipes: async (req,res,next) => {
        let { searchBy, search, sortBy, sort, limit } = req.query;
        let data = {
            searchBy: searchBy || 'title',
            search: search || '',
            sortBy: sortBy || 'created_at',
            sort: sort || 'ASC',
            limit: limit || 10
        }
        let result = await searchDataRecipes(data);
        if(!result){
            res.status(404).json({status:404,message:`Error data not found`})
        }
        res.status(200).json({status:200,message:`get data success `,data:result.rows})
    }
}

module.exports = RecipesController;