const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "maria",
  password: "1004",
  connectionLimit: 5,
});

async function GetTodoList() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE react_recoil_db");
    rows = await conn.query("SELECT * FROM todos");
    if (conn) conn.end();
    return rows.map((v) => {
      return {
        ...v,
        date: new Date(+new Date(v.date) + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      };
    });
  } catch (err) {
    throw err;
  }
}

async function SetTodoList(data) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE react_recoil_db");
    await conn.query(
      `INSERT INTO todos (title, date) VALUES ('${data.title}', '${data.date}');`
    );
    rows = await conn.query("SELECT * FROM todos");
    if (conn) conn.end();
    return rows.map((v) => {
      return {
        ...v,
        date: new Date(+new Date(v.date) + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      };
    });
  } catch (err) {
    throw err;
  }
}

async function PutTodoList(idx, data) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE react_recoil_db");
    await conn.query(
      `UPDATE todos set title='${data.title}', date='${data.date}' WHERE idx=${idx};`
    );
    rows = await conn.query("SELECT * FROM todos");
    if (conn) conn.end();
    return rows.map((v) => {
      return {
        ...v,
        date: new Date(+new Date(v.date) + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      };
    });
  } catch (err) {
    throw err;
  }
}

async function DeleteTodoList(idx) {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE react_recoil_db");
    await conn.query(`DELETE from todos WHERE idx=${idx};`);
    rows = await conn.query("SELECT * FROM todos");
    if (conn) conn.end();
    return rows.map((v) => {
      return {
        ...v,
        date: new Date(+new Date(v.date) + 3240 * 10000)
          .toISOString()
          .split("T")[0],
      };
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getTodoList: GetTodoList,
  setTodoList: SetTodoList,
  putTodoList: PutTodoList,
  deleteTodoList: DeleteTodoList,
};
