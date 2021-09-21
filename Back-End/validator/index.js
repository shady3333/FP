


exports.usersignUpValidator=(req,res,next)=>{
  //NAME
  req.check('name',"Please Enter Name").notEmpty();
  //EMAIL
  req.check('email',"Email must be between 3 to 32 characters")
  .matches(/.+\@.+\..+/)
  .withMessage("Email must contain @")
  .isLength({
    min:4,
    max:200
  })


  //PASSWORD

  req.check('password',"Please Enter Password").notEmpty();
  req.check('password')
  .isLength({min:6})
  .withMessage("Password must contains 6 characters")
  .matches(/\d/)
  .withMessage("Password must contain atleast 1 numeric character")

  //check for errors

  const errors=req.validationErrors();
  if(errors){
    const firstError=errors.map(error=>error.msg)[0];
    return res.status(400).json({error:firstError});
  }

  next();


};
