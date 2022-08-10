const router = require("express").Router();
const User = require("../model/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drillayqx",
  api_key: "843213215477195",
  api_secret: "k8uPFILp9oWzyNXSomqccUf8uzs",
  secure: true,
});

//REGISTER VALIDATION
const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});
// //LOGIN VALIDATION
// const schema1 = Joi.object({
//   email: Joi.string().min(6).required().email(),
//   password: Joi.string().min(6).required(),
// });
router.post("/register", async (req, res) => {
  //LET'S VALIDATE THE DATA BEFORE WE A USER

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, email, password } = req.body;
  console.log({ name, name, email, password });

  const file = req.files.profile_pic;
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    // console.log(result);

    //Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).send("Email already Exist");
    }

    //Hash the Passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //Create a new User
    const user = new User({
      ...req.body,
      password: hashedPassword,
      profile_pic: result.url,
    });

    try {
      const savedUser = user.save();
      res.send({ savedUser });
    } catch (err) {
      res.status(400).send(err);
    }
  });
});

//Login
router.post("/login", async (req, res) => {
  //LET'S VALIDATE THE DATA BEFORE WE A USER
  const schema1 = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema1.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Checking if the email is already in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email is not found");
  }
  //PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid password");
  }

  //Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

//LOGOUT
router.get("/logout", async (req, res) => {
  const token = req.header("auth-token");

  console.log("User Id", token);
  User.findByIdAndRemove(token, function (err) {
    // if (err) res.send(err);
    res.json({ message: "User LOGOUT!" });
  });
});

module.exports = router;
