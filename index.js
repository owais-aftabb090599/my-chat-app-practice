require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const port = process.env.PORT || 8000;
const StaticRouter = require("./routes/StaticRouter");
const ApiRoutes = require("./routes/ApiRouter");
const { errorHandler } = require("./middlewares/ErrorHandler");
const hbs = require("hbs");
const db = require("./config/db");
const Users = db.Users;
const io = require("socket.io")(server);

const usp = io.of("/user-namespace");
usp.on("connection", async (socket) => {
  console.log("User Connected");
  const user_id = socket.handshake.auth.token;
  const user = await Users.findOne({
    where: {
      _id: user_id,
    },
  });

  if (!user) {
    console.log("User Not Found");
  } else {
    try {
      await Users.update(
        { is_online: 1 },
        {
          where: {
            _id: user_id,
          },
        }
      );
      console.log("User Online Updated");
    } catch (error) {
      console.error("Error updating user online status:", error);
    }
  }

  socket.on("disconnect", async () => {
    console.log("User Disconnected");
    try {
      await Users.update(
        { is_online: 0 },
        {
          where: {
            _id: user_id,
          },
        }
      );
      console.log("User Offline Updated");
    } catch (error) {
      console.error("Error updating user offline status:", error);
    }
  });
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(expressSession({ secret: process.env.SESSION_SECRET_KEY }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(cookieParser());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./templates/views"));
hbs.registerPartials(path.join(__dirname, "./templates/partials"));

// ROUTES:
app.use(StaticRouter);
app.use(ApiRoutes);

app.use(errorHandler);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
