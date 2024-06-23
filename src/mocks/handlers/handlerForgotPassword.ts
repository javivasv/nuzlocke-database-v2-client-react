import { http, HttpResponse } from "msw";
import { EmailData } from "../../interfaces/interfaces";

const baseURL = import.meta.env.VITE_API;

export const handlersForgotPassword = [
  http.post(`${baseURL}/forgot-password`, async ({ request }) => {
    const body = await request.json() as EmailData;

    if (body.email === "success@test.com") {
      return HttpResponse.json({
        msg: "Reset email sent successfully",
      },
      {
        status: 200,
      });
    } else if (body.email === "inexistent@test.com") {
      return HttpResponse.json({
        msg: "User not found",
      },
      {
        status: 404,
      });
    } else {
      return HttpResponse.json({
        msg: "An error occurred sending the reset email",
      },
      {
        status: 500,
      });
    }
  }),
];