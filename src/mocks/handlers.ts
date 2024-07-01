
import { handlersLogin } from "./handlers/handlerLogin";
import { handlersRegister } from "./handlers/handlerRegister";
import { handlersForgotPassword } from "./handlers/handlerForgotPassword";
import { handlersrResetPassword } from "./handlers/handlerResetPassword";
import { handlersHome } from "./handlers/handlerHome";
import { handlersNuzlockes } from "./handlers/handlerNuzlockes";
import { handlersNuzlocke } from "./handlers/handlerNuzlocke";
import { handlersAbout } from "./handlers/handlerAbout";

export const handlers = [
  ...handlersLogin,
  ...handlersRegister,
  ...handlersForgotPassword,
  ...handlersrResetPassword,
  ...handlersHome,
  ...handlersNuzlockes,
  ...handlersNuzlocke,
  ...handlersAbout,
];