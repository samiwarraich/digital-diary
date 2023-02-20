const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI)
  .then((result) => app.listen(process.env.PORT))
  .catch((error) => {
    console.log(error);
  });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
