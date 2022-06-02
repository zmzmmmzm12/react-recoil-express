const express = require("express");
const mdbConn = require("../mariaDBConn.js");
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const data = await mdbConn.getTodoList();
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async function (req, res) {
  try {
    const data = await mdbConn.setTodoList(req.body);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

router.put("/:idx", async function (req, res) {
  try {
    const data = await mdbConn.putTodoList(req.params.idx, req.body);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/:idx", async function (req, res) {
  try {
    const data = await mdbConn.deleteTodoList(req.params.idx);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
