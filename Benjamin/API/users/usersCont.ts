import { UserModelDB  } from "./usersModel"


export const registerUser = async (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) throw new Error("please complete all fields");
        const user = await UserModelDB.create({
            name:name,
            email:email,
            password:password,
        })
  

       
        res.send({ ok: true, user });
    } catch (error) {
        console.error(error);
    }
}

export const loginUser = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        if(!(UserModelDB.exists({email:email}))) throw new Error("user dont excist");
        const user = await UserModelDB.findOne({email:email}, {password:password});
       
        if(!user) throw new Error("some fields are incorrect");
        
        res.cookie("user", user._id ,{maxAge: 1000*60*60*24 , httpOnly:true})
        res.send(user);


        
    } catch (error) {
        console.error(error);
    }
}

export const getUserData = async (req: any, res: any) => {
    try {
        const { email } = req.query;
        if(!(UserModelDB.exists({email:email}))) throw new Error("user dont excist");
       
        const user = await UserModelDB.find({email:email});
      
        if(!user) throw new Error("some fields are incorrect");
        res.send(user);

    } catch (error) {
        console.error(error);
    }
}


