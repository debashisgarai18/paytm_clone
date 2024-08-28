const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { account } = require("../Databases/db");
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
  const { to, amount } = req.body;
  
  const fromUser = await account.findOne({
    userId: req.userId,
  });

  if (fromUser.balance < amount) {
    return res.status(400).json({
      message: "Insufficient Balance",
    });
  }

  const toUser = await account.findOne({
    userId: to,
  });

  if (!toUser) {
    return res.status(400).json({
      message: "Invalid Account!!",
    });
  }
  await account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );
  await account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );

  res.status(200).json({
    message: "Transfer Successfull",
  });
});

module.exports = accountRouter;
