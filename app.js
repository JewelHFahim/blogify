require('dotenv').config()


const path = require("path");
const express = require("express");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const cookieParser = require("cookie-parser");
const { ConnectMongoDB } = require("./connection");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const Blog = require("./models/blog");

// Instance
const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB Connection
ConnectMongoDB(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connection Successfull");
  })
  .catch((err) => {
    console.log("Connection Failed:", err);
  });

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});

  return res.render("home", {
    user: req.user,
    allBlogs: allBlogs,
  });
});

// Routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
