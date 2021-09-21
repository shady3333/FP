const mongoose=require("mongoose");
const uuidv1=require("uuidv1");
const crypto=require("crypto");
const userSchema=new mongoose.Schema({

  name:{
    type:String,
    trim:true,
    required:true,

  },
  email:{
    type:String,
    trim:true,
    required:true,
  },
  hashed_password:{
    type:String,
    required:true,
  },
  salt:String,

  created:{
    type:Date,
    default:Date.now

  },
  update:Date,


});

//virtual field

userSchema.virtual('password')
.set(function(password){
  //create temporary variable _password
  this._password=password
  //Salt
  this.salt=uuidv1()
  //encrypt password
  this.hashed_password=this.encryptPassword(password)
})
.get(function(){
  return this._password
})
//methods

userSchema.methods={

  authenticate: function(planText){
    return this.encryptPassword(planText) === this.hashed_password
  },

  encryptPassword :function(password){
    if(!password){
      return "";
    }
    try{
      return crypto.createHmac('sha1',this.salt)
                    .update(password)
                    .digest('hex');
    }catch(err){
        return "";
    }
  }
}


module.exports=mongoose.model("User",userSchema);
