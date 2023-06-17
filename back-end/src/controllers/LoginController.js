import Utils from "../util/Mongouplod";

exports.login = async(req,res) =>{
    try {
        const {username,password} = req.body
        if(username != "" && password != ""){
            let resp = await Utils.Sign(username,password)
            if(resp){
                return res.json({status: true ,message:"Succesfully loged in"})
            }else{
                return res.json({status: false , message:"Invalid Credentials"})
            }
        }else{
            return res.status(400).json({message:"null parameters"})
        }
    } catch (error) {
        console.log("error", error);
    }
}

exports.create = async(req,res) =>{
    try {
        const {username,password} = req.body
        if(username != "" && password != ""){
            let resp = await Utils.Create(username,password)
            console.log(username,password);
            if(resp){
                return res.json({status: true , message:"User Account Created"})
            }else{
                return res.json({status: false , message:"User Account Alredy Exist"})
            }
        }else{
            return res.status(400).json({message:"null parameters"})
        }
    } catch (error) {
        
    }
}