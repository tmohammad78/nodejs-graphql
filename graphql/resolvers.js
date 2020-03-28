const User = require("../models/user");
const bcrypt = require("bcryptjs");
module.exports = {
  createUser: async function({ userInput }, req) {
    // const email = userInput.email;
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
