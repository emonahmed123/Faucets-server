const { signupService ,findUserByEmail,allUserService} = require('../service/user.service')
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
    try {
      const user = await signupService(req.body);
  
    
  
    //   await user.save({ validateBeforeSave: false });
  
 
  
      res.status(200).json({
        status: "success",
        message: "Successfully signed up",
      });
    } catch (error) {
      
      res.status(500).json({
        status: "fail",
        error:error.message
      });
    }
  };

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(401).json({
          status: "fail",
          error: "Please provide your credentials",
        });
      }
  
      const user = await findUserByEmail(email);
  
      if (!user) {
        return res.status(401).json({
          status: "fail",
          error: "No user found. Please create an account",
        });
      }
  
     
      const isPasswordValid = user.comparePassword(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(403).json({
          status: "fail",
           massage: 'proww in cor',
          error: "Password is not correct",
        });
      }
  
     
      const token = generateToken(user);
  
      const { password: pwd, ...others } = user.toObject();
  
      res.status(200).json({
        status: "success",
        message: "Successfully logged in",
        data: {
          user: others,
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        error,
      });
    }
  };
  
  exports.alluser=async(req,res)=>{
 
try{
   const alluse =  await allUserService()


    res.status(200).json({
        status:"success",
         data: alluse
    })
    
   
}
catch(error){
    res.status(400).json({
        status: "fail",
        message: "Can't get the all",
        error: error.message,
      });
} 

   

  }

  









 
     

  
