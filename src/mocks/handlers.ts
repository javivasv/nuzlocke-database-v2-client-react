
import { handlersLogin } from "./handlers/handlerLogin";
import { handlersRegister } from "./handlers/handlerRegister";
import { handlersForgotPassword } from "./handlers/handlerForgotPassword";
import { handlersrResetPassword } from "./handlers/handlerResetPassword";
import { handlersHome } from "./handlers/handlerHome";

export const handlers = [
  ...handlersLogin,
  ...handlersRegister,
  ...handlersForgotPassword,
  ...handlersrResetPassword,
  ...handlersHome,
];