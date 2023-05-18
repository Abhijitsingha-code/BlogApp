const router = require("express").Router();
const Category = require("../Models/Category.js");

//Create category
router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get category
router.get("/", async (req, res) => {
  try {
    const allcategory = await Category.find()
    res.status(200).json(allcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
