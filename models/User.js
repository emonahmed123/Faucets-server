const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");
const userSchema = mongoose.Schema(
    {
      email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
          validator: (value) =>
            validator.isStrongPassword(value, {
              minLength: 6,
              minLowercase: 3,
              minNumbers: 1,
              minUppercase: 1,
              minSymbols: 1,
            }),
          message: "Password {VALUE} is not strong enough.",
        },
      },
   
  
      role: {
        type: String,
        enum: ["user","admin"],
        default: "user",
      },
  
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
    


      },
 
    {
      timestamps: true,
    }
  );

  userSchema.pre("save", function (next) {
    // if (!this.isModified("password")) {
    //   //  only run if password is modified, otherwise it will change every time we save the user!
    //   return next();
    // }
    const password = this.password;
  
     const hashedPassword = bcrypt.hashSync(password);
  
     this.password = hashedPassword;

  
    next();
  });

  userSchema.methods.comparePassword = function (password, hash) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
  };



const User = mongoose.model("User", userSchema);
module.exports= User;