const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./Routes/routes");
const cookieP = require("cookie-parser");

const app = express();
const PORT = 3010;
const drtName = path.join(__dirname, "/Views");

app.set("view engine", "ejs");
app.set("Views", drtName);

app.use(cookieP());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(drtName));

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Your Server Is Running On http://localhost:${PORT}`);
});
