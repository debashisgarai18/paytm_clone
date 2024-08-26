const { Router } = require("express");
const {user, account} = require("../Databases/db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const inputValidation = require("../middlewares/inputValidation");
const zod = require("zod");
const authMiddleware = require("../middlewares/authMiddleware");

const signInCheck = zod.object({
  username: zod.string().min(6),
  password: zod.string().min(6),
});

const updateInputCheck = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string().min(6),
});

userRouter.post("/signup", inputValidation, async (req, res) => {
  // validation to check whether the user with the same username exists in the DB or not
  const exists = await user.findOne({
    username: req.headers.uname,
  });

  if (exists) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  } else {
    const response = await user.create({
      firstName: req.headers.fname,
      lastName: req.headers.lname,
      username: req.headers.uname,
      password: req.headers.pwd,
    });

    // when an user gets updated in the DB, we'll initialize a range of money from 1-10000 to that user
    const userId = response._id;
    await account.create({
        userId,
        balance : Math.floor(1 + Math.random() * 10000)
    })

    if (response)
      res.status(200).json({
        message: "The user is created successfully",
      });
    else {
      res.status(411).json({
        message: "There is some issue in creating the user",
      });
    }
  }
});

userRouter.post("/signin", async (req, res) => {
  const { uname, pwd } = req.body;

  const inputCheck = signInCheck.safeParse({
    username: uname,
    password: pwd,
  });

  if (inputCheck.success) {
    const response = await user.findOne({
      username: uname,
    });

    if (response) {
      const token = jwt.sign(uname, JWT_SECRET);
      res.status(200).json({
        token: token,
      });
    } else {
      res.status(411).json({
        message: "Error while logging in",
      });
    }
  } else {
    res.status(411).json({
      message: "Error while logging in",
    });
  }
});

userRouter.post("/updateUser", authMiddleware, async (req, res) => {
  const uname = req.headers.username;
  const updateFields = req.body;

  const inputCheck = updateInputCheck.safeParse({
    firstname: updateFields.fname,
    lastname: updateFields.lname,
    password: updateFields.pwd,
  });
  console.log(uname)
  if (!inputCheck.success) {
    res.status(411).json({
      message: "There is some issue in the inputs of the fields",
    });
  } else {
    const updateStatus = await user.findOneAndUpdate(
      {
        username: uname,
      },
      {
        $set: {
          firstName: updateFields.fname,
          lastName: updateFields.lname,
          password: updateFields.pwd,
        },
      }
    );

    console.log(updateStatus)
    if (updateStatus) {
      res.status(200).json({
        message: "Updated Successfully",
      });
    } else {
      res.status(411).json({
        message: "Error while updating information",
      });
    }
  }
});

module.exports = userRouter;
