const User=require('../Model/userModel')
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")


const Register=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"All field are required"})
        }
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:"User Already Exists"})
        }

        const hashedPassword=await bcrypt.hash(
            password,10
        );
        const user=await User.create({
            name,
            password:hashedPassword,
            email,
            
        })

              const token = jwt.sign(
  { userId: user._id.toString() },
  process.env.JWT_SECRET_KEY,
  { expiresIn: "1d" }
);

        return res.status(201).json({
            sucess:true,
            message:"Registration successful .Please log in",
            data:{
                 user,
            token

            }
           
        })
        
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
}

    const Login=async(req,res)=>{
        try{

            const {email,password}=req.body;
            if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
            const user=await User.findOne({email});
            if(!user){
                return res.status(400).json({message:"Invalid Email and Password"})
            }
            const isMatch=await bcrypt.compare(password,user.password)

            if(!isMatch){
                return res.status(400).json({message:"Password is Wrong"})
            }
            const token = jwt.sign(
  { userId: user._id.toString() },
  process.env.JWT_SECRET_KEY,
  { expiresIn: "1d" }
);

           return  res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token
      },
    })

        }
        catch(err){
            return res.status(500).json({message:err.message})
        }
    }

module.exports={Register,Login}