const pool = require("../config/db");

const createUser = (data) => {
    const { email, fullname, password, id, otp } = data;
    let create_at = new Date().toISOString();
    return new Promise((resolve, reject) =>
        pool.query(
            `INSERT INTO users(id,email,fullname,password,otp,create_at) VALUES('${id}','${email}','${fullname}','${password}','${otp}','${create_at}')`,
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            }
        )
    );
};

const selectDataUsers = () => {
    return pool.query("SELECT * FROM users ORDER BY id DESC");
};

const selectUserById = (data) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT * FROM users WHERE id='${data}'`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const getDataById = (data) => {
    let { id } = data;
    return pool.query(`SELECT * FROM users WHERE id = '${id}'`);
};

const insertData = (data) => {
    let { name, email, phone, password, retypepassword } = data;
    return pool.query(
        `INSERT INTO users (name, email, phone, password, retypepassword) VALUES ('${name}', '${email}', '${phone}', '${password}', '${retypepassword}')`
    );
};

const updateDataById = (id, data) => {
    let { fullname, email } = data;
    return pool.query(
        `UPDATE users SET fullname='${fullname}', email='${email}' WHERE id='${id}';`
    );
};

const deleteDataById = (id, data) => {
    return pool.query(
        `DELETE FROM users SET fullname='${data}' WHERE id='${id}'`
    );
};

const findUser = (email) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const verifyUser = (id) => {
    return pool.query(`UPDATE users SET verif=1 WHERE id='${id}'`);
};

const insertOTP = (email, otp) => {
    return new Promise((resolve, reject) =>
        pool.query(
            `UPDATE users SET otp = '${otp}' WHERE email = '${email}'`,
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            }
        )
    );
};
const sendOTP = (email, otp) => {
    return new Promise((resolve, reject) =>
        pool.query(
            `SELECT * FROM users WHERE email = '${email}' AND otp = '${otp}'`,
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            }
        )
    );
};

const changePassword = (email, password) => {
    return new Promise((resolve, reject) =>
        pool.query(
            `UPDATE users SET password = '${password}' WHERE email = '${email}'`,
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            }
        )
    );
};
module.exports = {
    selectDataUsers,
    selectUserById,
    insertData,
    updateDataById,
    deleteDataById,
    findUser,
    createUser,
    verifyUser,
    getDataById,
    insertOTP,
    sendOTP,
    changePassword,
};
