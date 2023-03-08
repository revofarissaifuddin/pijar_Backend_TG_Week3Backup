const pool = require("../config/db");

const selectDataCategory = () => {
    return pool.query("SELECT * FROM category ORDER BY id DESC");
};

const getDataById = (by, data) => {
    return pool.query(`SELECT * FROM category WHERE ${by}=${data}`);
};

const insertData = (data) => {
    let { name } = data;
    return pool.query(`INSERT INTO category(name) VALUES('${name}')`);
};

const updateDataById = (id, data) => {
    return pool.query(`UPDATE category SET name='${data}' WHERE id=${id}`);
};

const deleteDataById = (id) => {
    return pool.query(`DELETE FROM category WHERE id=${id}`);
};

module.exports = {
    selectDataCategory,
    getDataById,
    insertData,
    updateDataById,
    deleteDataById,
};