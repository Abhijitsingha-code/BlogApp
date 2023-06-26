const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auth");
const userRoutes = require("./Routes/users");
const postRoutes = require("./Routes/posts");
const commentRoutes = require("./Routes/comment");
const CategoryRoutes = require("./Routes/categories");
const multer = require("multer");
const path = require("path");

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

const Database_URL = process.env.MONGO_URL;

mongoose
  .connect(Database_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoodb is connected");
  })
  .catch((err) => console.log(err.message));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/categories", CategoryRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
