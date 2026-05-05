import joi from joi;
import StatusCodes from "http-status-codes";

function loginMiddleware(req, res, next) {
  try{
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        code: StatusCodes.BAD_REQUEST,
        message: error.details[0].message,
        data: null
      });
    }
    next();
  }
  catch(error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'An error occurred while processing the request.',
      data: null
    });
  }
}
export default loginMiddleware;
