const pool = require("../config/db");

const selectDataRecipes = () => {
  return pool.query(`SELECT * FROM recipes ORDER BY id DESC`);
};

const getDataById = (data) => {
  let { searchBy, search, sortBy, sort, id } = data;
  return pool.query(
    `SELECT recipes.title,recipes.descriptions,recipes.created_at as posttime, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL AND recipes.users_id='${id}' ORDER BY recipes.${sortBy} ${sort}`
  );
};

const insertData = (data) => {
  let { descriptions, title, photo, users_id, category_id } = data;
  let time = new Date().toISOString();
  return pool.query(
    `INSERT INTO recipes(title,descriptions,photo,users_id,created_at,category_id) VALUES('${title}','${descriptions}','${photo}','${users_id}','${time}','${category_id}')`
  );
}

const updateDataById = (id,data) => {
  let { descriptions, title, photo, users_id, category_id} = data;
  return pool.query(
    `UPDATE recipes SET descriptions='${descriptions}', title='${title}', photo='${photo}', category_id=${category_id}, users_id='${users_id}' WHERE id='${id}';`
  );
}

const deleteDataById = (id) => {
  let time = new Date().toISOString();
  return pool.query(`UPDATE recipes SET deleted_at='${time}' WHERE id='${id}'`);
};

const searchDataRecipes = (data) => {
  let { searchBy, search, sortBy, sort, limit } = data;
  return pool.query(
    `SELECT recipes.title, recipes.descriptions, recipes.photo, recipes.users_id, recipes.created_at FROM recipes WHERE recipes.${searchBy} LIKE '${search}%' ORDER BY recipes.${sortBy} ${sort} LIMIT ${limit}`
  );
};

const getData = (data) => {
  let { searchBy, search, sortBy, sort } = data;
  return pool.query(
    `SELECT recipes.title,recipes.descriptions,recipes.created_at as posttime, category.name as category, recipes.photo, users.fullname as creator, users.email FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON recipes.users_id=users.id  WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL ORDER BY recipes.${sortBy} ${sort}`
  );
}

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
  selectDataRecipes,
  getDataById,
  insertData,
  updateDataById,
  deleteDataById,
  searchDataRecipes,
  getData,
  findUser
};
