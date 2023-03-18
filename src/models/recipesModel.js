const pool = require("../config/db");

const getDataRecipes = () => {
    return pool.query(
        "SELECT * FROM recipes WHERE recipes.deleted_at IS NULL ORDER BY created_at DESC"
    );
};
const getRecipesById = (data) => {
    return pool.query(
        `SELECT * FROM recipes WHERE recipes.deleted_at IS NULL AND id=${data}`
    );
};
const getRecipesByIdRecipes = (data) => {
    return pool.query(
        `SELECT recipes.id,recipes.title,recipes.descriptions,recipes.created_at as posttime, category.name as category, recipes.photo, users.fullname as creator, users.email FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON recipes.users_id=users.id  WHERE recipes.deleted_at IS NULL AND recipes.id=${data}`
    );
};
const getRecipesByIdUsers = (data) => {
    return pool.query(
        `SELECT recipes.id,recipes.title,recipes.descriptions,recipes.created_at as posttime, category.name as category, recipes.photo, users.fullname as creator, users.email FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON recipes.users_id=users.id  WHERE recipes.deleted_at IS NULL AND users_id='${data}' ORDER BY id DESC`
    );
};
const getRecipesDeletedByIdUsers = (data) => {
    return pool.query(
        `SELECT recipes.id,recipes.title,recipes.descriptions,recipes.created_at as posttime, category.name as category, recipes.photo, users.fullname as creator, users.email FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON recipes.users_id=users.id  WHERE recipes.deleted_at IS NOT NULL AND users_id='${data}' ORDER BY id DESC`
    );
};
const insertData = (data) => {
    let { descriptions, title, photo, users_id, category_id } = data;
    let time = new Date().toISOString();
    return pool.query(
        `INSERT INTO recipes(title,descriptions,photo,users_id,created_at,category_id) VALUES('${title}','${descriptions}','${photo}','${users_id}','${time}','${category_id}')`
    );
};

const updateDataById = (id,data) => {
    let { descriptions, title, photo, users_id, category_id} = data;
    return pool.query(
        `UPDATE recipes SET descriptions='${descriptions}', title='${title}', photo='${photo}', category_id=${category_id}, users_id='${users_id}' WHERE id=${id};`
    );
};

const deleteDataById = (id) => {
    let time = new Date().toISOString();
    return pool.query(`UPDATE recipes SET deleted_at='${time}' WHERE id='${id}'`);
};


const searchDataRecipes = (data) => {
    let { searchBy, search, sortBy, sort, limit, page } = data;
    return pool.query(
        `SELECT recipes.id,recipes.title,recipes.descriptions,recipes.created_at as posttime, recipes.deleted_at, category.name as category, recipes.photo, users.fullname as creator, users.email FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON recipes.users_id=users.id WHERE recipes.deleted_at IS NULL AND recipes.${searchBy} ILIKE '${search}%' ORDER BY recipes.${sortBy} ${sort} LIMIT ${limit} OFFSET ${page} ROWS `
    );
};

const getData = () => {
    return pool.query(
        "SELECT recipes.title,recipes.descriptions,recipes.created_at as posttime, category.name as category, recipes.photo, users.fullname as creator, users.email FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON recipes.users_id=users.id  WHERE recipes.deleted_at IS NULL"
    );
};

const findUser = (email) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT * FROM users WHERE id='${email}'`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

module.exports = {
    getDataRecipes,
    getRecipesById,
    getRecipesByIdRecipes,
    getRecipesDeletedByIdUsers,
    insertData,
    updateDataById,
    deleteDataById,
    searchDataRecipes,
    getData,
    findUser,
    getRecipesByIdUsers,
};
