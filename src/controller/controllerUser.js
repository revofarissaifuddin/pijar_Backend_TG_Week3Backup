const { selectDataUsers, selectDataById, insertData, updateDataById, deleteDataById } = require("../models/usersModel");

const UsersController = {
    // show all data user
    getUsers: async (req, res, next) => {
        try { 
            let showUsers = await selectDataUsers();
            res.status(200).json({status:200,message:`data found`,data:showUsers.rows})
        } catch (error) {
            res.status(400).json({status:400,message:`data user not found`})
        }
    },
    // show data user by id
    findUserByID: async (req, res, next) => {
        let id = req.params.id
        let showUsers = await selectDataById("id", id);
        try {
            if (!showUsers) {
                throw error.errorHandler(id);
            } else {
                res.status(200).json({status:200,message:`data found`,data:showUsers.rows})
            }
        } catch (error) {
            res.status(400).json({ status: 400, message: `data user not found` })    
        }
    },
    //post data atau add data users
    createUsers: async (req, res, next) => {
        let data = { name, email, phone, password, retypepassword } = req.body;
        await insertData(data);
        try {
            res.status(200).json({status:200,message:`input data success`,data:data})    
        } catch (error) {
            res.status(404).json({ status: 404, message: `input data failed`});
        }
    },
    //update data user
    updateUsers: async (req, res, next) => {
        let id = req.params.id
        let name = req.body.name
        await updateDataById(id, name);
        try {
            res.status(200).json({status:200,message:`update data success`,data:name})
        } catch (error) {
            res.status(404).json({status:404,message:`data input not found`})
        }
    },
    //remove data user
    removeDataById: async (req, res, next) => {
        let id = req.params.id
        await deleteDataById(id);
        try{
            res.status(200).json({status:200,message:`delete data success`,data:`id users: ${id} deleted`})
        }catch(error){
            res.status(404).json({status:404,message:`delete data failed`})
        }
    }
};

module.exports = UsersController;
/* ===========================Old code User Controller============================== */
/* const pool = require('../config/db');
const queries = require("../models/usersModel");


// show all data user
const getUsers = (req, res, next) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw res.status(400).json({status:400,message:`data user not found`});
        // res.status(200).json(results.rows);
        res.status(200).json({status:200,message:`data all users`,data:results.rows})
    });
};

// show data user by id
const getUsersById = (req, res,next) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUsersById, [id], (error, results) => {
        
        if (error) throw res.status(400).json({status:400,message:`id user not found`});
        res.status(200).json({status:200,message:`id user found`,data:results.rows})
    });
};

//post data atau add data
const createUser = (req, res, next) => {
    const { name, email, phone, password, retypepassword } = req.body;
    pool.query(queries.addUsers, [name, email, phone, password, retypepassword], (error, results) => {
        if (error) {
            throw res.status(400).json({status:400,message:`User not create`});
        }
        // res.status(201).send(`User added with ID: ${results.rows[0].id}`)
        res.status(200).json({status:200,message:`User added`,data:results.rows})

    })
}

//remove data user
const removeUsers = (req, res, next) => {
    const id = parseInt(req.params.id);
    pool.query(queries.removeUsers, [id], (error, results) => {
        const UserFound = !results.rows.length;
        if (UserFound) {
            res.status(200).json({ status: 200, message: `User removed success` });
        }
    })
}

//update data user
const updateUsers = (req, res, next) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    
    pool.query(queries.getUsersById, [id], (error, results) => {
        const noUsersFound = !results.rows.length;
        if (noUsersFound) {
            // res.send("Users does not exist in database");
            res.status(400).json({ status: 400, message: `Users does not exist in database` });
        }
        pool.query(queries.updateUsers, [name, id], (error, results) => {
            if (error) throw error;
            // res.status(200).send("Users update success");
            res.status(200).json({ status: 200, message: `Users update success`});

        })
    })
} 

module.exports = {
    getUsers,
    getUsersById,
    createUser,
    removeUsers,
    updateUsers,
} */