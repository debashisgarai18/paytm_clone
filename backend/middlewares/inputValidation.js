const zod = require("zod");

const inputSchema = zod.object({
    firstName : zod.string(),
    lastName : zod.string(),
    username : zod.string().min(6),
    password : zod.string().min(6)
})

const inputValidation = (req, res, next) =>{
    const {fname, lname, uname, pwd} = req.body;
    const inputCheck = inputSchema.safeParse({
        firstName : fname,
        lastName : lname,
        username : uname,
        password : pwd
    });

    if(inputCheck.success){
        req.headers = req.body;
        next();
    }
    else{
        res.status(411).json({
            message : "Incorrect Inputs"
        })
    }
}

module.exports = inputValidation;