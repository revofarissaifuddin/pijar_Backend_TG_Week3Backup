const pool = require('../config/db');

const selectDataUsers =()=>{
    return pool.query(`SELECT * FROM users ORDER BY id DESC`);
}

const selectDataById = (by, data) => {
    return pool.query(`SELECT * FROM users WHERE ${by} = ${data}`);
}

const insertData = (data) => {
    let { name, email, phone, password, retypepassword } = data;
    return pool.query(`INSERT INTO users (name, email, phone, password, retypepassword) VALUES ('${name}', '${email}', '${phone}', '${password}', '${retypepassword}')`);
}

const updateDataById = (id, data) => {
    return pool.query(`UPDATE users SET name='${data}' WHERE id=${id}`);
}

const deleteDataById = (id) => {
    return pool.query(`DELETE FROM users WHERE id=${id}`);
}
module.exports = { selectDataUsers, selectDataById, insertData, updateDataById, deleteDataById };

/* ======================================Old Model CRUD User=========================================== */ 
/* const getUsers = "SELECT * FROM users";
const getUsersById = "SELECT * FROM users WHERE id = $1";
const chekEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUsers = "INSERT INTO users (name, email, phone, password, retypepassword) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const removeUsers = "DELETE FROM users WHERE id = $1";
const updateUsers = "UPDATE users SET name = $1 WHERE id = $2" 

module.exports = {
    getUsers,
    getUsersById,
    chekEmailExists,
    addUsers,
    removeUsers,
    updateUsers,
}; */