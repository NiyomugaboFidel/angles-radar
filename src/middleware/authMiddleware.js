import jwt from'jsonwebtoken'
import User from '../models/user.model';

const SECRETKEY = process.env.JWT_SECRET;

const authMiddleware = async(req, res,next)=>{
  

 if( req &&
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')){
    const token = req?.headers.authorization.split(' ')[1];


    try {
        if(token){
            const decode = jwt.verify(token,SECRETKEY);
            const user = await User.findById(decode?.payload.id);
            console.log({'User in auth':user});
            req.user = user
            if(user){
            next()
             
            }else{
                return res
                .status(401)
                .json({message: 'Not Authorized token expired, Please login again' });  
            }
        }   
    } catch (error) {
        return res
        .status(401)
        .json({message: 'Not Authorized token expired, Please login again' });
    }
 }else{
    return res
    .status(500)
    .json({message: 'There is no token attached to header' });
 }
}

const checkRole = (roles) => async(req, res, next)=>{
    
 try {
    const id = req.user.id
    const user = await User.findById(id);
    
    if(roles.includes(user.role)){
        next()
    }else{
        return res
        .status(401)
        .json({ message: `Access denied: Your role is not permitted. Allowed roles are: ${roles.join(' / ')}` });

    }
 } catch (error) {
    console.error(error.message)
    return res
    .status(500)
    .json({message: 'Server error'});
 }
}

export {authMiddleware, checkRole}