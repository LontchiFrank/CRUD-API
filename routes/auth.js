const router = require("express").Router();
const User = require("../model/auth");
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
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    // console.log(result);

    //Checking if the user is already in the database
    const emailExist = User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).send("Email already Exist");
    }

    //Create a new User
    const user = new User({
      ...req.body,
      profile_pic: result.url,
    });

    try {
      const savedUser = user.save();
      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  });
});

router.post("/login");

module.exports = router;
