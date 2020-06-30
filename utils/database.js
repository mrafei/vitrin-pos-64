const db = require("knex")({
  client: "sqlite3",
  connection: {
    filename: './database.sqlite'
  }
});

const testDataBase = () => {
  let result = db.select("name").from("Products")
  result.then(function (rows) {
    console.log("resultSent", rows);
  })
};

const closeDataBase = db.close;

module.exports = {
  db,
  testDataBase,
  closeDataBase
}
