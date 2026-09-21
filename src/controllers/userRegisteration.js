const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../database");

const successfulRegister = async (req, res, next) => {
  try {
    const email = String(req.body.email).trim();

    const existingUser = Users.find((u) => u.email === email);

    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Email already exists"
      });
    }

    const hashPassword = await bcrypt.hash(
      req.body.password,
      Number(process.env.SALT_ROUNDS)
    );

    const newUser = {
      id: Users.length + 1,
      email,
      name: req.body.name,
      password: hashPassword,
      role: req.body.role
    };

    Users.push(newUser);

    console.log(`User ${newUser.name} registered.`);

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = Users.find((u) => u.email === String(email).trim());

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      String(password).trim(),
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password"
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        status: "error",
        message: "JWT secret is not configured"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  successfulRegister,
  login
};
