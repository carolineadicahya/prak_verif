const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/email");

// register
const register = async (req, res, next) => {
  try {
    const { name, email, password, verfied } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Email telah terdaftar",
      });
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verfied,
    });

    return res.status(200).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          verfied: false,
        },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
      );

      res.status(200).json({
        status: "Success",
        message: "Login successful",
        token: token,
      });
    } else {
      // next(new ApiError("Email or password does not match", 401))
      res.status(401).json({
        status: "Failed",
        message: "Email or Password does not match",
      });
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.body;

  if (token) {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      data: data,
    });
  }

  return res.json({
    msg: "Token invalid",
  });
};

const sendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.EMAIL_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const url = `http://localhost:3000/redirect?token=${token}`;
    const mailOptions = {
      to: email,
      subject: "Verify Email",
      html: `Hallo there! Click <a href="${url}">here</a> to verify your email.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ message: "Email sent" });
  } catch (error) {
    console.error(error.message);
  }
};

const verifyEmail = async (req, res) => {
  const token = req.query.token;
  try {
    console.log(token);
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
    await User.update(
      { verified: true },
      {
        where: {
          id: decoded.id,
        },
      }
    );

    res.json({ message: "Email verified" });
  } catch (error) {
    console.error(error.message);
  }
};

// get all
const getAllUser = async (req, res, next) => {
  try {
    const user = await User.findAll();

    res.status(200).json({
      status: "Success",
      msg: "Data berhasil di dapatkan",
      data: user,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// get by id
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "Succes",
      data: user,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
  verifyToken,
  verifyEmail,
  sendVerifyEmail,
  getAllUser,
  getUserById,
};
