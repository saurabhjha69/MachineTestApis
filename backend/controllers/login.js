import { Login } from "../models/Login.model.js";
import { encryptPassword, isPasswordRight } from "../helpers/passwordUtils.js";

export const handleAdminRegister = async (req, res) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    return res
      .status(400)
      .json({ error: "Username and Password Feilds are Required!" });
  }

  let hassedPassword = encryptPassword(password);

  const newAdmin = new Login({
    username: username,
    password: hassedPassword,
  });

  const newAdminRes = await newAdmin.save();
  if (!newAdminRes) {
    return res
      .status(400)
      .json({ error: "Failed to Create New Admin!", message: error.message });
  }

  return res
    .status(200)
    .json({ success: "New Admin Created Successfully", newAdmin: newAdmin });
};

export const handleAdminLogin = async (req, res) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    return res
      .status(400)
      .json({ error: "Username and Password Feilds are Required!" });
  }

  const adminFound = await Login.findOne({
    username: username,
  });

  if (!adminFound)
    return res
      .status(400)
      .json({ error: `No User Found with Username ${username}` });
console.log(password, adminFound.password)
  if (!isPasswordRight(password, adminFound.password)) {
    return res.status(400).json({ error: "Incorrect Password!" });
  }

  return res
    .status(400)
    .json({ success: "Login was Successfull", admin: adminFound });
};
