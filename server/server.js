var express = require("express");
const app = express();
const api = require("./routes/index");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todo", api);

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
