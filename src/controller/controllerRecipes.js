const { selectDataRecipes,getData, getDataById, insertData, updateDataById, deleteDataById, searchDataRecipes } = require("../models/recipesModel");
const cloudinary = require("../config/photo")
const RecipesController = {
    // show all data recipes
    getRecipes: async (req, res, next) => {
        let {searchBy,search,sortBy,sort} = req.query
        let data = {
            searchBy: searchBy || 'title',
            search: search || '',
            sortBy: sortBy || 'created_at',
            sort: sort || 'ASC'
        }

        let result = await getData(data)
        if(!result){
            res.status(404).json({status:404,message:`get data failed`})
        }

        res.status(200).json({status:200,message:`get data success `,data:result.rows})
    },
    // show data recipes by id
    getRecipesById: async (req, res, next) => {
        let {searchBy,search,sortBy,sort} = req.query
        let data = {
            searchBy: searchBy || 'title',
            search: search || '',
            sortBy: sortBy || 'created_at',
            sort: sort || 'ASC',
            id: req.payload.id
        }

        let result = await getDataById(data)

        if(!result){
            res.status(404).json({status:404,message:`get data failed`})
        }

        res.status(200).json({status:200,message:`get data success `,data:result.rows})
    },
    //post data atau add data recipes
    inputRecipes: async (req, res, next) => {
        try {
            const imageUrl = await cloudinary.uploader.upload(req.file.path, { folder: "food" });
            console.log('imageUrl', imageUrl)
            
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
                return res.status(404).json({ status: 404, message: `Error input data recipes failed` })
            }
            return res.status(201).json({ status: 200, message: `input data success`, data:data})
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