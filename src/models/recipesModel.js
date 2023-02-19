const pool = require("../config/db");

const selectDataRecipes = () => {
  return pool.query(`SELECT * FROM recipes ORDER BY id DESC`);
};
const getDataById = (by, data) => {
  return pool.query(`SELECT * FROM recipes WHERE ${by}=${data}`);
};
const insertData = (data) => {
  let { descriptions, title, photo, users_id } = data;
  let created_at = new Date().toISOString();

  return pool.query(
    `INSERT INTO recipes(title, descriptions, photo, users_id, created_at) VALUES('${title}','${descriptions}','${photo}',${users_id}, '${created_at}')`
  );
};
const updateDataById = (id, data) => {
  return pool.query(`UPDATE recipes SET descriptions='${data}' WHERE id=${id}`);
};
const deleteDataById = (id) => {
  return pool.query(`DELETE FROM recipes WHERE id=${id}`);
};
const searchDataRecipes = (data) => {
  let { searchBy, search, sortBy, sort, limit } = data;
  return pool.query(
    `SELECT recipes.title, recipes.descriptions, recipes.photo, recipes.users_id, recipes.created_at FROM recipes WHERE recipes.${searchBy} LIKE '${search}%' ORDER BY recipes.${sortBy} ${sort} LIMIT ${limit}`
  );
};
module.exports = {
  selectDataRecipes,
  getDataById,
  insertData,
  updateDataById,
  deleteDataById,
  searchDataRecipes,
};
