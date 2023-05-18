const router = require("express").Router();
const User = require("../Models/User.js");
const bcrypt = require("bcrypt");



//REsgister
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      profilePic : req.body.profilePic
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if(!user){
      res.status(400).json("No user");
      return;
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!validated ){
      res.status(400).json("Wrong Crendentials");
      return;
    }    
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
