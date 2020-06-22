const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database.db');

const createTestDataBase = () => db.serialize(function () {
  db.run("CREATE TABLE Products (name, barcode, quantity)");

  db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product001', 'xxxxx', 20]);
  db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product002', 'xxxxx', 40]);
  db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product003', 'xxxxx', 60]);

});
const testDataBase = () => db.serialize(function () {
  db.each("SELECT * FROM Products", function (err, row) {
    console.log(row);
  });
});

const closeDataBase = db.close;

module.exports = {
  db,
  testDataBase,
  createTestDataBase,
  closeDataBase
}
