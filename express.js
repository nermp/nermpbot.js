const express = require("express");
const app = express();

app.get('/', (req, res) => res.send("nermpbot is currently operational"));
app.listen(process.env.PORT, () => console.log("nermpbot is listening on port " + process.env.PORT));