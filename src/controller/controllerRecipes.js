const { getDataRecipes,getRecipesById, getRecipesByIdUsers, insertData, updateDataById, deleteDataById, searchDataRecipes, getData } = require("../models/recipesModel");
const cloudinary = require("../config/photo")
const path = require("path")
const RecipesController = {

    // show all data recipes
    getRecipes: async (req, res, next) => {
        try {
            const result = await getDataRecipes();
            if(!result){
                res.status(404).json({status:404,message:`get data failed`})
            }
            res.status(200).json({status:200,message:`get data success `,data:result.rows})
        } catch (error) {
            res.status(404).json({status:404,message:`Error request get all data failed`})
            next(error)
        }
    },
    // show data recipes by id
    getRecipesById: async (req, res, next) => {
        try {
            const data = req.payload.id;
            const result = await getRecipesByIdUsers(data);
            if (!result) {
                res.status(404).json({status:404,message:`get data failed`})
            }
            res.status(200).json({status:200,message:`get data success `,data:result.rows})    
        } catch (error) {
            res.status(404).json({status:404,message:`Error request get data not found`})
            next(error)
        }
    },
    
    //post data atau add data recipes
    inputRecipes: async (req, res, next) => {
        try {
            const imageUrl = await cloudinary.uploader.upload(req.file.path, { folder: "food" });
            // console.log('imageUrl', imageUrl)
            if (!imageUrl) {
                res.status(404).json({status:404,message:`input data failed, failed to upload photo`})
            }

            const data = {};
            data.title = req.body.title;
            data.photo = imageUrl.secure_url
            data.users_id = req.payload.id;
            data.descriptions = req.body.descriptions;
            data.category_id = req.body.category_id;
    
            const result = await insertData(data);
            if (!result) {
                return res.status(404).json({ status: 404, message: `Error input data failed` })
            }
            return res.status(201).json({ status: 200, message: `input data success`, data:data})
        } catch (error) {
            res.status(404).json({ status: 404, message: `Error request input data recipes failed`})
            next(error)
        }
    },
    //update data user
    putRecipesById: async (req, res, next) => {
        try {
            const recipes = await getRecipesById(req.params.id);
            const recipesRows = recipes.rows[0]
            const imageUrl = await cloudinary.uploader.upload(req.file.path, { folder: "food" });

            if (!imageUrl) {
                res.status(404).json({ status: 404, message: `input data failed, failed to upload photo` });
            }
            
            let id = req.params.id
            const data = {};
            data.title = req.body.title;
            data.descriptions = req.body.descriptions;
            data.photo = imageUrl.secure_url;
            data.users_id = req.payload.id;
            data.category_id = req.body.category_id;

            if (req.payload.id !== recipesRows.users_id) {
                res.status(404).json({status:404,message:`Error recipes not yours`})
            } 

            const updateRecipes = await updateDataById(id, data);
            if (!updateRecipes) {
                res.status(404).json({status:404,message:`Error request data not found`})
            }
            res.status(200).json({status:200,message:`update data success`})   
        } catch (error) {
            res.status(404).json({status:404,message:`Error request id data not found`})
            next(error)
        }
    },
    
    
    //remove data recipes
    removeRecipesById: async (req, res, next) => {
        try {
            const recipes = await getRecipesById(req.params.id);
            const recipesRows = recipes.rows[0];
            
            if (req.payload.id !== recipesRows.users_id) {
                return res.status(404).json({status:404,message:`Error recipes not yours`})
            }

            const id = req.params.id
            const removeData = await deleteDataById(id);
            if (!removeData.rows[0]) {
                return res.status(200).json({status:200,message:`delete data success`,data:`deleted`})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Error request data not found`})
            next(error)
        }
    },

    getSearchRecipes: async (req, res, next) => {
        try {
            const { searchBy, search, sortBy, sort, limit, page } = req.query;
            const data = {
                searchBy: searchBy || 'title',
                search: search || '',
                sortBy: sortBy || 'created_at',
                sort: sort || 'ASC',
                limit: limit || 10,
                page: page || 0,
            }
    
            const result = await searchDataRecipes(data);
            if(!result){
                res.status(404).json({ status: 404, message: `Error data not found` });
            }
            res.status(200).json({ status: 200, message: `get data success `, data: result.rows });    
        } catch (error) {
            res.status(404).json({ status: 404, message: `Error request data not found` });
            next(error);
        }
    }
}

module.exports = RecipesController;