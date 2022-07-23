const { User } = require("../Sequalize/models");

const signin = async (req, res) => {
  const data = req?.body;
  try {
    const finded = await User.findOne({ where: { email: data?.email } });
    if (finded === null) {
      await User.create({ email: data?.email });
      res.send({
        status: true,
        message: "User created in successful",
      });
    } else {
      res.send({
        status: true,
        message: "Login successful",
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      status: false,
      message: "Something went wrong",
    });
  }
};

const getAllUsers = async (req, res) => {
  const all = await User.findAll();
  res.send({all});
};

module.exports = { signin, getAllUsers };
