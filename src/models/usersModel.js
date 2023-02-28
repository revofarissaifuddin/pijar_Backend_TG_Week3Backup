const pool = require('../config/db');

const selectDataUsers = () => { 
    return pool.query(`SELECT * FROM users ORDER BY id DESC`)
}
const selectUserById = (data) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT * FROM users WHERE id='${data}'`,
            (err, result) => {
                if (!err) {
                resolve(result)
                } else {
                    reject(err)
            }
        })
    );
}
const getDataById = (data) => {
    let { id } = data;
    return pool.query(
      `SELECT * FROM users WHERE id = '${id}'`
    );
};
const insertData = (data) => {
    let { name, email, phone, password, retypepassword } = data;
    return pool.query(`INSERT INTO users (name, email, phone, password, retypepassword) VALUES ('${name}', '${email}', '${phone}', '${password}', '${retypepassword}')`);
}

const updateDataById = (id, data) => {
    return pool.query(`UPDATE users SET fullname='${data}' WHERE id='${id}'`);
}

const deleteDataById = (id) => {
    return pool.query(`DELETE FROM users WHERE id=${id}`);
}

const findUser = (email) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT * FROM users WHERE email='${email}'`,
            (err, result) => {
                if (!err) {
                resolve(result)
                } else {
                    reject(err)
            }
        })
    );
}

const createUser = (data) => {
    const { email, fullname, password, id, otp } = data;
    let create_at = new Date().toISOString();
    return new Promise((resolve,reject)=>
    pool.query(`INSERT INTO users(id,email,fullname,password,otp,create_at) VALUES('${id}','${email}','${fullname}','${password}','${otp}','${create_at}')`,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
    }


const verifyUser = (id) => {
    return pool.query(`UPDATE users SET verif=1 WHERE id='${id}'`);
}

module.exports = {
    selectDataUsers,
    selectUserById,
    insertData,
    updateDataById,
    deleteDataById,
    findUser,
    createUser,
    verifyUser,
    getDataById
};

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