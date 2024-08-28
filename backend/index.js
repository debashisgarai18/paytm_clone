const express = require("express");
const userRouter = require("./Routes/userRoutes");
const app = express();
const cors = require("cors");
const { PORT } = require("./config");
const accountRouter = require("./Routes/accountRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);


app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`)
})


