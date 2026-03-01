export const ErrorResponse = ({ 
  status = 400, message = "Error", extra = undefined
 }) => {
const error =new Error(
    typeof message==="string"?message:message?.message||error,
);
error.status=status;
error.extra=extra;
throw error;
}
export const BadRequestException=(
    message="Bad request Exception",
    extra=undefined
)=>{
    return ErrorResponse({status:400,message,extra})
}
export const ConflictRequestException=(
    message="Conflict request Exception",
    extra=undefined
)=>{
    return ErrorResponse({status:409,message,extra})
}
export const UnauthorizedRequestException=(
    message="Unauthorized request Exception",
    extra=undefined
)=>{
    return ErrorResponse({status:401,message,extra})
}
export const NotFoundRequestException=(
    message="Not found request Exception",
    extra=undefined
)=>{
    return ErrorResponse({status:404,message,extra})
}
export const ForbiddenRequestException=(
    message="Forbidden request Exception",
    extra=undefined
)=>{
    return ErrorResponse({status:403,message,extra})
}

export const globalErrorHandler=(error,req,res,next)=>{
    const status=error.status??500;
    return res.status(status).json({message:error.message,stack:error.stack,status})
}