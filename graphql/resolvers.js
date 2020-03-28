const User = require("../models/user");
const bcrypt = require("bcryptjs");

const validator = require("validator");
module.exports = {
  createUser: async function({ userInput }, req) {
    // const email = userInput.email;
    const error = [];
    if (!validator.isEmail(userInput.email)) {
      error.push({
        message: "Error is invalid"
      });
    }
    if (
      validator.isEmpty(userInput.password) ||
      validator.isLength(userInput.password, { min: 5 })
    ) {
      error.push({
        message: "pass is short"
      });
    }

    if (error.length > 0) {
      const error = new Error("invalid type input");
      throw error;
    }
    const existngUser = await User.findOne({ email: userInput.email });
    if (existngUser) {
      const error = new Error("User exist already");
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    });

    const creatUser = await user.save();
    return { ...creatUser._doc, _id: createUser._id.toString() };
  }
};
