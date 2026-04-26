const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
//method set up
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
//view engine set up
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware set up
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//server set up
let posts = [
  {
    id: uuidv4(),
    image: "https://picsum.photos/id/20/400/300",
    username: "sachindas",
    caption: "I got selected for my 1st internship",
    likes: 0,
  },
  {
    id: uuidv4(),
    image: "https://picsum.photos/id/20/400/300",
    username: "apnacollege",
    caption: "coding matlab apna-college",
    likes: 0,
  },
  {
    id: uuidv4(),
    image: "https://picsum.photos/id/50/400/300",
    username: "shardhakhapra",
    caption: "Hard work paves the way for success",
    likes: 0,
  },
];
app.get("/ig", (req, res) => {
  res.render("home.ejs", { posts });
});
app.get("/ig/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/ig", (req, res) => {
  let { user, image, caption } = req.body;
  let id = uuidv4();
  posts.push({ id, username: user, image, caption });
  res.redirect("/ig");
});
app.get("/ig/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});
app.patch("/ig/:id", (req, res) => {
  let { id } = req.params;
  let { image, caption } = req.body;
  let post = posts.find((p) => id === p.id);
  post.image = image;
  post.caption = caption;
  res.redirect("/ig");
});
app.get("/ig/:id/edit", (req, res) => {
  //editing form for individual content
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});
// Add karo!
app.patch("/ig/:id/like", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  post.likes++;
  res.redirect(`/ig#${id}`);
});
app.delete("/ig/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/ig");
});
app.listen(port, () => {
  console.log("app is listening on port 8000");
});
