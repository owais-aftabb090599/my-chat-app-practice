
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const StaticRouter = require("./routes/StaticRouter");
const ApiRoutes = require("./routes/ApiRouter");
const { errorHandler } = require("./middlewares/ErrorHandler");


app.use(cors({
    origin: "*",
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(cookieParser());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "./views"));

// ROUTES:
app.use(StaticRouter);
app.use(ApiRoutes);


app.use(errorHandler);

server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});