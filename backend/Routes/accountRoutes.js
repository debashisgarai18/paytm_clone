const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { account } = require("../Databases/db");
const { default: mongoose } = require("mongoose");
const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await account.findOne({
    userId: req.userId,
  });
  if (account) {
    res.status(200).json({
      balance: account.balance,
    });
  } else {
    res.status(404).json({
      message: "UserId not found!!!",
    });
  }
});

// this is the endpoint where transactions comes into place
accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  // use of transactions in MongoDB
  const session = await mongoose.startSession();
  session.startTransaction();
  const { to, amount } = req.body;

  const fromUser = await account
    .findOne({
      userId: req.userId,
    })
    .session(session);

  if (!fromUser || fromUser.balance < amount) {
    // aborting the transaction
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient Balance",
    });
  }

  const toUser = await account
    .findOne({
      userId: to,
    })
    .session(session);

  if (!toUser) {
    // aborting the transaction
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid Account!!",
    });
  }

  // performing the transaction
  await account
    .updateOne(
      {
        userId: req.userId,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    )
    .session(session);
  await account
    .updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    )
    .session(session);

  // committing the transaction as sucessfull
  await session.commitTransaction();
  res.status(200).json({
    message: "Transfer Successfull",
  });
});

module.exports = accountRouter;
