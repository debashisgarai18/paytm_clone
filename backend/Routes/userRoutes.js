const { Router } = require("express");
const { user, account } = require("../Databases/db");
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
      balance: Math.floor(1 + Math.random() * 10000),
    });

    if (response) {
      const token = jwt.sign(
        { username: req.headers.uname, userId: userId },
        JWT_SECRET
      );
      res.status(200).json({
        token: token,
      });
    } else {
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
      const token = jwt.sign(
        { username: uname, userId: response._id },
        JWT_SECRET
      );
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

userRouter.get("/getUsers", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const uname = req.username;


  const response = await user.findOne({
    username : uname
  })

  const acc = await account.findOne({
    userId
  })

  const userData = await user.find({});
  if(userData){
    res.status(200).json({
      users : userData,
      owner : response.firstName,
      balance : acc.balance
    })
  }
  else{
    res.status(404).json({
      message : "Can't get the users!!"
    })
  }
})

userRouter.post("/updateUser", authMiddleware, async (req, res) => {
  const uname = req.headers.username;
  const updateFields = req.body;

  const inputCheck = updateInputCheck.safeParse({
    firstname: updateFields.fname,
    lastname: updateFields.lname,
    password: updateFields.pwd,
  });

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
