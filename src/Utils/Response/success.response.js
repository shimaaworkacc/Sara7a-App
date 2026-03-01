export const SuccessResponse=({res, statusCode=200,message="Done",data={}})=>{

    return res.status(statusCode).json({message,data});
}