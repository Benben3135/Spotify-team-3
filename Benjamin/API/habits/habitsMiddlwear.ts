import {UserModelDB} from "../users/usersModel"

export async function getLoggedUser(req: any, res: any, next: Function) {
    try {
        const userID = req.cookies.user;

        const userDB = await UserModelDB.findById(userID);
       
        if (!userDB){
            req.user = null;
        } else{
            req.user = userDB;
        }

        next();

    } catch (error) {
        console.error(error)
        res.status(500).send({ error: error.message });
    }
}