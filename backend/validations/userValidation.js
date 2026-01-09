
import { loginUserSchema,registerUserSchema } from "../schema/userSchema.js";
import statusCode from "../constants/statusCode.js";
export const loginUserValidation = (body) => {
  const { error } = loginUserSchema.validate(body);
  if (error) {
    return { status: false, message: error.details[0].message, httpCode: statusCode.BAD_REQUEST }
  } else {
    return { status: true };
  }
}
export const registerUserValidation = (body) => {
  const { error } = registerUserSchema.validate(body);
  if (error) {
    return { status: false, message: error.details[0].message, httpCode: statusCode.BAD_REQUEST }
  } else {
    return { status: true };
  }
}
